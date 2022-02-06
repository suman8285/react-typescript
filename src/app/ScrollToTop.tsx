import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop(props): React.ReactElement {
  const location = useLocation();

  const scroll = (): void => {
    window.scrollTo(0, 0);
  };

  useEffect(scroll, [location.pathname]);

  return props.children;
}
