import { put, takeLatest, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { request } from 'utils/request';
import { TransferEndpoint } from 'app/components/common/Constants';
import { ITransferUser } from './types';
import { USER_TRANSFER } from './action_types';
import { userTransferError, userTransferSuccess } from './actions';

interface IResponse {
  data: {
    userId: string;
    walletStatus: string;
    error: string;
  };
}

export function* transferUser(action: PayloadAction<ITransferUser>): Generator {
  console.log('in generator');
  try {
    const { accountNumber, amount } = action.payload;
    const { data } = (yield call(request, {
      url: TransferEndpoint,
      method: 'post',
      data: {
        receivingId: accountNumber,
        amount,
      },
    })) as IResponse;

    yield put(userTransferSuccess(data.walletStatus));
  } catch (err) {
    console.log('in catch');

    const errorMessage =
      err.response.status === 404 ? 'User Not Found' : err.response.data.error;
    yield put(userTransferError(errorMessage));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* transferSaga(): Generator {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(USER_TRANSFER, transferUser);
}
