import { StyleSheet } from 'react-native';
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ChatListScreen from './ChatListScreen';
import Settings from './Settings';
import ContactList from './ContactList';

import useAuthStore from '../global/useAuthstore';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const user = useAuthStore((state) => state.user);
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Chat List') {
            iconName = 'message-text-outline';
          } else if (route.name === 'Contact') {
            iconName = 'account-group-outline';
          } else if (route.name === 'Settings') {
            iconName = 'cog-outline';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.backdrop,
          borderTopWidth: 0.5,
          
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Chat List" component={ChatListScreen} />
      <Tab.Screen name="Contact" component={ContactList} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
