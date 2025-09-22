import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.name = '';
      state.email = '';
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
