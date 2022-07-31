import { createBrowserHistory } from 'history';
import {
  applyMiddleware,
  CombinedState,
  createStore,
  Dispatch,
  Reducer,
  Store,
} from 'redux';
import * as logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import actionCreatorFactory, { Action, AnyAction } from 'typescript-fsa';

import appReducer from './rootReducer';
import rootEpic from './rootEpic';
import { RootState, StoreDependencies } from './StoreTypes';

const factory = actionCreatorFactory('root');

export const RootStoreAction = {
  resetStore: factory<RootState>('RESET_STORE'),
};

const configureStore = (): Store<CombinedState<RootState>, AnyAction> => {
  const history = createBrowserHistory();

  const epicMiddleware = createEpicMiddleware<
    AnyAction,
    AnyAction,
    RootState,
    StoreDependencies
  >({
    dependencies: {
      history,
      get dispatch(): Dispatch<AnyAction> {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return store.dispatch;
      },
    },
  });

  const middleware =
    process.env.NODE_ENV === 'development'
      ? [epicMiddleware, logger.createLogger()]
      : [epicMiddleware];

  /** В случае action RESET_STORE, возвращаем стору в изначальное состояние, оставляя только вебсокеты */

  const rootReducer = (
    state: CombinedState<RootState>,
    action: AnyAction,
  ): any => {
    if (action.type === RootStoreAction.resetStore.type) {
      const { payload } = action as Action<RootState>;

      return payload
    }

    return appReducer(state, action);
  };

  const store = createStore(
    rootReducer as Reducer<CombinedState<RootState>, AnyAction>,
    applyMiddleware(...middleware),
  );

  epicMiddleware.run(rootEpic as any);

  return store;
};

const store = configureStore();

export const initialStoreState = store.getState();

export default store;