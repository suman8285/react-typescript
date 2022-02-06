import React from 'react';
import { render } from '@testing-library/react';
import { PageNotFound } from '../index';
import { BrowserRouter } from 'react-router-dom';

describe('Page Not Found', () => {
  it('Matching the snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
