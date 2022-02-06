import {
  AUTH_INITIALIZE,
  AUTH_LOGGING_IN,
  AUTH_LOGGED_IN,
  AUTH_ERROR,
  AUTH_LOGOUT,
} from './action_types';
import { IAuthCredentials } from './types';

interface IAction {
  type: string;
  payload?: string | IToken | IAuthCredentials;
}

interface IToken {
  [key: string]: string;
}

export const authInitialize = (payload: IToken): IAction => {
  return {
    type: AUTH_INITIALIZE,
    payload,
  };
};

export const authLoggingIn = (payload: IAuthCredentials): IAction => {
  return {
    type: AUTH_LOGGING_IN,
    payload,
  };
};

export const authLoggedIn = (payload: IToken): IAction => {
  return {
    type: AUTH_LOGGED_IN,
    payload,
  };
};

export const authError = (payload: string): IAction => {
  console.log('in auth error login');

  return {
    type: AUTH_ERROR,
    payload,
  };
};

export const authLogout = (): IAction => {
  return {
    type: AUTH_LOGOUT,
  };
};
