import { put, takeLatest, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { request } from 'utils/request';
import { RegisterEndpoint } from 'app/components/common/Constants';
import { IRegisterUser } from './types';
import { USER_REGISTRATION } from './action_types';
import {
  userRegistring,
  userRegistrationError,
  userRegistrationSuccess,
} from './actions';

interface IResponse {
  data: string;
}
// change the IRegisterUser appropriately toas Login
export function* registerUser(action: PayloadAction<IRegisterUser>): Generator {
  console.log('in generator');

  try {
    const { username, password } = action.payload;
    const { data } = (yield call(request, {
      url: RegisterEndpoint,
      method: 'post',
      data: {
        userId: username,
        password,
      },
    })) as IResponse;

    yield put(userRegistrationSuccess());
  } catch (err) {
    console.log('in catch');

    const errorMessage =
      err.response.status === 404
        ? 'User Not Found'
        : err.response.data.message;
    yield put(userRegistrationError(errorMessage));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* registerSaga(): Generator {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(USER_REGISTRATION, registerUser);
}
