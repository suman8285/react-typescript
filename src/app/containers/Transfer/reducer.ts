import {
  USER_TRANSFER,
  USER_TRANSFER_ERROR,
  USER_TRANSFER_SUCCESS,
  RESET,
} from './action_types';
import { ITransferState } from './types';

export const initialState: ITransferState = {
  isLoading: false,
  transferSuccess: false,
  transferError: '',
};

export const reducer = (state = initialState, action): ITransferState => {
  switch (action.type) {
    case USER_TRANSFER:
      return {
        ...state,
        isLoading: true,
        transferSuccess: false,
      };
    case USER_TRANSFER_ERROR:
      return {
        ...state,
        isLoading: false,
        transferError: action.payload,
      };
    case USER_TRANSFER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transferSuccess: true,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export const key = 'transfer';
