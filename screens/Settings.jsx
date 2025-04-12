import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../global/themeSlice";
import { Text, Divider, Appbar, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import useUserStore from "../global/useUserStore";
import useAuthStore from "../global/useAuthstore";

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();

  const { theme, isDarkMode } = useSelector((state) => state.theme);
  const colors = theme.colors;
  
  // Get current user email from auth store
  const currentUserEmail = useAuthStore(state => state.user?.email);
  
  // Get users from user store
  const { users, loading, fetchUsers } = useUserStore();
  
  // Find the current user from the users array
  const currentUser = users.find(user => user.email === currentUserEmail) || {};

  useEffect(() => {
    // Fetch users when component mounts if they're not already loaded
    if (users.length === 0) {
      fetchUsers();
    }
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, { color: colors.text }]}>Settings</Text>
          <View style={styles.actionButtons}>
            <Appbar.Action 
              icon="magnify" 
              onPress={() => navigation.navigate('Search')}
              color={colors.text} 
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
            source={{ uri: currentUser.profileImage || 'https://via.placeholder.com/50' }}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={[styles.username, { color: colors.text }]}>
              {currentUser.username || 'Daniel'}
            </Text>
            <Text style={[styles.phoneNumber, { color: isDarkMode ? '#aaaaaa' : '#666666' }]}>
              {currentUser.phone || '+14844578842'}
            </Text>
          </View>
          <Button 
            mode="outlined" 
            style={styles.editButton}
            labelStyle={[styles.editButtonText, { color: colors.text }]}
            onPress={() => {}}
          >
            Edit
          </Button>
        </View>

        <Text style={[styles.categoryHeader, { color: isDarkMode ? '#aaaaaa' : '#666666' }]}>
          General
        </Text>

        <ScrollView style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('noti')}
          >
            <Icon
              name="bell"
              size={22}
              color={colors.text}
              style={styles.menuIcon}
            />
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              Notifications
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => dispatch(toggleTheme())}
          >
            <Icon
              name="moon"
              size={22}
              color={colors.text}
              style={styles.menuIcon}
            />
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              Appearance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
          >
            <Icon
              name="lock"
              size={22}
              color={colors.text}
              style={styles.menuIcon}
            />
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              Privacy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
          >
            <Icon
              name="cloud"
              size={22}
              color={colors.text}
              style={styles.menuIcon}
            />
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              Storage & Data
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
          >
            <Icon
              name="help-circle"
              size={22}
              color={colors.text}
              style={styles.menuIcon}
            />
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              About
            </Text>
          </TouchableOpacity>
        </ScrollView>
        
        {loading && (
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Loading user data...
          </Text>
        )}
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
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: "row",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
  },
  phoneNumber: {
    fontSize: 14,
    marginTop: 2,
  },
  editButton: {
    borderRadius: 20,
    borderColor: '#3E4958',
    height: 36,
  },
  editButtonText: {
    fontSize: 14,
    marginVertical: 0,
    marginHorizontal: 10,
  },
  categoryHeader: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 16,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  menuIcon: {
    marginRight: 15,
    width: 24,
    textAlign: 'center',
  },
  menuItemText: {
    fontSize: 16,
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  }
});

export default Settings;