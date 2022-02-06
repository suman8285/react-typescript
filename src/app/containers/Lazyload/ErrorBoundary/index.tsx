import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components/macro';
import NoInternet from 'app/components/svg/NoInternet';

const ContentWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  * {
    text-align: center;
  }
  .desc {
    font-weight: 400;
    margin-bottom: 16px;
  }
  a {
    color: inherit;
    text-decoration: underline;
    font-weight: bold;
  }
  button {
    width: 89px;
    height: 32px;
    margin-bottom: 12px;
  }
  @media (max-width: 500px) {
    width: 300px;
  }
  strong {
    font-weight: bold;
  }
`;

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.PureComponent<
  RouteComponentProps,
  IErrorBoundaryState
> {
  public state: IErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidUpdate(prevProps: RouteComponentProps): void {
    const { hasError } = this.state;
    const { pathname } = this.props.location;

    if (hasError && pathname !== prevProps.location.pathname) {
      this.setState({ hasError: false });
    }
  }

  public onRetry = (): void => {
    this.setState({ hasError: false });
  };

  public render(): {} | null | undefined {
    if (this.state.hasError) {
      return (
        <ContentWrapper>
          <p>
            <strong>
              Uh-oh! Something&#39;s not right. Please check whether you are
              connected to the internet and try again.
            </strong>
          </p>
          <button onClick={this.onRetry}>Retry</button>
          <div className="desc">
            If you still have trouble viewing this page,{' '}
            <a
              href={`mailto:example@gmail.com?subject=Failed to load page&body=Unable to access page: ${window.location.href}.`}
            >
              Click here
            </a>{' '}
            to let us know.
          </div>
          <NoInternet />
        </ContentWrapper>
      );
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
