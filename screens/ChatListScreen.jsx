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
import { Searchbar, ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";
import MyFAB from "./components/MyComponent";
import useUserStore from "../global/useUserStore";
import useAuthStore from "../global/useAuthstore";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ChatListScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const users = useUserStore((state) => state.users);
  const loading = useUserStore((state) => state.loading);
  const currentUser = useAuthStore((state) => state.user);
  const navigation = useNavigation();
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectUser = (selectedUser) => {
    navigation.navigate("Chat", { receiver: selectedUser });
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
      />
      <Text style={[styles.subHeader, { color: theme.colors.text }]}>Select a friend to chat with</Text>
      {loading ? (
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      ) : (
        <FlatList
          data={users.filter((user) => user.uid !== currentUser?.uid)}
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
                <Text style={[styles.username, { color: theme.colors.text }]}>
                  {item.username || item.email}
                </Text>
                <Text 
                  style={[styles.latestMessage, { color: theme.dark ? '#9EA8B4' : '#4F5B67' }]} 
                  numberOfLines={1}
                >
                  {item.latestMessage || "No messages yet"}
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
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  latestMessage: {
    fontSize: 14,
  },
});