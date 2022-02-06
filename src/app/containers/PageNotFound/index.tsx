import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: ${(props): string => props.theme.text};
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;

const P = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: ${(props): string => props.theme.black};
  margin: 10px 0 24px 0;
`;
export function PageNotFound(): React.ReactElement {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Title>
        <P>Page not found.</P>
        <Link to="/">Return to Home Page</Link>
      </Wrapper>
    </>
  );
}
