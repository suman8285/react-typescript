import {
  USER_REGISTRATION,
  USER_REGISTRATION_ERROR,
  USER_REGISTRATION_SUCCESS,
} from './action_types';
import { IRegisterState } from './types';

export const initialState: IRegisterState = {
  username: '',
  password: '',
  isRegistered: false,
  isRegistring: false,
};

export const reducer = (state = initialState, action): IRegisterState => {
  switch (action.type) {
    case USER_REGISTRATION:
      console.log('in case');

      return {
        ...state,
        isRegistring: true,
      };
    case USER_REGISTRATION_ERROR:
      console.log('error', action);

      return {
        ...state,
        isRegistring: false,
        isRegistered: false,
        registerError: action.payload,
      };
    case USER_REGISTRATION_SUCCESS:
      console.log('error', action);

      return {
        ...state,
        isRegistring: false,
        isRegistered: true,
      };
    default:
      return state;
  }
};

export const key = 'register';
