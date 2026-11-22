"""
Procedural PLACEHOLDER renderer for Yamli Store.

Generates an ordered 360° image sequence of one (fictional) mouse model by
ray-marching a signed-distance-field. These frames are temporary stand-ins:
replace /public/images/mouse-sequence/frame_XXX.webp with real studio renders
(same names, same count, or update src/config/sequence.ts).

Usage:
  python3 -I scripts/render_mouse.py sequence <out_dir> <frames> <width> <height> <preset>
  python3 -I scripts/render_mouse.py stills   <out_dir>
"""
import sys, os, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from multiprocessing import Pool

PRESETS = {
    # name: dict(body, accent, radii, hump, sheen)
    "phantom":  dict(body=(0.045, 0.047, 0.052), accent=(0.18, 0.48, 1.0), rad=(0.31, 0.205, 0.60), hump=0.10, hz=-0.12, rough=0.35, wheel=(0.02,0.02,0.022)),
    "vector":   dict(body=(0.82, 0.83, 0.85), accent=(0.18, 0.48, 1.0), rad=(0.30, 0.19, 0.58), hump=0.06, hz=-0.10, rough=0.45, wheel=(0.06,0.06,0.07)),
    "spectre":  dict(body=(0.11, 0.115, 0.13), accent=(0.18, 0.48, 1.0), rad=(0.29, 0.18, 0.56), hump=0.04, hz=-0.05, rough=0.25, wheel=(0.02,0.02,0.022)),
    "atelier":  dict(body=(0.30, 0.31, 0.33), accent=(0.85, 0.87, 0.90), rad=(0.36, 0.25, 0.62), hump=0.22, hz=-0.18, rough=0.55, wheel=(0.10,0.10,0.11)),
    "nimbus":   dict(body=(0.62, 0.60, 0.57), accent=(0.95, 0.95, 0.95), rad=(0.33, 0.21, 0.60), hump=0.12, hz=-0.14, rough=0.6, wheel=(0.08,0.08,0.085)),
    "pulse":    dict(body=(0.035, 0.036, 0.04), accent=(0.18, 0.48, 1.0), rad=(0.30, 0.17, 0.55), hump=0.02, hz=0.0, rough=0.3, wheel=(0.02,0.02,0.022)),
}

def sd_ellipsoid(p, r):
    k0 = np.linalg.norm(p / r, axis=-1)
    k1 = np.linalg.norm(p / (r * r), axis=-1)
    return k0 * (k0 - 1.0) / np.maximum(k1, 1e-6)

def sd_box(p, b):
    q = np.abs(p) - b
    return np.linalg.norm(np.maximum(q, 0.0), axis=-1) + np.minimum(np.max(q, axis=-1), 0.0)

def smin(a, b, k):
    h = np.clip(0.5 + 0.5 * (b - a) / k, 0, 1)
    return b * (1 - h) + a * h - k * h * (1 - h)

def smax(a, b, k):
    return -smin(-a, -b, k)

class Mouse:
    def __init__(self, P):
        self.P = P
        rx, ry, rz = P["rad"]
        self.r = np.array([rx, ry, rz])
        self.wheel_z = rz * 0.48
        self.wheel_y = ry * math.sqrt(max(0.0, 1 - (self.wheel_z / rz) ** 2)) - 0.03

    def body(self, p):
        P = self.P
        x, y, z = p[..., 0], p[..., 1], p[..., 2]
        # palm hump: inflate height near hz
        s = 1.0 + P["hump"] * np.exp(-((z - P["hz"]) / 0.28) ** 2)
        # slight taper toward the front
        t = 1.0 - 0.12 * np.clip(z / self.r[2], 0, 1)
        q = np.stack([x / t, y / s, z], axis=-1)
        d = sd_ellipsoid(q, self.r) * 0.8
        d = smax(d, -(y + 0.02), 0.03)  # flat base
        return d

    def sdf(self, p, want_mat=False):
        x, y, z = p[..., 0], p[..., 1], p[..., 2]
        d = self.body(p)
        # central button split (groove)
        g = sd_box(p - np.array([0, 0.25, self.r[2] * 0.6]), np.array([0.004, 0.25, self.r[2] * 0.55]))
        d = smax(d, -g, 0.004)
        # wheel slot
        wc = np.array([0, self.wheel_y, self.wheel_z])
        slot = sd_box(p - wc, np.array([0.026, 0.05, 0.068]))
        d = smax(d, -slot, 0.006)
        # wheel: cylinder along x
        pw = p - wc
        dyz = np.sqrt(pw[..., 1] ** 2 + pw[..., 2] ** 2) - 0.055
        dx = np.abs(pw[..., 0]) - 0.018
        wheel = np.minimum(np.maximum(dyz, dx), 0) + np.sqrt(np.maximum(dyz, 0) ** 2 + np.maximum(dx, 0) ** 2) - 0.004
        # side buttons (left side, -x)
        sb_y = 0.035
        sbx = -self.r[0] * 0.985
        b1 = sd_box(p - np.array([sbx, sb_y, 0.08]), np.array([0.012, 0.010, 0.045])) - 0.005
        b2 = sd_box(p - np.array([sbx, sb_y, -0.05]), np.array([0.012, 0.010, 0.045])) - 0.005
        side = np.minimum(b1, b2)
        dd = np.minimum(np.minimum(d, wheel), side)
        if not want_mat:
            return dd
        mat = np.zeros(dd.shape, dtype=np.int8)
        mat[wheel <= dd + 1e-4] = 1
        mat[side <= dd + 1e-4] = 2
        return dd, mat


def rot_y(a):
    c, s = math.cos(a), math.sin(a)
    return np.array([[c, 0, s], [0, 1, 0], [-s, 0, c]])

def rot_x(a):
    c, s = math.cos(a), math.sin(a)
    return np.array([[1, 0, 0], [0, c, -s], [0, s, c]])

def normalize(v):
    return v / np.maximum(np.linalg.norm(v, axis=-1, keepdims=True), 1e-9)

def render(preset, angle_deg, W, H, ss=1.5, elev=24.0, dist=2.35, fov=30.0, label=None, tilt=0.0, bg_glow=True):
    P = PRESETS[preset]
    M = Mouse(P)
    w, h = int(W * ss), int(H * ss)
    elev_r = math.radians(elev)
    target = np.array([0.0, 0.07, 0.0])
    cam = target + dist * np.array([0.0, math.sin(elev_r), math.cos(elev_r)])
    fwd = normalize(target - cam)
    right = normalize(np.cross(fwd, np.array([0, 1.0, 0])))
    up = np.cross(right, fwd)
    tf = math.tan(math.radians(fov) / 2)
    xs = (np.arange(w) + 0.5) / w * 2 - 1
    ys = 1 - (np.arange(h) + 0.5) / h * 2
    X, Y = np.meshgrid(xs * tf * (w / h), ys * tf)
    rd = normalize(fwd + X[..., None] * right + Y[..., None] * up).reshape(-1, 3)
    n_px = rd.shape[0]

    # object rotation: world -> object
    R = rot_y(math.radians(angle_deg)) @ rot_x(math.radians(tilt))
    Rinv = R.T
    ro_o = Rinv @ cam
    rd_o = rd @ Rinv.T

    # bounding sphere test
    rb = 0.75
    b = rd_o @ ro_o
    c = ro_o @ ro_o - rb * rb
    disc = b * b - c
    active = np.where(disc > 0)[0]
    t = np.full(n_px, 1e9)
    tt = (-b[active] - np.sqrt(disc[active])).clip(0)
    tmax = (-b[active] + np.sqrt(disc[active]))
    idx = active.copy()
    hit = np.zeros(n_px, bool)
    for _ in range(110):
        if idx.size == 0:
            break
        p = ro_o + rd_o[idx] * tt[:, None]
        d = M.sdf(p)
        done = d < 0.0006
        miss = tt > tmax
        hit[idx[done]] = True
        t[idx[done]] = tt[done]
        keep = ~(done | miss)
        idx, tt, tmax = idx[keep], tt[keep] + d[keep] * 0.9, tmax[keep]

    img = np.zeros((n_px, 3))

    # ---------- background + floor ----------
    floor_y = -0.02
    ys_pix = (np.arange(n_px) // w) / h
    xs_pix = (np.arange(n_px) % w) / w
    # spotlight glow behind product
    dxp = (xs_pix - 0.5) * (w / h)
    dyp = ys_pix - 0.47
    glow = np.exp(-(dxp ** 2 / 0.32 + dyp ** 2 / 0.22)) if bg_glow else 0
    base = (np.array([8, 8, 8]) / 255.0) ** 2.2
    img[:] = base + 0.007 * np.asarray(glow)[:, None] * np.array([0.85, 0.9, 1.0])
    # floor intersection (world space)
    tf_ = np.where(rd[:, 1] < 0, (floor_y - cam[1]) / np.minimum(rd[:, 1], -1e-6), -1)
    fl = (tf_ > 0) & (~hit)
    fp = cam + rd[fl] * tf_[fl, None]
    fpo = fp @ Rinv.T
    # soft contact shadow from footprint ellipse
    ex, ez = M.r[0] * 0.95, M.r[2] * 0.97
    ed = np.sqrt((fpo[:, 0] / ex) ** 2 + (fpo[:, 2] / ez) ** 2)
    shadow = np.clip(1.0 - np.exp(-np.maximum(ed - 0.85, 0) * 3.2), 0, 1)
    contact = 0.35 + 0.65 * shadow
    # accent bounce light under the product
    bounce = np.exp(-np.maximum(ed - 0.9, 0) * 4.0) * 0.06
    acc = np.array(P["accent"])
    floor_col = img[fl] * contact[:, None] + bounce[:, None] * acc[None, :] * 0.6
    img[fl] = floor_col

    # ---------- shade product ----------
    hi = np.where(hit)[0]
    if hi.size:
        p = ro_o + rd_o[hi] * t[hi, None]
        e = 0.0012
        n = np.stack([
            M.sdf(p + [e, 0, 0]) - M.sdf(p - [e, 0, 0]),
            M.sdf(p + [0, e, 0]) - M.sdf(p - [0, e, 0]),
            M.sdf(p + [0, 0, e]) - M.sdf(p - [0, 0, e]),
        ], axis=-1)
        n = normalize(n)
        _, mat = M.sdf(p, want_mat=True)
        # back to world
        n_w = n @ R.T
        p_w = p @ R.T
        v = -rd[hi]
        # AO
        ao = np.ones(hi.size)
        for k in range(1, 5):
            hk = 0.02 * k
            ao -= (hk - M.sdf(p + n * hk)) * (0.5 ** k) * 6
        ao = np.clip(ao, 0.25, 1)

        body = np.array(P["body"])
        col = np.tile(body, (hi.size, 1))
        col[mat == 1] = np.array(P["wheel"])
        col[mat == 2] = body * 0.7
        rough = np.full(hi.size, P["rough"])
        rough[mat == 1] = 0.8

        def light(ldir, lcol, inten, spec_k=1.0):
            l = normalize(np.array(ldir, float))
            ndl = np.clip(n_w @ l, 0, 1)
            hv = normalize(l + v)
            ndh = np.clip(np.sum(n_w * hv, -1), 0, 1)
            shin = 2 / np.maximum(rough ** 4, 1e-4) - 2
            shin = np.clip(shin, 4, 400)
            spec = ndh ** shin * (shin + 8) / (8 * math.pi) * 0.04 * spec_k
            return (col * ndl[:, None] + spec[:, None]) * np.array(lcol) * inten

        out = np.zeros((hi.size, 3))
        out += light((-0.6, 1.0, 0.7), (1.0, 0.98, 0.95), 1.7)       # key
        out += light((0.9, 0.35, 0.2), (0.8, 0.85, 1.0), 0.5)         # fill
        out += light((0.2, 0.6, -1.0), tuple(acc), 2.2, 2.0)          # accent rim (back)
        ndv = np.clip(np.sum(n_w * v, -1), 0, 1)
        fres = (1 - ndv) ** 4
        out += fres[:, None] * acc[None, :] * 0.35 * np.clip(n_w[:, 1] + 0.3, 0, 1)[:, None]
        out += fres[:, None] * 0.06
        out += col * 0.05  # ambient
        out *= ao[:, None]
        # emissive accent strip along the base
        strip = np.exp(-((p[:, 1] - 0.012) / 0.0045) ** 2) * (np.abs(n[:, 1]) < 0.6)
        out += strip[:, None] * acc[None, :] * 1.4
        # tiny logo dot on palm
        logo = np.exp(-(((p[:, 0]) ** 2 + (p[:, 2] + 0.16) ** 2) / 0.00045)) * (n[:, 1] > 0.6)
        out += logo[:, None] * acc[None, :] * 0.9
        img[hi] = out

    img = img.reshape(h, w, 3)
    # tonemap + gamma
    img = img / (1 + img * 0.6)
    img = np.clip(img, 0, 1) ** (1 / 2.2)
    im = Image.fromarray((img * 255).astype(np.uint8))
    if ss > 1:
        im = im.resize((W, H), Image.LANCZOS)
    if label:
        dr = ImageDraw.Draw(im)
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", max(11, W // 110))
        except Exception:
            font = ImageFont.load_default()
        dr.text((int(W * 0.022), int(H - H * 0.05)), label, fill=(90, 90, 96), font=font)
    return im


def _seq_job(args):
    out_dir, i, n, W, H, preset = args
    ang = 360.0 * i / (n - 1)
    im = render(preset, ang - 35, W, H, label=f"PLACEHOLDER RENDER · {preset.upper()} · FRAME {i:03d}/{n-1:03d}")
    im.save(os.path.join(out_dir, f"frame_{i:03d}.webp"), "WEBP", quality=78, method=5)
    return i

def _still_job(args):
    out_dir, preset, k, ang, elev = args
    im = render(preset, ang, 1000, 1000, elev=elev, dist=3.15, label=f"DEMO RENDER · {preset.upper()} · {k}")
    im.save(os.path.join(out_dir, f"{preset}-{k}.webp"), "WEBP", quality=80, method=5)
    return f"{preset}-{k}"

if __name__ == "__main__":
    mode = sys.argv[1]
    out = sys.argv[2]
    os.makedirs(out, exist_ok=True)
    if mode == "sequence":
        n, W, H, preset = int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5]), sys.argv[6]
        jobs = [(out, i, n, W, H, preset) for i in range(n)]
        with Pool(4) as pool:
            for i in pool.imap_unordered(_seq_job, jobs):
                print("frame", i, flush=True)
    elif mode == "stills":
        angles = [("1", -35, 24), ("2", 90, 14), ("3", 180 + 30, 32), ("4", 0, 70)]
        jobs = [(out, p, k, a, e) for p in PRESETS for (k, a, e) in angles]
        with Pool(4) as pool:
            for r in pool.imap_unordered(_still_job, jobs):
                print(r, flush=True)
    elif mode == "test":
        import time
        t0 = time.time()
        render(sys.argv[3], float(sys.argv[4]), 1600, 1000, label="TEST").save(os.path.join(out, "test.png"))
        print("t", time.time() - t0)
