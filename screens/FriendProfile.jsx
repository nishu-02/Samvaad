import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  Avatar,
  Text,
  IconButton,
  useTheme,
} from "react-native-paper";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FriendProfile = ({ route, navigation }) => {
  const { receiver } = route.params;
  const { theme } = useSelector((state) => state.theme);
  const colors = theme.colors;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
        <Appbar.Content title="" />
        <Appbar.Action icon="dots-vertical" color={colors.text} />
      </Appbar.Header>

      <View style={styles.center}>
        <Avatar.Image
          size={100}
          source={{
            uri:
              receiver.avatar ||
              `https://ui-avatars.com/api/?name=${receiver.username}`,
          }}
        />
        <Text style={[styles.name, { color: colors.text }]}>
          {receiver.username}
        </Text>
        <Text style={[styles.phone, { color: colors.text }]}>
          {receiver.phoneNumber || "+1XXXXXXXXXX"}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <ActionButton icon="message-outline" label="Message" color={colors.primary} />
        <ActionButton icon="phone-outline" label="Call" color={colors.primary} />
        <ActionButton icon="bell-off-outline" label="Mute" color={colors.primary} />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.primary }]}>More actions</Text>

      <OptionItem icon="image-outline" text="View media" color={colors.text} />
      <OptionItem icon="magnify" text="Search in conversation" color={colors.text} />
      <OptionItem icon="bell-outline" text="Notifications" color={colors.text} />
    </ScrollView>
  );
};

const ActionButton = ({ icon, label, color }) => (
  <TouchableOpacity style={styles.actionButton}>
    <Icon name={icon} size={24} color={color} />
    <Text style={{ color, marginTop: 6 }}>{label}</Text>
  </TouchableOpacity>
);

const OptionItem = ({ icon, text, color }) => (
  <TouchableOpacity style={styles.optionRow}>
    <Icon name={icon} size={24} color={color} />
    <Text style={[styles.optionText, { color }]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: "center",
    marginVertical: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  phone: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: 10,
  },
  actionButton: {
    alignItems: "center",
    width: 80,
  },
  sectionTitle: {
    marginLeft: 16,
    marginTop: 30,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  optionText: {
    marginLeft: 16,
    fontSize: 16,
  },
});

export default FriendProfile;