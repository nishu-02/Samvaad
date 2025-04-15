import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { IconButton } from 'react-native-paper';

import ChatListScreen from './ChatListScreen';
import Settings from './Settings';
import ContactList from './ContactList';

import useAuthStore from '../global/useAuthstore';

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const user = useAuthStore((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Chats') {
            iconName = 'home';
          } else if (route.name === 'Contacts') {
            iconName = 'account-group';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }

          return (
            <IconButton
              icon={iconName}
              size={size - 2}
              iconColor={color}
              style={styles.icon}
            />
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          borderTopWidth: 0.5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen 
        name="Chats" 
        component={ChatListScreen} 
        options={{
          tabBarLabel: 'Chats'
        }}
      />
      <Tab.Screen 
        name="Contacts" 
        component={ContactList}
        options={{
          tabBarLabel: 'Contacts'
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings}
        options={{
          tabBarLabel: 'Settings'
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  icon: {
    margin: 0,
    padding: 0,
  }
});