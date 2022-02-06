import { AnyAction } from 'redux';
import { reducer, initialState } from '../reducer';
import { IAuthState } from '../types';
import {
  AUTH_INITIALIZE,
  AUTH_LOGGING_IN,
  AUTH_LOGGED_IN,
  AUTH_ERROR,
  AUTH_LOGOUT,
} from '../action_types';

describe('Auth reducer', () => {
  let state: IAuthState;
  const action: AnyAction = {
    type: '',
  };

  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, action)).toEqual<IAuthState>(state);
  });

  it('should handle authInitialize', () => {
    const token =
      'fdflhfokd.nvakjvgaekuhfgeofjkfnvcj.dvbdkjahgeaoiufpojfcsjkbvksjagoiewUFOPW';
    action.type = AUTH_INITIALIZE;
    action.payload = {
      token,
    };
    expect(reducer(state, action)).toEqual<IAuthState>({
      ...state,
      initialized: true,
      isLoggingIn: false,
      isAuthenticated: true,
      loginError: '',
      token,
    });
  });

  it('should handle authLoggingIn', () => {
    action.type = AUTH_LOGGING_IN;
    expect(reducer(state, action)).toEqual<IAuthState>({
      ...state,
      isLoggingIn: true,
      loginError: '',
    });
  });

  it('should handle authLoggedIn', () => {
    const token =
      'fdflhfokd.nvakjvgaekuhfgeofjkfnvcj.dvbdkjahgeaoiufpojfcsjkbvksjagoiewUFOPW';
    action.type = AUTH_LOGGED_IN;
    action.payload = {
      token,
    };
    expect(reducer(state, action)).toEqual<IAuthState>({
      ...state,
      initialized: true,
      isLoggingIn: false,
      isAuthenticated: true,
      loginError: '',
      token,
    });
  });

  it('should handle authError', () => {
    const error = 'User Not Found';
    action.type = AUTH_ERROR;
    action.payload = error;
    expect(reducer(state, action)).toEqual<IAuthState>({
      ...state,
      initialized: true,
      isLoggingIn: false,
      isAuthenticated: false,
      loginError: error,
      token: '',
    });
  });

  it('should handle authLogout', () => {
    action.type = AUTH_LOGOUT;
    expect(reducer(state, action)).toEqual<IAuthState>({
      ...state,
      initialized: true,
      isAuthenticated: false,
      token: '',
    });
  });
});
