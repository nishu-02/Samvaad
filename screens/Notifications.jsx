import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Switch, Text, List, Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { View } from "react-native";

const Notifications = () => {
  const { theme, isDarkMode } = useSelector((state) => state.theme);
  const colors = theme.colors;

  // State for toggles
  const [privateChats, setPrivateChats] = useState(false);
  const [groupChats, setGroupChats] = useState(false);
  const [doNotDisturb, setDoNotDisturb] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <View style={{ 
        flex: 1, 
        backgroundColor: colors.background,
        padding: 20
      }}>
        <Text variant="titleLarge" style={{ color: colors.text, marginBottom: 20, fontWeight: 'bold' }}>
          Message Notifications
        </Text>

        <List.Item
          title="Private Chats"
          description="Get notified when you receive private messages"
          titleStyle={{ color: colors.text }}
          descriptionStyle={{ color: isDarkMode ? '#aaaaaa' : '#666666' }}
          right={() => (
            <Switch 
              value={privateChats} 
              onValueChange={setPrivateChats}
              color={colors.button}
            />
          )}
          style={{
            backgroundColor: colors.background,
            paddingVertical: 8,
            marginVertical: 4,
            borderRadius: 8
          }}
        />
        <Divider style={{ backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }} />

        <List.Item
          title="Group Chats"
          description="Get notified when you receive group messages"
          titleStyle={{ color: colors.text }}
          descriptionStyle={{ color: isDarkMode ? '#aaaaaa' : '#666666' }}
          right={() => (
            <Switch 
              value={groupChats} 
              onValueChange={setGroupChats}
              color={colors.button}
            />
          )}
          style={{
            backgroundColor: colors.background,
            paddingVertical: 8,
            marginVertical: 4,
            borderRadius: 8
          }}
        />
        <Divider style={{ backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }} />

        <List.Item
          title="Do Not Disturb"
          description="Silence all notifications temporarily"
          titleStyle={{ color: colors.text }}
          descriptionStyle={{ color: isDarkMode ? '#aaaaaa' : '#666666' }}
          right={() => (
            <Switch 
              value={doNotDisturb} 
              onValueChange={setDoNotDisturb}
              color={colors.button}
            />
          )}
          style={{
            backgroundColor: colors.background,
            paddingVertical: 8,
            marginVertical: 4,
            borderRadius: 8
          }}
        />
        <Divider style={{ backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }} />
      </View>
    </SafeAreaView>
  );
};

export default Notifications;