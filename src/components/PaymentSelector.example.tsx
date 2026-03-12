/**
 * Ejemplos de uso del componente PaymentSelector
 * Este archivo muestra diferentes formas de usar el componente
 */

import { PaymentSelector } from "./PaymentSelector";

// Ejemplo 1: Uso básico
export function BasicExample() {
  return <PaymentSelector />;
}

// Ejemplo 2: Con monto personalizado
export function WithAmountExample() {
  return <PaymentSelector amount="$250.00" />;
}

// Ejemplo 3: Con callbacks completos
export function WithCallbacksExample() {
  const handleClose = () => {
    console.log("Usuario cerró el selector de pagos");
  };

  const handleSubmit = (data: any) => {
    console.log("Datos del pago:", data);
    // Aquí puedes hacer el POST a tu API
    // fetch('/api/payments', { method: 'POST', body: JSON.stringify(data) })
  };

  return (
    <PaymentSelector
      amount="$500.00"
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
}

// Ejemplo 4: Integrado en un modal o flujo más complejo
export function IntegratedExample() {
  const handlePaymentComplete = (data: any) => {
    // Procesar el pago
    console.log("Procesando pago con:", data);
    
    // Validar datos
    if (!data.bank || !data.fullName || !data.email) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Enviar a la API
    // await processPayment(data);
  };

  return (
    <div>
      <PaymentSelector
        amount="$1,250.00"
        onSubmit={handlePaymentComplete}
      />
    </div>
  );
}
