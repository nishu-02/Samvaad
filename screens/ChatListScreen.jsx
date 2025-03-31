import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
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
  }, []);

  const handleSelectUser = (selectedUser) => {
    navigation.navigate('Chat', { receiver: selectedUser });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text> Samvaad </Text>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <Text style={styles.header}>Select a friend to chat with</Text>
      
      {loading ? (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      ) : (
        <FlatList
          data={users.filter((user) => user.uid !== currentUser?.uid)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectUser(item)} style={styles.userContainer}>
              <Image 
                source={{ uri: item.profilePic || 'https://via.placeholder.com/50' }} 
                style={styles.avatar} 
              />
              <View style={styles.userInfo}>
                <Text style={styles.username}>{item.username || item.email}</Text>
                <Text style={styles.latestMessage} numberOfLines={1}>
                  {item.latestMessage || 'No messages yet'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <MyFAB navigation={navigation} />
    </SafeAreaView>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  searchBar: { marginBottom: 10 },
  header: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: { flex: 1 },
  username: { fontSize: 16, fontWeight: 'bold' },
  latestMessage: { fontSize: 14, color: 'gray' },
});
