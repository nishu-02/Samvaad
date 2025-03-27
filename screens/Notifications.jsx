import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toggle, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";

const Notifications = () => {
  const { colors } = useSelector((state) => state.theme.theme);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Text category="h5" style={{ color: colors.text }}>Message Notifications</Text>

      <Toggle style={{ marginVertical: 10 }}>
        {(evaProps) => <Text {...evaProps} style={{ color: colors.text }}>Private Chats</Text>}
      </Toggle>

      <Toggle style={{ marginVertical: 10 }}>
        {(evaProps) => <Text {...evaProps} style={{ color: colors.text }}>Group Chats</Text>}
      </Toggle>

      <Toggle style={{ marginVertical: 10 }}>
        {(evaProps) => <Text {...evaProps} style={{ color: colors.text }}>Do Not Disturb</Text>}
      </Toggle>
    </SafeAreaView>
  );
};

export default Notifications;
