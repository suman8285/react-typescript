import { put, takeLatest, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { request } from 'utils/request';
import { WalletEndpoint } from 'app/components/common/Constants';
import { IUserBalance } from './types';
import { USER_BALANCE } from './action_types';
import { getBalance, getBalanceSuccess, getBalanceError } from './actions';

interface IResponse {
  data: {
    walletBalance: number;
  };
}

export function* balanceEnquire(): Generator {
  try {
    const { data } = (yield call(request, {
      url: WalletEndpoint,
      method: 'get',
    })) as IResponse;

    yield put(getBalanceSuccess(data.walletBalance));
  } catch (err) {
    const errorMessage =
      err.response.status === 404
        ? 'User Not Found'
        : err.response.data.message;
    yield put(getBalanceError(errorMessage));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* balanceSaga(): Generator {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(USER_BALANCE, balanceEnquire);
}
