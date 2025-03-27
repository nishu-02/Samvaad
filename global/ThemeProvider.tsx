import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { PaperProvider } from "react-native-paper";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, isDarkMode } = useSelector((state: any) => state.theme); // Use Redux-stored theme

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={{ dark: isDarkMode, colors: theme.colors }}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        {children}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default ThemeProvider;
