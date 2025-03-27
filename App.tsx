import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { useThemeStore } from './global/themeStore';

import LoginScreen from './screens/LoginScreen';
import AddContact from './screens/AddContact';
import ChatListScreen from './screens/ChatListScreen';
import ChatScreen from './screens/ChatScreen';
import ContactList from './screens/ContactList';
import FriendProfile from './screens/FriendProfile';
import SearchScreen from './screens/SearchScreen';
import Settings from './screens/Settings';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    text: 'black',
  },
};

const DarkThemeCustom = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    text: 'white',
  },
};

const Stack = createNativeStackNavigator();

function App() {
  const { theme } = useThemeStore(); // Get theme from Zustand store
  const initialized = true;
  const authenticated = false;

  return (
    <ApplicationProvider {...eva} theme={theme === 'light' ? eva.light : eva.dark}>
      <NavigationContainer theme={theme === 'light' ? LightTheme : DarkThemeCustom}>
        <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
        <Stack.Navigator>
          {!initialized ? (
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          ) : !authenticated ? (
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name="ChatList" component={ChatListScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
              <Stack.Screen name="AddContact" component={AddContact} options={{ headerShown: false }} />
              <Stack.Screen name="ContactList" component={ContactList} options={{ headerShown: false }} />
              <Stack.Screen name="FriendProfile" component={FriendProfile} options={{ headerShown: false }} />
              <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const SplashScreen = () => null;
const HomeScreen = () => null;

export default App;
