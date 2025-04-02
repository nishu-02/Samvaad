import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../global/themeSlice";
import { Switch, Text, Divider, Appbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import useAuthStore from "../global/useAuthstore";

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeState = useSelector((state) => state.theme);
  const { colors, dark } = themeState.theme;

  const user = useAuthStore((state) => state.user);

  const menuItems = [
    { icon: "lock", title: "Privacy" },
    { icon: "cloud", title: "Storage & Data" },
    { icon: "help-circle", title: "About" },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{fontSize:34, marginBottom:36, fontWeight:'bold'}}>Settings</Text>
        <View style={{ flexDirection: "row" }}>
          <Appbar.Action icon="magnify" onPress={() => {}} />
          <Appbar.Action icon="dots-vertical" onPress={() => {}} />
        </View>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user.profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.username, { color: colors.text }]}>
            {user.username}
          </Text>
          <Text style={[styles.email, { color: colors.text }]}>
            {user.email}
          </Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      <TouchableOpacity style={styles.menuItem}>
        <Icon
          name="moon"
          size={24}
          color={colors.text}
          style={styles.menuIcon}
        />
        <Text style={[styles.menuItemText, { color: colors.text }]}>
          Dark Mode
        </Text>
        <Icon
        name ="bell"
        size={24}
        color={colors.text}
        style={styles.menuIcon}
        onPress={() => navigation.navigate('noti')}
        />
        <Text style={[styles.menuItemText, { color: colors.text }]}>
          Notifications
        </Text>

        <Switch
          value={dark}
          onValueChange={() => dispatch(toggleTheme())}
          color={colors.primary}
          style={styles.switch}
        />
      </TouchableOpacity>

      <Divider style={styles.divider} />

      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem}>
          <Icon
            name={item.icon}
            size={24}
            color={colors.text}
            style={styles.menuIcon}
          />
          <Text style={[styles.menuItemText, { color: colors.text }]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
  divider: {
    marginVertical: 10,
    height: 1,
    backgroundColor: "#ccc",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Pushes switch to the end
    paddingVertical: 10,
  },
  menuIcon: {
    marginRight: 15, // Space between icon and text
  },
  menuItemText: {
    fontSize: 16,
    flex: 1, // Pushes text to the center
  },
  switch: {
    transform: [{ scale: 1.1 }], // Slightly increase switch size for better visibility
  },
});
