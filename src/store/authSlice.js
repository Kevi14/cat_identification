import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    resetTokens(state) {
      return initialState;
    },
  },
});

export const { setAccessToken, setRefreshToken,resetTokens } = authSlice.actions;

export default authSlice.reducer;
