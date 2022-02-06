import React, { useEffect, Suspense } from 'react';
import {
  useLocation,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { useInjectReducer } from 'utils/redux-injectors';
import { Loading } from 'app/components/core/Loading';
import ErrorBoundary from '../containers/Lazyload/ErrorBoundary';
import {
  LoginURL,
  RegisterURL,
  DashboardUrl,
  TransferUrl,
  TOKEN_KEY,
} from 'app/components/common/Constants';
import {
  DashboardView,
  RegisterView,
  TransferView,
  PageNotFound,
} from './Lazyload';
import { IRootState } from 'types';
import { key, reducer } from './Login/reducer';
import { authInitialize } from './Login/actions';

const AppContainer = styled.div``;

const Body = styled.div`
  height: 100%;
  width: 100%;
`;

interface IAppProps {
  storage: Storage;
}

interface IRenderAppProps {
  history?: string;
  location?: string;
  match?: string;
  staticContext?: string;
}

export default function App(props: IAppProps): React.ReactElement {
  useInjectReducer({ key, reducer });

  const location = useLocation();
  const dispatch = useDispatch();
  const { initialized, isAuthenticated } = useSelector(
    (state: IRootState) => state.auth,
  );

  // const renderRegisterView = (): React.ReactElement => {
  //   return <RegisterView />;
  // };

  const renderDashboardView = (): React.ReactElement => <DashboardView />;

  const renderTransferView = (): React.ReactElement => <TransferView />;

  const render404 = (): React.ReactElement => <PageNotFound />;

  const renderApp = (
    a: RouteComponentProps<IRenderAppProps>,
  ): React.ReactNode => {
    const { location } = a;
    console.log('location', location);
    return (
      <Switch location={location}>
        <Route path={DashboardUrl} exact={true} render={renderDashboardView} />
        <Route path={TransferUrl} exact={true} render={renderTransferView} />

        <Route path="/">
          <Redirect to={DashboardUrl} />
        </Route>

        <Route render={render404} />
      </Switch>
    );
  };

  const authenticate = (): void => {
    const { storage } = props;
    if (!isAuthenticated) {
      dispatch(authInitialize({ token: storage.getItem(TOKEN_KEY) || '' }));
    }
  };

  useEffect(authenticate, []);

  if (initialized) {
    return isAuthenticated ? (
      <AppContainer>
        <Body>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Route render={renderApp} />
            </Suspense>
          </ErrorBoundary>
        </Body>
      </AppContainer>
    ) : (
      <Redirect to={{ pathname: LoginURL, state: { from: location } }} />
    );
  } else {
    return <Loading />;
  }
}
