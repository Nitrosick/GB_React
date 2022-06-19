import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileState {
  name: string;
  visible: boolean;
}

const initialState: ProfileState = {
  name: 'GB',
  visible: true,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleProfile: (state) => {
      state.visible = !state.visible;
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { toggleProfile, changeName } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
