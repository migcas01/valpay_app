export type ApiKeyStatus = "active" | "revoked";

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  status: ApiKeyStatus;
  createdAt: string;
  lastUsedAt?: string;
  revokedAt?: string;
}

export interface CreateApiKeyPayload {
  name: string;
}

export interface CreateApiKeyResponse {
  apiKey: ApiKey;
  // Full key is only returned once on creation
  secret: string;
}

export interface ApiKeyListResponse {
  data: ApiKey[];
}
