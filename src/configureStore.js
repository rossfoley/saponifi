import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { devToolsEnhancer } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, devToolsEnhancer());
  let persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(
        persistReducer(persistConfig, nextRootReducer)
      );
    })
  }

  return { store, persistor };
};
