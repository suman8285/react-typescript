import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components/macro';
import {
  Row as BaseRow,
  Container as BaseContainer,
} from 'react-awesome-styled-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { key, reducer } from '../REGISTER/reducer';
import { useHistory } from 'react-router-dom';
import { IRootState } from 'types';
import { media } from 'styles/media';
import { userTransfering, reset } from './actions';
import { key as transferKey, reducer as transferReducer } from './reducer';
import { transferSaga } from './saga';
import { authLogout } from '../Login/actions';
import { DashboardUrl } from 'app/components/common/Constants';

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

const SubHeading = styled.p`
  width: 60%;
  font-size: 25px;
  font-weight: 500;
  color: ${(props): string => props.theme.black};
  text-align: center;
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  ${media.small`
    width: 100%;
    font-size: 20px;
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
  text-align: center;
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
  width: 100%;
  border: 0;
  background-color: green;
  border: 1px solid transparent;
  color: white;
  padding: 20px 0;
  margin-top: 20px;
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
  ${media.small`
    width: 50%;
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
    margin-left: 20%;
  `}
`;

export function Transfer(): React.ReactElement {
  useInjectReducer({ key, reducer });
  useInjectReducer({ key: transferKey, reducer: transferReducer });
  useInjectSaga({ key, saga: transferSaga });

  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const { auth, transfer: transferState } = useSelector(
    (state: IRootState) => state,
  );
  const { username } = auth;
  const { isLoading, transferSuccess } = transferState;

  const handleAccountNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setAccountNumber(e.currentTarget.value);
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(+e.currentTarget.value);
  };

  const transfer = (): void => {
    dispatch(userTransfering({ amount, accountNumber }));
  };

  const goBack = (): void => {
    history.push(DashboardUrl);
  };

  const onMount = (): (() => void) => {
    return (): void => {
      dispatch(reset());
    };
  };

  const goToDashboard = (): void => {
    if (transferSuccess) {
      history.push(DashboardUrl);
    }
  };

  const doLogout = (): void => {
    dispatch(authLogout());
  };

  useEffect(onMount, []);
  useEffect(goToDashboard, [isLoading]);
  console.log('transfer', transferSuccess);
  return (
    <>
      <Helmet>
        <title>sign up Page</title>
        <meta
          name="description"
          content="A React Boilerplate application Homepage"
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
            <SubHeading>Transfer to your Payee</SubHeading>
            <Row>
              <Input
                value={username}
                id="accountNumber"
                type="text"
                placeholder="Your Account Number"
                onChange={handleAccountNumber}
              />
              <Input
                value={accountNumber}
                id="payeeAccountNumber"
                type="text"
                placeholder="Payee Account Number"
                onChange={handleAccountNumber}
              />
              <Input
                value={amount}
                id="amount"
                type="number"
                placeholder="Amount to transfer"
                onChange={handleAmount}
              />

              <Button onClick={transfer}>Transfer</Button>
              <Button onClick={goBack}>Back to Dashboard</Button>
            </Row>
          </LoginPage>
        </Container>
      </Body>
    </>
  );
}
