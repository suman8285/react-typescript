import React from 'react';
import { render } from '@testing-library/react';
import { Loading } from '../index';

describe('Loading Component', (): void => {
  it('Matching snapshot', () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
