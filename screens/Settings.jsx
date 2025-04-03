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

  const { theme, isDarkMode } = useSelector((state) => state.theme);
  const colors = theme.colors;

  const user = useAuthStore((state) => state.user);

  const menuItems = [
    { icon: "lock", title: "Privacy" },
    { icon: "cloud", title: "Storage & Data" },
    { icon: "help-circle", title: "About" },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, { color: colors.text }]}>Settings</Text>
          <View style={styles.actionButtons}>
            <Appbar.Action 
              icon="magnify" 
              onPress={() => {}} 
              color={colors.text} 
              onPress={() => navigation.navigate('Search')}
            />
            <Appbar.Action 
              icon="dots-vertical" 
              onPress={() => {}} 
              color={colors.text} 
            />
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
            <Text style={[styles.email, { color: isDarkMode ? '#aaaaaa' : '#666666' }]}>
              {user.email}
            </Text>
          </View>
        </View>

        <Divider style={[styles.divider, { backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }]} />

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
          <Switch
            value={isDarkMode}
            onValueChange={() => dispatch(toggleTheme())}
            color={colors.button}
            style={styles.switch}
          />
        </TouchableOpacity>

        <Divider style={[styles.divider, { backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }]} />

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('noti')}
        >
          <Icon
            name="bell"
            size={24}
            color={colors.text}
            style={styles.menuIcon}
          />
          <Text style={[styles.menuItemText, { color: colors.text }]}>
            Notifications
          </Text>
          <Icon
            name="chevron-right"
            size={20}
            color={isDarkMode ? '#aaaaaa' : '#666666'}
          />
        </TouchableOpacity>

        <Divider style={[styles.divider, { backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }]} />

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity style={styles.menuItem}>
              <Icon
                name={item.icon}
                size={24}
                color={colors.text}
                style={styles.menuIcon}
              />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                {item.title}
              </Text>
              <Icon
                name="chevron-right"
                size={20}
                color={isDarkMode ? '#aaaaaa' : '#666666'}
              />
            </TouchableOpacity>
            {index < menuItems.length - 1 && (
              <Divider style={[styles.divider, { backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }]} />
            )}
          </React.Fragment>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: "row",
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
  },
  divider: {
    marginVertical: 10,
    height: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    flex: 1,
  },
  switch: {
    transform: [{ scale: 1.1 }],
  },
});

export default Settings;