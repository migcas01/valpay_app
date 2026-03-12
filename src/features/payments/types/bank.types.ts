export interface PseBank {
  code: string;
  name: string;
  logo?: string;
}

export interface PseBankListResponse {
  data: PseBank[];
}
