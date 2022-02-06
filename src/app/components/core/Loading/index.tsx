import React from 'react';
import styled from 'styled-components/macro';
import Lottie from 'react-lottie';
import animationData from 'app/components/assets/animations/loading-circle.json';

const LoadingC = styled.div<ISchemeProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${(props): string =>
    props.position === 'fixed' ? 'fixed' : 'absolute'};
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${(props): string =>
    props.position === 'fixed' ? 'rgba(0, 0, 0, 0.5)' : 'none'};
  color: ${(props): string => props.theme.white};
  z-index: 29999;
`;

export const loaderOptions = {
  loop: true,
  autoplay: true,
  animationData,
};

interface ISchemeProp {
  position?: string;
}

interface ILoadingProp {
  width?: number;
  height?: number;
  position?: string;
}

export const Loading = (props: ILoadingProp): React.ReactElement => {
  const { width = 100, height = 100, position } = props;
  return (
    <LoadingC position={position}>
      <Lottie width={width} height={height} options={loaderOptions} />
    </LoadingC>
  );
};
