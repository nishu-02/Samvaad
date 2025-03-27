import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Switch, Text, List, Divider } from "react-native-paper";
import { useSelector } from "react-redux";

const Notifications = () => {
  const { colors } = useSelector((state) => state.theme.theme);

  // State for toggles
  const [privateChats, setPrivateChats] = useState(false);
  const [groupChats, setGroupChats] = useState(false);
  const [doNotDisturb, setDoNotDisturb] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Text variant="titleLarge" style={{ color: colors.text, marginBottom: 10 }}>
        Message Notifications
      </Text>

      <List.Item
        title="Private Chats"
        titleStyle={{ color: colors.text }}
        right={() => <Switch value={privateChats} onValueChange={setPrivateChats} />}
      />
      <Divider />

      <List.Item
        title="Group Chats"
        titleStyle={{ color: colors.text }}
        right={() => <Switch value={groupChats} onValueChange={setGroupChats} />}
      />
      <Divider />

      <List.Item
        title="Do Not Disturb"
        titleStyle={{ color: colors.text }}
        right={() => <Switch value={doNotDisturb} onValueChange={setDoNotDisturb} />}
      />
      <Divider />
    </SafeAreaView>
  );
};

export default Notifications;
