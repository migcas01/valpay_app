import { useState } from "react";
import { Copy, Check, ShieldAlert } from "lucide-react";
import { Button, Callout, Heading, Text, Divider } from "../../../shared";

interface ApiKeyCreatedModalProps {
  secret: string;
  keyName: string;
  onClose: () => void;
}

export function ApiKeyCreatedModal({ secret, keyName, onClose }: ApiKeyCreatedModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(secret).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <ShieldAlert className="h-5 w-5 text-emerald-600" />
        </div>
        <Heading variant="h4" weight="medium">
          API Key Created
        </Heading>
      </div>

      <Callout
        type="warning"
        title="Save your key"
        description="Copy this key now. It will not be shown again."
      />

      <div>
        <Text variant="small" color="secondary" className="mb-1">
          Key name: <span className="font-medium text-gray-900">{keyName}</span>
        </Text>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md p-3">
          <code className="flex-1 text-sm font-mono text-gray-800 break-all">{secret}</code>
          <button
            onClick={handleCopy}
            className="shrink-0 p-1.5 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-200"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Divider />

      <Button color="secondary" onClick={onClose} className="w-full">
        I have saved my key
      </Button>
    </div>
  );
}
