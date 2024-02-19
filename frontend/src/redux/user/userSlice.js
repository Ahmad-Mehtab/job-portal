import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isAuthorized: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAuthorize: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthorized = true;
    }
  },
});

export const {
  userAuthorize,
} = userSlice.actions;

export default userSlice.reducer;
