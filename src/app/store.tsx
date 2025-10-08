import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from "../features/user/userSlice";
import novelsReducer from "../features/novel/novelSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    novels: novelsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
