import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isAuthorized: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      isAuthorized: true;
    }
  },
});

export const {
  signInSuccess,
} = userSlice.actions;

export default userSlice.reducer;
