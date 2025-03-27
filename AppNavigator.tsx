import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import LoginScreen from "./screens/LoginScreen";
import AddContact from "./screens/AddContact";
import ChatScreen from "./screens/ChatScreen";
import FriendProfile from "./screens/FriendProfile";
import SearchScreen from "./screens/SearchScreen";
import Home from "./screens/Home";

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
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
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

export default AppNavigator;
