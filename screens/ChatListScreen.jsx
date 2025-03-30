import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'; // ✅ Fixed FlatList & TouchableOpacity import
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, ActivityIndicator, MD2Colors } from 'react-native-paper';
import MyFAB from './components/MyComponent';
import useUserStore from '../global/useUserStore';
import useAuthStore from '../global/useAuthstore';
import { useNavigation } from '@react-navigation/native';

const ChatListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const users = useUserStore((state) => state.users);
  const loading = useUserStore((state) => state.loading);
  const currentUser = useAuthStore((state) => state.user);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUsers();
    console.log("Fetched users:", users);
  }, []);

  const handleSelectUser = (selectedUser) => {
    navigation.navigate('ChatScreen', { receiver: selectedUser });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ marginBottom: 10 }}
      />
      <Text>Select a friend to chat with</Text>
      {loading ? (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      ) : (
        <FlatList
          data={users.filter((user) => user.uid !== currentUser?.uid)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectUser(item)}
              style={{ padding: 10, borderBottomWidth: 1 }}
            >
              <Text>{item.username || item.email}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <MyFAB navigation={navigation} />
    </SafeAreaView>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({});
