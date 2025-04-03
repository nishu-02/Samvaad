import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import MyFAB from "./components/MyComponent";
import useUserStore from "../global/useUserStore";
import useAuthStore from "../global/useAuthstore";
import useChatStore from "../global/useChatStore";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ChatListScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const users = useUserStore((state) => state.users);
  const loading = useUserStore((state) => state.loading);
  const currentUser = useAuthStore((state) => state.user);
  const listenMessages = useChatStore((state) => state.listenMessages);
  const navigation = useNavigation();
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    fetchUsers();
    // Set up message listener
    const unsubscribe = listenMessages();
    
    // cleanup fucntion when we exit the chat or app
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleSelectUser = (selectedUser) => {
    navigation.navigate("Chat", { receiver: selectedUser });
  };

  // Formatting
  const formatLastMessageTime = (timestamp) => {
    if (!timestamp) return "";
    
    const messageDate = new Date(timestamp);
    const now = new Date();
    
    // If message is from today
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // If message is from this week
    else if (now - messageDate < 7 * 24 * 60 * 60 * 1000) {
      const options = { weekday: 'short' };
      return messageDate.toLocaleDateString([], options);
    }
    // If message is older
    else {
      const options = { month: 'short', day: 'numeric' };
      return messageDate.toLocaleDateString([], options);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}> Samvaad </Text>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor={theme.colors.primary}
        inputStyle={{ color: theme.colors.text }}
        onPress={() => navigation.navigate('Search')}
      />
      <Text style={[styles.subHeader, { color: theme.colors.text }]}>Select a friend to chat with</Text>
      {loading ? (
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      ) : (
        <FlatList
          data={users
            .filter((user) => user.uid !== currentUser?.uid)
            .sort((a, b) => ((b.lastMessageTime || 0) - (a.lastMessageTime || 0)))
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectUser(item)}
              style={[styles.userContainer, { borderBottomColor: theme.dark ? '#2D3B45' : '#E7EBEF' }]}
            >
              <Image
                source={{
                  uri: item.profilePic || "https://via.placeholder.com/50",
                }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <View style={styles.userInfoHeader}>
                  <Text style={[styles.username, { color: theme.colors.text }]}>
                    {item.username || item.email}
                  </Text>
                  {item.lastMessageTime && (
                    <Text style={styles.timeText}>
                      {formatLastMessageTime(item.lastMessageTime)}
                    </Text>
                  )}
                </View>
                <Text 
                  style={[styles.latestMessage, { color: theme.dark ? '#9EA8B4' : '#4F5B67' }]} 
                  numberOfLines={1}
                >
                  {item.isSender ? "You: " : ""}{item.latestMessage || "No messages yet"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={{ position: "absolute", right: 16, top: 80 }}>
        <MyFAB navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    marginBottom: 10,
    elevation: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    fontWeight: "700",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  latestMessage: {
    fontSize: 14,
    marginTop: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#888',
  },
});