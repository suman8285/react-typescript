import { createReducer } from '../reducers';
import { Reducer, Action } from '@reduxjs/toolkit';
import { InjectedReducersType } from 'utils/types/injector-typings';

interface IState {
  [key: string]: string | number;
}

describe('reducer', () => {
  it('should inject reducers', (): void => {
    const dummyReducer = (s = { name: 'dummyName' }): IState => s;
    const reducer = createReducer({
      test: dummyReducer,
    } as InjectedReducersType) as Reducer<IState, Action>;
    const state = reducer({}, { type: '' });
    expect(state.test).toEqual({ name: 'dummyName' });
  });

  it('should return identity reducers when empty', () => {
    const reducer = createReducer() as Reducer<IState, Action>;
    const state = { a: 1 };
    const newState = reducer(state, { type: '' });
    expect(newState).toBe(state);
  });
});
