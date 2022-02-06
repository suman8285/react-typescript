import { put, takeLatest, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { request } from 'utils/request';
import { LoginEndpoint } from 'app/components/common/Constants';
import { IAuthCredentials, ILoginUser } from './types';
import { AUTH_LOGGING_IN } from './action_types';
import { authLoggedIn, authError } from './actions';

interface IResponse {
  data: ILoginUser;
}

export function* getToken(action: PayloadAction<IAuthCredentials>): Generator {
  try {
    const { username, password } = action.payload;
    const { data } = (yield call(request, {
      url: LoginEndpoint,
      method: 'post',
      data: {
        userId: username,
        password,
      },
    })) as IResponse;

    yield put(authLoggedIn({ token: data.token, username: data.username }));
  } catch (err) {
    const errorMessage =
      err.response.status === 404
        ? 'User Not Found'
        : err.response.data.message;
    yield put(authError(errorMessage));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* authSaga(): Generator {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(AUTH_LOGGING_IN, getToken);
}
