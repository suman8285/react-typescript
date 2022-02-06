export interface IUserBalance {
  walletBalance: number;
}

export interface IDashboardState extends IUserBalance {
  isLoading?: boolean;
  error?: string;
}
