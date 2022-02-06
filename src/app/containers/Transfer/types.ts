export interface ITransferUser {
  accountNumber: string;
  amount: number;
}

export interface ITransferState {
  isLoading: boolean;
  transferSuccess: boolean;
  transferError?: string;
}
