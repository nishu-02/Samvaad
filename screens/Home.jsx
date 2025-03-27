import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {Icon} from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatListScreen from './ChatListScreen';
import Settings from './Settings';
import ContactList from './ContactList';


const Tab = createBottomTabNavigator();
const Home = ({navigation}) => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Chat List') {
            iconName = 'message-circle-outline';
          } else if (route.name === 'Contact') {
            iconName = 'people-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }

          return <Icon name={iconName} fill={color} style={{ width: size, height: size }} />;
        },
        tabBarActiveTintColor: '#3366FF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'white' },
      })}
    >
      <Tab.Screen name = "Chat List" component={ChatListScreen} />
      <Tab.Screen name = "Contact" component={ContactList} />
      <Tab.Screen name = "Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({})