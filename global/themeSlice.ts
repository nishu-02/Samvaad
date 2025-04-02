import { createSlice } from "@reduxjs/toolkit";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#1976D2",
    background: "#F5F7FA",
    text: "#001E3C",
    button: "#1976D2",
    sender: "#D6E4FF",
    receiver: "#E7EBEF",
  },
};

const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#90CAF9",
    background: "#121212",
    text: "pink",
    button: "#90CAF9",
    sender: "#1E3A5F",
    receiver: "#2D3B45",
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
