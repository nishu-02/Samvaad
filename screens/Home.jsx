import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import ChatListScreen from './ChatListScreen';
import Settings from './Settings';
import ContactList from './ContactList';

import useAuthStore from '../global/useAuthstore';

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
    const user = useAuthStore((state) => state.user);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Chat List') {
            iconName = 'message-text-outline';
          } else if (route.name === 'Contact') {
            iconName = 'account-group-outline';
          } else if (route.name === 'Settings') {
            iconName = 'cog-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3366FF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'white' },
      })}
    >
      <Tab.Screen name="Chat List" component={ChatListScreen} options ={{ headerShown: false}} />
      <Tab.Screen name="Contact" component={ContactList} />
      <Tab.Screen name="Settings" component={Settings} options = {{ headerShown: false}} />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
