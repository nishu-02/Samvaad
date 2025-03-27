import { createSlice } from "@reduxjs/toolkit";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export interface ThemeState {
  isDarkMode: boolean;
  theme: typeof MD3DarkTheme; // Store full theme object
}

const initialState: ThemeState = {
  isDarkMode: false,
  theme: MD3LightTheme, // Default to light mode theme
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? MD3DarkTheme : MD3LightTheme; // Update theme object
    },
    setTheme: (state, action: { payload: boolean }) => {
      state.isDarkMode = action.payload;
      state.theme = action.payload ? MD3DarkTheme : MD3LightTheme;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
