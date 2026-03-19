import { Input, Select, Heading, Text } from "@/shared";
import type { SingleValue } from "react-select";

const DOCUMENT_TYPES = [
  { value: "CC", label: "Cédula de Ciudadanía (CC)" },
  { value: "NIT", label: "NIT" },
  { value: "TI", label: "Tarjeta de Identidad (TI)" },
  { value: "CE", label: "Cédula de Extranjería (CE)" },
  { value: "PP", label: "Pasaporte (PP)" },
];

export interface BasicInfoData {
  fullName: string;
  email: string;
  phoneNumber: string;
  documentType: string;
  documentNumber: string;
  address: string;
}

interface StepBasicInfoProps {
  data: BasicInfoData;
  onChange: (data: BasicInfoData) => void;
}

export function StepBasicInfo({ data, onChange }: StepBasicInfoProps) {
  const set = (field: keyof BasicInfoData) => (value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-5">
      <div>
        <Heading variant="h5" weight="bold" className="mb-1">
          Información del pagador
        </Heading>
        <Text variant="small" color="secondary">
          Estos datos se enviarán a PSE para procesar el pago.
        </Text>
      </div>

      <Input
        label="Nombre completo"
        type="text"
        placeholder="Juan Pérez"
        value={data.fullName}
        onChange={(e) => set("fullName")(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="juan@ejemplo.com"
          value={data.email}
          onChange={(e) => set("email")(e.target.value)}
        />
        <Input
          label="Teléfono"
          type="tel"
          placeholder="3001234567"
          value={data.phoneNumber}
          onChange={(e) => set("phoneNumber")(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Tipo de documento"
          options={DOCUMENT_TYPES}
          value={DOCUMENT_TYPES.find((o) => o.value === data.documentType) ?? null}
          onChange={(opt: SingleValue<{ value: string; label: string }>) =>
            set("documentType")(opt?.value ?? "CC")
          }
        />
        <Input
          label="Número de documento"
          type="text"
          placeholder="1234567890"
          value={data.documentNumber}
          onChange={(e) => set("documentNumber")(e.target.value)}
        />
      </div>

      <Input
        label="Dirección"
        type="text"
        placeholder="calle 1 # 2-3, bogotá"
        value={data.address}
        onChange={(e) => set("address")(e.target.value.toLowerCase())}
      />
    </div>
  );
}
