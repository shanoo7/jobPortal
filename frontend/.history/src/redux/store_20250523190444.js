// // src/redux/store.js
// import { configureStore } from "@reduxjs/toolkit";
// import jobReducer from "./slices/jobSlice";
// import companyReducer from "./slices/companySlice";
// import authReducer from "./slices/authSlice";
// import applicationReducer from "./slices/applicationSlice";

// const store = configureStore({
//   reducer: {
//     job: jobReducer,
//     company: companyReducer,
//     auth: authReducer,
//     application: applicationReducer,
//   },
// });

// export default store;


import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import companyReducer from "./slices/companySlice";
import authReducer from "./slices/authSlice";
import applicationReducer from "./slices/applicationSlice";

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

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Persist config only for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"], // only persist the user object from auth state
};

// Wrap authReducer with persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    job: jobReducer,
    company: companyReducer,
    auth: persistedAuthReducer,  // use persisted reducer here
    application: applicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
