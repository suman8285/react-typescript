import React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { selectTheme, themeSliceKey, reducer } from './slice';
import { useInjectReducer } from 'redux-injectors';

export const ThemeProvider = (props: {
  children: React.ReactChild;
}): React.ReactElement => {
  useInjectReducer({ key: themeSliceKey, reducer });

  const theme = useSelector(selectTheme);
  return (
    <OriginalThemeProvider theme={theme}>
      {React.Children.only(props.children)}
    </OriginalThemeProvider>
  );
};
