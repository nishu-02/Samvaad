import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import MyFAB from './components/MyComponent'
const ChatListScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>is it working as the way it was intended</Text>
      <MyFAB navigation={navigation}/>
    </SafeAreaView>
  );
}

export default ChatListScreen

const styles = StyleSheet.create({})