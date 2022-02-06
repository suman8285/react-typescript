export interface IAuthCredentials {
  username: string;
  password: string;
}

export interface ILoginUser {
  token: string;
  username: string;
}

export interface IAuthState extends ILoginUser {
  initialized?: boolean;
  isLoggingIn: boolean;
  loginError: string;
  isAuthenticated: boolean;
}
