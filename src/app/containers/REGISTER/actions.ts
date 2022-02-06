import {
  USER_REGISTRATION,
  USER_REGISTRATION_ERROR,
  USER_REGISTRATION_SUCCESS,
} from './action_types';
import { IRegisterUser } from './types';

interface IAction {
  type: string;
  payload?: string | IRegisterUser;
}

export const userRegistring = (payload: IRegisterUser): IAction => {
  console.log('In this');

  return {
    type: USER_REGISTRATION,
    payload,
  };
};

export const userRegistrationSuccess = (): IAction => {
  console.log('in action2');

  return {
    type: USER_REGISTRATION_SUCCESS,
  };
};

export const userRegistrationError = (payload: string): IAction => {
  console.log('in action2', payload);

  return {
    type: USER_REGISTRATION_ERROR,
    payload,
  };
};
