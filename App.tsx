import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import { store } from "./global/store";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";

// Screens
import AppNavigator from "./AppNavigator";

const MainApp = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  const paperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
  const navigationTheme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
