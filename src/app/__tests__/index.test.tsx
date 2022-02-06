import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { App } from '../index';

const store = configureAppStore();

describe('App', () => {
  it('Matching the snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(asFragment).toMatchSnapshot();
  });
});
