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
import { userRegistring } from './actions';
import { registerSaga } from './saga';
import { useHistory, Redirect } from 'react-router-dom';
import { IRegisterState } from './types';
import { IRootState } from 'types';
import { HomeURL, TOKEN_KEY, LoginURL } from 'app/components/common/Constants';
import { media } from 'styles/media';

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
  height: 690px;
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

export function REGISTER(): React.ReactElement {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga: registerSaga });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phonenumber, setPhonenumber] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const { isRegistered, registerError } = useSelector(
    (state: IRootState): IRegisterState => state.register,
  );

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFirstName(e.currentTarget.value);
  };

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLastName(e.currentTarget.value);
  };

  const handlePhonenumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPhonenumber(+e.currentTarget.value);
  };

  const doSignup = (): void => {
    console.log('_______ signup');
    dispatch(userRegistring({ username, password }));
  };

  const goTo = (): void => {
    if (isRegistered) {
      history.push(LoginURL);
    } else if (registerError) {
      history.push(HomeURL);
    }
  };

  useEffect(goTo, [isRegistered, registerError]);

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
          Cryptocurrency <b>Wallet</b>
        </White>
      </TopBlackHeader>
      <Body>
        <Container>
          <LoginPage>
            <Heading>sign Up</Heading>
            <SubHeading>Sign Up to your Diem Wallet account.</SubHeading>
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
              <Input
                value={firstName}
                id="firstName"
                type="text"
                placeholder="First Name"
                onChange={handleFirstName}
              />
              <Input
                value={lastName}
                id="lastName"
                type="text"
                placeholder="Last Name"
                onChange={handleLastName}
              />
              <Input
                value={phonenumber}
                id="phonenumber"
                type="number"
                placeholder="phonenumber"
                onChange={handlePhonenumber}
              />
              <br />
              <ButtonRegister onClick={doSignup}>Register</ButtonRegister>
            </Row>
          </LoginPage>
        </Container>
      </Body>
    </>
  );
}
