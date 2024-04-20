import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    userPrompt: [],
    userSuggestionPrompt: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserPrompt: (state, action) => {
      state.userPrompt.push(action.payload);
    },
    setUserSuggestion: (state, action) => {
      state.userSuggestionPrompt = action.payload;
    },
  },
});

export const { setUser, setUserPrompt, setUserSuggestion } = userSlice.actions;
export default userSlice.reducer;
