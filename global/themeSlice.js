import { createSlice } from "@reduxjs/toolkit";

const lightTheme = {
  dark: false,
  colors: {
    primary: "#3366FF",
    secondary: "#8F9BB3",
    background: "#FFFFFF",
    text: "#222B45",
    card: "#F7F9FC",
    border: "#E4E9F2",
  },
};

const darkTheme = {
  dark: true,
  colors: {
    primary: "#1E90FF",
    secondary: "#BB86FC",
    background: "#121212",
    text: "#FFFFFF",
    card: "#1E1E1E",
    border: "#333333",
  },
};

const initialState = {
  theme: lightTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme.dark ? lightTheme : darkTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
