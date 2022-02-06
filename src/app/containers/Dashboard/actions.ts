import {
  USER_BALANCE,
  USER_BALANCE_ERROR,
  USER_BALANCE_SUCCESS,
} from './action_types';
import { IUserBalance, IDashboardState } from './types';

interface IAction {
  type: string;
  payload?: string | number;
}

export const getBalance = (): IAction => {
  return {
    type: USER_BALANCE,
  };
};

export const getBalanceSuccess = (payload: number): IAction => {
  return {
    type: USER_BALANCE_SUCCESS,
    payload,
  };
};

export const getBalanceError = (payload: string): IAction => {
  return {
    type: USER_BALANCE_ERROR,
    payload,
  };
};
