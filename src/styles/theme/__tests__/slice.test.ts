import * as slice from '../slice';
import { IThemeState, ThemeKeyType } from '../types';
import { IRootState } from 'types';
import { themes } from '../themes';
import { DefaultTheme } from 'styled-components';

describe('theme slice', () => {
  let state: IThemeState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should changeTheme', () => {
    expect(slice.reducer(state, slice.changeTheme('dark'))).toEqual<
      IThemeState
    >({ selected: 'dark' });
  });

  describe('selectors', () => {
    it('selectTheme', () => {
      let state: IRootState = {
        auth: {
          isAuthenticated: false,
          token: '',
          isLoggingIn: false,
          loginError: '',
          initialized: false,
        },
      };
      expect(slice.selectTheme(state)).toEqual<DefaultTheme>(themes.light);
      state = {
        theme: { selected: 'system' },
        auth: {
          isAuthenticated: false,
          token: '',
          isLoggingIn: false,
          loginError: '',
          initialized: false,
        },
      };
      expect(slice.selectTheme(state)).toEqual<DefaultTheme>(themes.light);

      state = {
        theme: { selected: 'dark' },
        auth: {
          isAuthenticated: false,
          token: '',
          isLoggingIn: false,
          loginError: '',
          initialized: false,
        },
      };
      expect(slice.selectTheme(state)).toEqual<DefaultTheme>(themes.dark);
    });

    it('selectThemeKey', () => {
      let state: IRootState = {
        auth: {
          isAuthenticated: false,
          token: '',
          isLoggingIn: false,
          loginError: '',
          initialized: false,
        },
      };
      expect(slice.selectThemeKey(state)).toEqual<ThemeKeyType>(
        slice.initialState.selected,
      );

      state = {
        theme: { selected: 'system' },
        auth: {
          isAuthenticated: false,
          token: '',
          isLoggingIn: false,
          loginError: '',
          initialized: false,
        },
      };
      expect(slice.selectThemeKey(state)).toEqual<ThemeKeyType>(
        state.theme!.selected,
      );
    });
  });
});
