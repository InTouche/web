import { AnyAction, Dispatch } from 'redux';
import { History } from 'history';

export interface RootState {
}

export type StoreDependencies = {
  history: History;
  dispatch: Dispatch<AnyAction>;
};