import { IRootState } from 'types';
import { Saga } from 'redux-saga';
import { SagaInjectionModes } from 'redux-injectors';
import { Reducer, AnyAction } from '@reduxjs/toolkit';

type RequiredRootState = Required<IRootState>;

export type RootStateKeyType = keyof IRootState;

export type InjectedReducersType = {
  [P in RootStateKeyType]?: Reducer<RequiredRootState[P], AnyAction>;
};
export interface InjectReducerParams<Key extends RootStateKeyType> {
  key: Key;
  reducer: Reducer<RequiredRootState[Key], AnyAction>;
}

export interface InjectSagaParams {
  key: RootStateKeyType | string;
  saga: Saga;
  mode?: SagaInjectionModes;
}
