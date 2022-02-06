import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './containers/Lazyload/ErrorBoundary';
import { LoginURL, RegisterURL } from 'app/components/common/Constants';
import {
  LoginView as Login,
  RegisterView as Register,
} from './containers/Lazyload';
import MainApp from './containers';
import ScrollToTop from './ScrollToTop';

import { GlobalStyle } from '../styles/global-styles';

export function App(): React.ReactElement {
  const renderLogin = (): React.ReactElement => {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Login storage={window.localStorage} />
        </Suspense>
      </ErrorBoundary>
    );
  };

  const renderRegister = (): React.ReactElement => {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Register />
        </Suspense>
      </ErrorBoundary>
    );
  };

  const renderApp = (): React.ReactElement => {
    return (
      <ScrollToTop>
        <MainApp storage={window.localStorage} />
      </ScrollToTop>
    );
  };
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route path={LoginURL} exact={true} component={renderLogin} />
        <Route path={RegisterURL} exact={true} render={renderRegister} />
        <Route path="/" render={renderApp} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
