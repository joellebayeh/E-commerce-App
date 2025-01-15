import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import categoriesReducer from "./slices/categorySlice";
import addProductReducer from "./slices/addProductSlice";
import productsReducer from "./slices/productListSlice";
import { combineReducers } from "@reduxjs/toolkit";

// Combine all your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  categories: categoriesReducer,
  addProduct: addProductReducer,
  products: productsReducer,
});

// Persist configuration
const persistConfig = {
  key: "root", // Key for storing the state in storage
  storage, // Type of storage to use (localStorage in this case)
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializability check for redux-persist
      }),
});

// Create a persistor to persist the store
export const persistor = persistStore(store);

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
