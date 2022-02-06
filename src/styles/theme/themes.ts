const lightTheme: ITheme = {
  primary: 'rgba(215,113,88,1)',
  text: 'rgba(58,52,51,1)',
  textSecondary: 'rgba(58,52,51,0.7)',
  background: 'rgba(255,255,255,1)',
  backgroundVariant: 'rgba(251,249,249,1)',
  border: 'rgba(58,52,51,0.12)',
  borderLight: 'rgba(58,52,51,0.05)',
  black: '#000000',
  gray: '#f9f9fa',
  green: '#00a546',
  blue: '#0c77b9',
  darkGray: '#999999',
};

const darkTheme: ITheme = {
  primary: 'rgba(220,120,95,1)',
  text: 'rgba(241,233,231,1)',
  textSecondary: 'rgba(241,233,231,0.6)',
  background: 'rgba(0,0,0,1)',
  backgroundVariant: 'rgba(28,26,26,1)',
  border: 'rgba(241,233,231,0.15)',
  borderLight: 'rgba(241,233,231,0.05)',
  black: '#000000',
  gray: '#f9f9fa',
  green: '#00a546',
  blue: '#0c77b9',
  darkGray: '#999999',
};

export interface ITheme {
  primary: string;
  text: string;
  textSecondary: string;
  background: string;
  backgroundVariant: string;
  border: string;
  borderLight: string;
  black: string;
  gray: string;
  green: string;
  blue: string;
  darkGray: string;
}

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
