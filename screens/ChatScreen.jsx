import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Appbar,
  Avatar,
  Text,
  TextInput,
  Surface,
  IconButton,
} from "react-native-paper";
import useChatStore from "../global/useChatStore";
import useAuthStore from "../global/useAuthstore";

import { useSelector } from "react-redux";

const ChatScreen = ({ route, navigation }) => {
  const [message, setMessage] = useState("");
  const sendMessage = useChatStore((state) => state.sendMessage);
  const listenMessages = useChatStore((state) => state.listenMessages);
  const messages = useChatStore((state) => state.messages);
  const user = useAuthStore((state) => state.user);
  const receiver = route.params.receiver;
  const flatListRef = useRef(null);

  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    listenMessages();
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message, user.email, receiver.email);
      setMessage("");
    }
  };

  // Filter messages between current user and receiver
  const filteredMessages = messages.filter(
    (msg) =>
      (msg.sender === user.email && msg.receiver === receiver.email) ||
      (msg.sender === receiver.email && msg.receiver === user.email)
  );

  // Function to format the timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderItem = ({ item, index }) => {
    const isUser = item.sender === user.email;
    // Check if this is the first message of the day or if the day has changed
    const showDate =
      index === 0 ||
      (index > 0 &&
        new Date(item.timestamp).toDateString() !==
          new Date(filteredMessages[index - 1].timestamp).toDateString());

    return (
      <>
        {showDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {item.timestamp
                ? new Date(item.timestamp).toLocaleDateString()
                : "Today"}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.messageRow,
            isUser ? styles.userMessageRow : styles.receiverMessageRow,
          ]}
        >
          {!isUser && (
            <Avatar.Image
              size={30}
              source={{
                uri:
                  receiver.avatar ||
                  "https://ui-avatars.com/api/?name=" + receiver.username,
              }}
              style={styles.avatar}
            />
          )}
          <Surface
            style={[
              styles.messageBubble,
              isUser
                ? [styles.userBubble, { backgroundColor: theme.colors.sender }]
                : [
                    styles.receiverBubble,
                    { backgroundColor: theme.colors.receiver },
                  ],
              item.image && styles.imageBubble,
            ]}
          >
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.messageImage}
                resizeMode="cover"
              />
            )}
            {item.text && (
              <Text
                style={[
                  styles.messageText,
                  isUser
                    ? { color: theme.colors.text }
                    : { color: theme.colors.text }
                ]}
              >
                {item.text}
              </Text>
            )}
            <Text
              style={[
                styles.timeText,
                isUser ? styles.userTimeText : styles.receiverTimeText,
              ]}
            >
              {formatTime(item.timestamp)}
            </Text>
          </Surface>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Avatar.Image
            size={40}
            source={{
              uri:
                receiver.avatar ||
                "https://ui-avatars.com/api/?name=" + receiver.username,
            }}
          />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            {receiver.username || receiver.email}
          </Text>
          <Appbar.Action icon="phone" onPress={() => {}} />
          <Appbar.Action icon="magnify" onPress={() => {}} />
          <Appbar.Action
            icon="account-circle"
            onPress={() =>
              navigation.navigate("FriendProfile", { receiver: receiver })
            }
          />
        </Appbar.Header>

        <FlatList
          ref={flatListRef}
          data={filteredMessages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.messageList,
            { backgroundColor: theme.colors.background },
          ]}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <IconButton
            icon="image"
            size={24}
            onPress={() => {}}
            style={styles.attachButton}
          />
          <IconButton
            icon="camera"
            size={24}
            onPress={() => {}}
            style={styles.attachButton}
          />
          <TextInput
            mode="outlined"
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
            style={styles.input}
            outlineStyle={styles.inputOutline}
            right={
              <TextInput.Icon
                icon="send"
                onPress={handleSend}
                color={theme.colors.primary}
              />
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  messageList: {
    padding: 10,
  },
  dateContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  dateText: {
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 12,
    color: "#555",
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-end",
  },
  userMessageRow: {
    justifyContent: "flex-end",
  },
  receiverMessageRow: {
    justifyContent: "flex-start",
  },
  avatar: {
    marginRight: 10,
    marginBottom: 5,
  },
  messageBubble: {
    maxWidth: "75%",
    borderRadius: 18,
    padding: 10,
    elevation: 1,
    height: "auto",
  },
  userBubble: {
    marginLeft: 10,
    borderTopRightRadius: 4,
  },
  receiverBubble: {
    marginRight: 10,
    borderTopLeftRadius: 4,
  },
  imageBubble: {
    padding: 4,
    overflow: "hidden",
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    backgroundColor: "#e1e1e1",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timeText: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  userTimeText: {
    color: "rgba(255,255,255,0.7)",
  },
  receiverTimeText: {
    color: "rgba(0,0,0,0.5)",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  attachButton: {
    margin: 0,
  },
  input: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputOutline: {
    borderRadius: 20,
  },
});

export default ChatScreen;