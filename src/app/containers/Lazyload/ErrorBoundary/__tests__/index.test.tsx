import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ErrorBoundary from '../index';

const history = createMemoryHistory();

function ProblemChild(): React.ReactElement {
  throw new Error('Error thrown from problem child');
  return <div>Error</div>;
}

describe('ErrorBoundary Component', (): void => {
  it('Match the snapshot without error', (): void => {
    const { asFragment } = render(
      <BrowserRouter>
        <ErrorBoundary>
          <div>Hello World</div>
        </ErrorBoundary>
      </BrowserRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('Match the snapshot without error', (): void => {
    const { asFragment } = render(
      <BrowserRouter>
        <ErrorBoundary>
          <div>Hello World</div>
        </ErrorBoundary>
      </BrowserRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('Match the snapshot with error', (): void => {
    const { asFragment } = render(
      <BrowserRouter>
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      </BrowserRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should rerender successfully on retry click', (): void => {
    const { container, rerender } = render(
      <Router history={history}>
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      </Router>,
    );

    const button = screen.getByText('Retry');
    expect(button).toBeDefined();

    rerender(
      <Router history={history}>
        <ErrorBoundary>
          <div>Hello World</div>
        </ErrorBoundary>
      </Router>,
    );

    fireEvent.click(button);

    const element = container.getElementsByTagName('div');
    expect(element[0]).toHaveTextContent('Hello World');
  });
});
