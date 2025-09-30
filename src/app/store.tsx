import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import novelsReducer from "../features/novel/novelSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Kết nối reducer của user với store
    novels: novelsReducer,
  },
});

export default store;
