import {
  USER_BALANCE,
  USER_BALANCE_ERROR,
  USER_BALANCE_SUCCESS,
} from './action_types';
import { IUserBalance, IDashboardState } from './types';

// the intial state of the IRegisterUser
export const initialState: IDashboardState = {
  error: '',
  isLoading: false,
  walletBalance: 0,
};

export const reducer = (state = initialState, action): IDashboardState => {
  switch (action.type) {
    case USER_BALANCE:
      console.log('in case');

      return {
        ...state,
        //walletBalance: action.payload.walletBalance,
        isLoading: true,
      };
    case USER_BALANCE_ERROR:
      console.log('error', action);

      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case USER_BALANCE_SUCCESS:
      const walletBalance = action.payload;
      return {
        ...state,
        isLoading: false,
        walletBalance,
      };
    default:
      return state;
  }
};

export const key = 'balance';
