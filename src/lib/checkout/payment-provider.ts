/**
 * Contrato para una futura pasarela de pago (Stripe, Mercado Pago, PayPal…).
 *
 * IMPORTANTE: no existe ninguna integración de pago activa. El proveedor por
 * defecto (`unconfiguredProvider`) nunca procesa pagos ni confirma pedidos.
 * Para integrar uno real, implementa `PaymentProvider` en el servidor
 * (Route Handler / Server Action) y sustitúyelo en `getPaymentProvider()`.
 */
export interface CheckoutLineItem {
  productId: string;
  quantity: number;
  /** Precio unitario validado en servidor, nunca el enviado por el cliente. */
  unitPrice: number;
}

export interface CheckoutCustomer {
  email: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export type CheckoutResult =
  | { status: "redirect"; url: string }
  | { status: "unavailable"; reason: string };

export interface PaymentProvider {
  id: string;
  createCheckoutSession(items: CheckoutLineItem[], customer: CheckoutCustomer): Promise<CheckoutResult>;
}

export const unconfiguredProvider: PaymentProvider = {
  id: "none",
  async createCheckoutSession() {
    return {
      status: "unavailable",
      reason: "La pasarela de pago todavía no está integrada. No se ha realizado ningún cargo ni se ha creado ningún pedido.",
    };
  },
};

export function getPaymentProvider(): PaymentProvider {
  return unconfiguredProvider;
}
