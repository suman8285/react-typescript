import { TOKEN_KEY, NAME } from 'app/components/common/Constants';
import {
  AUTH_INITIALIZE,
  AUTH_LOGGING_IN,
  AUTH_LOGGED_IN,
  AUTH_ERROR,
  AUTH_LOGOUT,
} from './action_types';
import { IAuthState } from './types';

//The initial state of the Auth container
export const initialState: IAuthState = {
  isAuthenticated: false,
  token: '',
  isLoggingIn: false,
  loginError: '',
  initialized: false,
  username: '',
};

export const reducer = (state = initialState, action): IAuthState => {
  switch (action.type) {
    case AUTH_INITIALIZE:
      const { token } = action.payload;
      if (token) {
        return {
          ...state,
          initialized: true,
          isLoggingIn: false,
          isAuthenticated: true,
          token,
          loginError: '',
        };
      } else {
        return {
          ...state,
          initialized: true,
          isLoggingIn: false,
          isAuthenticated: false,
          loginError: '',
        };
      }
    case AUTH_LOGGING_IN:
      return {
        ...state,
        username: action.payload.username,
        isLoggingIn: true,
        loginError: '',
      };
    case AUTH_LOGGED_IN:
      window.localStorage.setItem(TOKEN_KEY, action.payload.token);
      return {
        ...state,
        initialized: true,
        isLoggingIn: false,
        isAuthenticated: true,
        token: action.payload.token,
        loginError: '',
        username: action.payload.username,
      };
    case AUTH_ERROR:
      return {
        ...state,
        initialized: true,
        isAuthenticated: false,
        isLoggingIn: false,
        loginError: action.payload,
        token: '',
        username: '',
      };
    case AUTH_LOGOUT:
      window.localStorage.removeItem(TOKEN_KEY);
      return {
        ...state,
        initialized: true,
        isAuthenticated: false,
        token: '',
      };
    default:
      return state;
  }
};

export const key = 'auth';
