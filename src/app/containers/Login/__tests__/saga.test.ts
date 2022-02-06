import { put, takeLatest } from 'redux-saga/effects';
import { authSaga, getToken } from '../saga';
import { AUTH_LOGGING_IN } from '../action_types';
import { authLoggedIn, authError } from '../actions';

describe('getToken Saga', () => {
  let token: string | null;
  let getTokenIterator: ReturnType<typeof getToken>;
  let authInitializePutDescriptor;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getTokenIterator = getToken({
      type: AUTH_LOGGING_IN,
      payload: {
        username: 'Nila',
        password: '1234456',
      },
    });
    authInitializePutDescriptor = getTokenIterator.next().value;

    expect(authInitializePutDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authLoggedIn action if it requests the data successfully', () => {
    token =
      'dhsfhdijskljdlklkhgskljjgklsd.dbvjksbsjhijrgokodl.bchdfgakeufhaufhio';
    const response = {
      data: {
        token,
      },
    };

    const putDescriptor = getTokenIterator.next(response).value;
    expect(putDescriptor).toEqual(put(authLoggedIn({ token })));
  });

  it('should dispatch user not found', () => {
    const putDescriptor = getTokenIterator.throw({ response: { status: 404 } })
      .value;
    expect(putDescriptor).toEqual(put(authError('User Not Found')));
  });

  it('should dispatch unknown error', () => {
    const putDescriptor = getTokenIterator.throw({
      response: {
        status: 401,
        data: {
          message: 'Invalid password',
        },
      },
    }).value;
    expect(putDescriptor).toEqual(put(authError('Invalid password')));
  });
});

describe('authSaga Saga', () => {
  const authIterator = authSaga();
  it('should start task to watch for auth login action', () => {
    const takeLatestDescriptor = authIterator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(AUTH_LOGGING_IN, getToken));
  });
});
