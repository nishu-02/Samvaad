import { createSlice } from "@reduxjs/toolkit";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#6200ee",
    background: "#ffffff",
    text: "#000000",
    button: "#6200ee",
  },
};

const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#bb86fc",
    background: "#121212",
    text: "#ffffff",
    button: "#bb86fc",
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: false,
    theme: CustomLightTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? CustomDarkTheme : CustomLightTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
