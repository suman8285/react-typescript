import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import {
  Row as BaseRow,
  Container as BaseContainer,
} from 'react-awesome-styled-grid';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import {
  HomeURL,
  RegisterURL,
  TOKEN_KEY,
  DashboardUrl,
} from 'app/components/common/Constants';
import { IRootState } from 'types';
import { key, reducer } from './reducer';
import { authSaga } from './saga';
import { authLoggingIn, authInitialize } from './actions';
import { IAuthState } from './types';
import { media } from 'styles/media';

const Body = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(258deg, #93dc6d 5%, #1f9cc3);
  background-repeat: no-repeat;
  background-size: cover;
`;

const Container = styled(BaseContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50%;
  color: white;
  padding-left: 0px;
  padding-right: 0px;
  ${media.small`
    width: 100%;
  `}
`;

const Heading = styled.p`
  font-size: 52px;
  font-weight: 100;
  color: ${(props): string => props.theme.black};
  margin: 0;
  padding-top: 5px;
  padding-bottom: 10px;
  ${media.small`
    width: 100%;
    font-size: 32px;
  `}
`;

const SubHeading = styled.p`
  width: 60%
  font-size: 20px;
  font-weight: 100;
  flex-direction: column;
  color: ${(props): string => props.theme.black};
  text-align: center;
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  ${media.small`
    width: 100%;
    font-size: 15px;
  `}
`;

const Row = styled(BaseRow)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  background: transparent;
  color: ${(props): string => props.theme.black};
  padding: 20px 0;
`;

const Input = styled.input`
  width: 50%;
  height: 60px;
  padding: 0 20px;
  border-radius: 30px;
  font-size: 14px;
  color: ${(props): string => props.theme.black};
  border: 1px solid ${(props): string => props.theme.darkGray};
  margin-bottom: 10px;
  &:focus-within {
    box-shadow: 0 0 15px ${(props): string => props.theme.gray};
  }
  ${media.small`
    width: 100%;
  `}
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border: 0;
  background-color: green;
  border: 1px solid transparent;
  color: white;
  padding: 20px 0;
  border-radius: 30px;
  font-size: 14px;
  :hover {
    cursor: pointer;
    background: green;
    border: 1px solid green;
  }
  :focus {
    background: green;
    border: 1px solid green;
  }
  ${media.small`
    width: 100%;
  `}
`;

const LoginPage = styled(BaseContainer)`
  width: 960px;
  height: 580px;
  background: #fff;
  flex-direction: column;
  border-radius: 16px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 80px 90px 25px 95px;
`;

const TopBlackHeader = styled.div`
  height: 64px;
  padding: 0px;
  top: 0;
  background-color: black;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const White = styled.div`
  color: white;
`;

const ButtonRegister = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border: 0;
  background-color: blue;
  border: 1px solid transparent;
  color: white;
  padding: 20px 0;
  border-radius: 30px;
  font-size: 14px;
  :hover {
    cursor: pointer;
    background: blue;
    border: 1px solid green;
  }
  :focus {
    background: green;
    border: 1px solid green;
  }
  ${media.small`
    width: 100%;
  `}
`;

interface ILoginProps {
  storage: Storage;
}

export function Login({ storage }: ILoginProps): React.ReactElement {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga: authSaga });

  const history = useHistory();
  const dispatch = useDispatch();

  const { isAuthenticated, token, loginError } = useSelector(
    (state: IRootState): IAuthState => state.auth,
  );

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const doLogin = (): void => {
    dispatch(authLoggingIn({ username, password }));
  };

  const doRegister = (): void => {
    console.log('history');
    history.push(RegisterURL);
  };

  const authenticate = (): void => {
    if (!isAuthenticated) {
      dispatch(authInitialize({ token: storage.getItem(TOKEN_KEY) || '' }));
    } else {
      if (storage && token) {
        history.push(DashboardUrl);
      }
    }
  };

  useEffect(authenticate, [isAuthenticated, loginError]);

  return (
    <>
      <Helmet>
        <title>Login Page</title>
        <meta
          name="description"
          content="A React Boilerplate application Login page"
        />
      </Helmet>

      <TopBlackHeader>
        <White>
          Cryptocurrency <b>Wallet</b>
        </White>
      </TopBlackHeader>
      <Body>
        <Container>
          <LoginPage>
            <Heading>Log In</Heading>
            <SubHeading>Login to your Diem Wallet account.</SubHeading>
            <Row>
              <Input
                value={username}
                id="username"
                type="text"
                placeholder="username"
                onChange={handleUsername}
              />
              <Input
                value={password}
                id="password"
                type="password"
                placeholder="password"
                onChange={handlePassword}
              />
              <br />
              <Button onClick={doLogin}>LOGIN</Button>
              <SubHeading>Don’t have an account yet?</SubHeading>
              <ButtonRegister onClick={doRegister}>SIGN-UP</ButtonRegister>
            </Row>
          </LoginPage>
        </Container>
      </Body>
    </>
  );
}
