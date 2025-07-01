import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import teachersReducer from "./teachers/slice";
import favoritesReducer from "./favorite/slice";
import { modalsReducer } from "./modal/slice";
import authReducer from "./auth/slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites", "auth"],
};

const rootReducer = combineReducers({
  teachers: teachersReducer,
  favorites: favoritesReducer,
  modals: modalsReducer,
  auth: authReducer,
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

export const persistor = persistStore(store);
