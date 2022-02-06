import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components/macro';
import {
  Row as BaseRow,
  Container as BaseContainer,
} from 'react-awesome-styled-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { key, reducer } from '../Dashboard/reducer';
import { balanceSaga } from './saga';
import { useHistory } from 'react-router-dom';
import { IRootState } from 'types';
import { IDashboardState } from './types';
import { media } from 'styles/media';
import { getBalance } from './actions';
import { authLogout } from '../Login/actions';

export function Dashboard(): React.ReactElement {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga: balanceSaga });

  const dispatch = useDispatch();
  const history = useHistory();

  const { initialized, isAuthenticated, username } = useSelector(
    (state: IRootState) => state.auth,
  );
  const { walletBalance } = useSelector(
    (state: IRootState): IDashboardState => state.balance,
  );

  console.log(initialized, '*in dashboard**', isAuthenticated);

  const doTrasnfer = (): void => {
    console.log('_______ transfer');
    history.push('/transfer');
  };

  const doLogout = (): void => {
    dispatch(authLogout());
  };
  const onMount = (): void => {
    console.log('_______ onMount');
    dispatch(getBalance());
  };

  useEffect(onMount, []);

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
          Cryptocurrency <b>Wallet</b> Dashboard
        </White>
        <LogoutButton onClick={doLogout}>Logout</LogoutButton>
      </TopBlackHeader>
      <Body>
        <Container>
          <LoginPage>
            <Heading>
              <TopGrayHeader>
                {/* <White>
                  Name: <b>{username.toLocaleUpperCase()}</b>
                </White> */}
                <White>
                  Account No: <b>{username.toLocaleUpperCase()}</b>
                </White>
              </TopGrayHeader>
              <TopGrayHeader>
                <White>
                  Wallet Amount = <b>{walletBalance}$</b>
                </White>
              </TopGrayHeader>
            </Heading>
            <ButtonRegister onClick={doTrasnfer}>
              Initiate Transfer
            </ButtonRegister>
          </LoginPage>
        </Container>
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 95vh;
  background-image: linear-gradient(258deg, #93dc6d 5%, #1f9cc3);
  background-repeat: no-repeat;
  background-size: cover;
`;

const Container = styled(BaseContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
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
  width: 100%;
  height: 60px;
  padding: 0 30px;
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

const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  margin-left: 60%;
  width: 10%;
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
    width: 50%;
  `}
`;

const LoginPage = styled(BaseContainer)`
  width: 960px;
  height: 580px;
  background: #fff;
  flex-direction: column;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
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

const TopGrayHeader = styled.div`
  height: 104px;
  padding: 20px;
  flex-direction: column;
  background-color: gray;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 4px;
  margin-bottom: 10px;
  ${media.small`
    width: 100%;
  `}
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
  background-color: green;
  border: 1px solid transparent;
  color: white;
  padding: 20px 0;
  border-radius: 30px;
  font-size: 14px;
  :focus {
    background: green;
    border: 1px solid green;
  }
  ${media.small`
    width: 100%;
  `}
`;
