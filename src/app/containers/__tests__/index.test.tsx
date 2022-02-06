import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { authInitialize, authLoggedIn, authError } from '../Login/actions';
import { TOKEN_KEY } from '../../components/common/Constants';
import App from '../index';

interface ILocation {
  state: {
    [key: string]: string;
  };
}

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useLocation: (): ILocation => ({
    state: {
      from: '',
    },
  }),
}));

const store: Store = configureAppStore();

describe('Container', () => {
  it('Matching the snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App storage={window.localStorage} />
        </BrowserRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Matching the snapshot when logging error', () => {
    window.localStorage.removeItem(TOKEN_KEY);
    store.dispatch(authError('User Not Found'));
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App storage={window.localStorage} />
        </BrowserRouter>
      </Provider>,
    );

    const redirect = screen.queryByRole('Redirect');
    expect(redirect).toBeDefined();

    expect(asFragment()).toMatchSnapshot();
  });

  it('Matching the snapshot when logged in', () => {
    const token =
      'hdgjshjhfldijalkvndjhvali.dbhkavauheiodaji.dbvajhvfaiuguqego';
    store.dispatch(authLoggedIn({ token }));
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App storage={window.localStorage} />
        </BrowserRouter>
      </Provider>,
    );

    const element = screen.queryByRole('div');
    expect(element).toBeDefined();

    expect(asFragment()).toMatchSnapshot();
  });

  it('Matching the snapshot when loading', () => {
    const token = '';
    store.dispatch(authInitialize({ token }));
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App storage={window.localStorage} />
        </BrowserRouter>
      </Provider>,
    );

    const element = screen.queryByRole('LoadingView');
    expect(element).toBeDefined();

    expect(asFragment()).toMatchSnapshot();
  });
});
