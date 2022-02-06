import {
  USER_TRANSFER,
  USER_TRANSFER_ERROR,
  USER_TRANSFER_SUCCESS,
  RESET,
} from './action_types';
import { ITransferUser } from './types';

interface IAction {
  type: string;
  payload?: string | ITransferUser;
}

export const userTransfering = (payload: ITransferUser): IAction => {
  return {
    type: USER_TRANSFER,
    payload,
  };
};

export const userTransferSuccess = (payload: string): IAction => {
  return {
    type: USER_TRANSFER_SUCCESS,
    payload,
  };
};

export const userTransferError = (payload: string): IAction => {
  return {
    type: USER_TRANSFER_ERROR,
    payload,
  };
};

export const reset = (): IAction => {
  return {
    type: RESET,
  };
};
