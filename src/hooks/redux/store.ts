import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer, { usersSlice } from "./user";
import healthReducer from "./health";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "health"],
};

const rootReducer = combineReducers({
  user: userReducer,
  users: usersSlice.reducer,
  health: healthReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
