import { useState } from "react";
import { Shield, CreditCard } from "lucide-react";
import { Select, Input, Button, RadioGroup, type RadioOption } from "../shared";

const banks = [
  { value: "1", label: "Bancolombia" },
  { value: "2", label: "Davivienda" },
  { value: "3", label: "Nequi" },
  { value: "4", label: "Nu" },
  { value: "5", label: "Prueba" },
  { value: "6", label: "Nueva prueba" },
];

const paymentMethods: RadioOption[] = [
  {
    value: "pse",
    icon: <span className="font-black text-[10px] text-[#32325d]">PSE</span>,
    label: "PSE - Transferencia",
    active: true,
    enabled: true,
  },
  {
    value: "card",
    icon: <CreditCard size={16} strokeWidth={2.5} className="text-gray-400" />,
    label: "Tarjeta",
    subtitle: "Próximamente",
    active: false,
    enabled: false,
  },
];

interface PaymentSelectorProps {
  amount?: string;
  onClose?: () => void;
  onSubmit?: (data: PaymentData) => void;
}

export interface PaymentData {
  paymentMethod: string;
  bank: string;
  fullName: string;
  email: string;
}

export function PaymentSelector({ amount, onClose, onSubmit }: PaymentSelectorProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("pse");
  const [formData, setFormData] = useState({
    bank: "",
    fullName: "",
    email: "",
  });

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        paymentMethod: selectedPaymentMethod,
        ...formData,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F6F9FC] p-4 font-sans text-[#424770]">
      <div className="max-w-md w-full bg-white rounded-[20px] shadow-[0_15px_35px_0_rgba(50,50,93,0.1)] overflow-hidden">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-8 space-y-6">
          <RadioGroup
            name="paymentMethod"
            options={paymentMethods}
            value={selectedPaymentMethod}
            onChange={setSelectedPaymentMethod}
          />

          {selectedPaymentMethod === "pse" && (
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Información del banco
              </label>
              <div className="bg-gray-50/50 rounded-xl border border-gray-100">
                <Select
                  size="medium"
                  options={banks}
                  onChange={(option: any) =>
                    setFormData({ ...formData, bank: option?.value || "" })
                  }
                />
                <Input
                  type="text"
                  placeholder="Nombre completo"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-transparent text-[15px] text-[#32325d] outline-none border-b border-gray-100"
                />
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-transparent text-[15px] text-[#32325d] outline-none"
                />
              </div>
            </div>
          )}

          <div className="pt-4">
            <Button
              onClick={handleSubmit}
              className="w-full h-12 font-bold shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Pay {amount || "[AMOUNT]"}</span>
              <Shield size={20} />
            </Button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Powered by{" "}
              <span className="font-black text-gray-600">Valpay</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
