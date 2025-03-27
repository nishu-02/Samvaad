import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import { store } from './global/store';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

// Screens
import LoginScreen from './screens/LoginScreen';
import AddContact from './screens/AddContact';
import ChatScreen from './screens/ChatScreen';
import FriendProfile from './screens/FriendProfile';
import SearchScreen from './screens/SearchScreen';

const ThemeProvider = () => {
  const theme = useSelector((state) => state.theme.theme);
  
  const LightTheme = {
    dark: false,
    colors: {
      primary: '#3366FF',
      secondary: '#8F9BB3',
      background: '#FFFFFF',
      text: '#222B45',
      card: '#F7F9FC',
      border: '#E4E9F2',
    },
  };

  const DarkThemeCustom = {
    dark: true,
    colors: {
      primary: '#1E90FF',
      secondary: '#BB86FC',
      background: '#121212',
      text: '#FFFFFF',
      card: '#1E1E1E',
      border: '#333333',
    },
  };

  return (
    <ApplicationProvider {...eva} theme={theme === 'light' ? eva.light : eva.dark}>
      <NavigationContainer theme={theme === 'light' ? LightTheme : DarkThemeCustom}>
        <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
        <AppNavigator />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const initialized = true;
  const authenticated = true;

  return (
    <Stack.Navigator>
      {!initialized ? (
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      ) : !authenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddContact" component={AddContact} options={{ headerShown: false }} />
          <Stack.Screen name="FriendProfile" component={FriendProfile} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

const SplashScreen = () => null;
const HomeScreen = () => null;

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider />
    </Provider>
  );
}
