import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { Login } from '../index';

interface IHistory {
  push: (url: string) => void;
}

interface ILocation {
  state: {
    [key: string]: string;
  };
}

const mockCallBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useHistory: (): IHistory => ({
    push: mockCallBack,
  }),
  useLocation: (): ILocation => ({
    state: {
      from: '',
    },
  }),
}));

const store: Store = configureAppStore();

describe('Login Page', (): void => {
  it('Matching the snapshot', (): void => {
    const { asFragment } = render(
      <Provider store={store}>
        <Login storage={window.localStorage} />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Login button should be defined', (): void => {
    render(
      <Provider store={store}>
        <Login storage={window.localStorage} />
      </Provider>,
    );
    const loginButton = screen.getAllByRole('button')[0];
    expect(loginButton).toBeDefined();
  });

  describe('Login page state', (): void => {
    beforeEach((): void => {
      render(
        <Provider store={store}>
          <Login storage={window.localStorage} />
        </Provider>,
      );
    });

    it('Should change the username-state on username input', (): void => {
      const inputUsername = screen.getAllByRole('textbox')[0];
      expect(inputUsername).toHaveValue('');
      fireEvent.change(inputUsername, { target: { value: 'chuck' } });
      expect(inputUsername).toHaveValue('chuck');
    });

    it('Should trigger the doLogin function on Login', async () => {
      const { asFragment } = render(
        <Provider store={store}>
          <Login storage={window.localStorage} />
        </Provider>,
      );

      const loginButton = screen.getAllByRole('button')[0];
      fireEvent.click(loginButton);

      await waitFor(() =>
        expect(store.getState().auth.initialized).toBeTruthy(),
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
