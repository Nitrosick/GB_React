import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileState {
  name: string;
  visible: boolean;
  isAuth: boolean;
}

const initialState: ProfileState = {
  name: 'GB',
  visible: true,
  isAuth: false,
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
    changeAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { toggleProfile, changeName, changeAuth } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
