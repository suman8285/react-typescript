export interface IRegisterUser {
  username: string;
  password: string;
}

export interface IRegisterState extends IRegisterUser {
  registerError?: string;
  isRegistring: boolean;
  isRegistered: boolean;
}
