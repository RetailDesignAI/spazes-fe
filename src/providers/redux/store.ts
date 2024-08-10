import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import projectReducer from './project/projectSlice';
import imageEditorReducer from './project/imageEditorSlice';
import loadersReducer from './loaders/loadersSlice';
import uiReducer from './ui/uiSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['project', 'loaders', 'ui', 'imageEditor'],
};

const rootReducer = combineReducers({
  project: projectReducer,
  imageEditor: imageEditorReducer,
  loaders: loadersReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
