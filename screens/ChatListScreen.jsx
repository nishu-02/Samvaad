import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Searchbar,
  ActivityIndicator,
  Badge,
  FAB,
  TouchableRipple,
  Surface,
  Avatar,
} from "react-native-paper";
import useUserStore from "../global/useUserStore";
import useAuthStore from "../global/useAuthstore";
import useChatStore from "../global/useChatStore";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import MyFAB from "./components/MyComponent";

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

    // cleanup function when we exit the chat or app
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleSelectUser = (selectedUser) => {
    navigation.navigate("Chat", { receiver: selectedUser });
  };

  // Get initials from username or email
  const getInitials = (name) => {
    if (!name) return "?";

    if (name.includes("@")) {
      // If it's an email, get first letter
      return name.charAt(0).toUpperCase();
    }

    // Get initials from name parts
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Formatting
  const formatLastMessageTime = (timestamp) => {
    if (!timestamp) return "";

    const messageDate = new Date(timestamp);
    const now = new Date();

    // If message is from today
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    // If message is from this week
    else if (now - messageDate < 7 * 24 * 60 * 60 * 1000) {
      const options = { weekday: "short" };
      return messageDate.toLocaleDateString([], options);
    }
    // If message is older
    else {
      const options = { month: "short", day: "numeric" };
      return messageDate.toLocaleDateString([], options);
    }
  };

  const renderMessageCounter = (count) => {
    if (!count || count <= 0) return null;

    return (
      <Badge size={20} style={styles.messageBadge}>
        {count > 9 ? "9+" : count}
      </Badge>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? "light-content" : "dark-content"}
      />

      <Text style={[styles.appTitle, { color: theme.colors.text }]}>
        Samvaad
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Searchbar
          placeholder="Search"
          value=""
          style={[
            styles.searchBar,
            {
              backgroundColor: theme.dark ? "#333333" : "#EFEFF4",
              height: 45,
            },
          ]}
          inputStyle={{
            color: theme.colors.text,
            alignSelf: "center",
            padding: 0,
            margin: 0,
            height: 40,
          }}
          iconColor={theme.dark ? "#999999" : "#8E8E93"}
          placeholderTextColor={theme.dark ? "#999999" : "#8E8E93"}
          editable={false}
        />
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={users
            .filter((user) => user.uid !== currentUser?.uid)
            .sort(
              (a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0)
            )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableRipple
              onPress={() => handleSelectUser(item)}
              rippleColor={
                theme.dark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)"
              }
            >
              <Surface
                style={[
                  styles.userContainer,
                  {
                    backgroundColor: "transparent",
                    borderBottomColor: theme.dark ? "#2D3B45" : "#E7EBEF",
                    borderBottomWidth: 1,
                  },
                ]}
                elevation={0}
              >
                {item.profilePic ? (
                  <Avatar.Image
                    source={{ uri: item.profilePic }}
                    size={50}
                    style={styles.avatar}
                  />
                ) : (
                  <Avatar.Text
                    size={50}
                    label={getInitials(item.username || item.email)}
                    style={styles.avatar}
                    labelStyle={styles.avatarLabel}
                    color="#FFFFFF"
                    backgroundColor={theme.colors.primary}
                  />
                )}
                <View style={styles.userInfo}>
                  <View style={styles.userInfoHeader}>
                    <Text
                      style={[styles.username, { color: theme.colors.text }]}
                    >
                      {item.username || item.email}
                    </Text>
                    {item.lastMessageTime && (
                      <Text
                        style={[
                          styles.timeText,
                          { color: theme.dark ? "#9EA8B4" : "#8E8E93" },
                        ]}
                      >
                        {formatLastMessageTime(item.lastMessageTime)}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.latestMessage,
                      { color: theme.dark ? "#9EA8B4" : "#8E8E93" },
                    ]}
                    numberOfLines={1}
                  >
                    {item.isSender ? "You: " : ""}
                    {item.latestMessage || "No messages yet"}
                  </Text>
                </View>
                {renderMessageCounter(item.unreadCount)}
              </Surface>
            </TouchableRipple>
          )}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <MyFAB navigation={navigation} />
    </SafeAreaView>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    height: 46,
  },
  listContentContainer: {
    paddingBottom: 80,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    marginRight: 14,
  },
  avatarLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  userInfo: {
    flex: 1,
  },
  userInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
  },
  latestMessage: {
    fontSize: 14,
  },
  timeText: {
    fontSize: 13,
  },
  messageBadge: {
    backgroundColor: "#007AFF",
    marginLeft: 8,
  },
});
