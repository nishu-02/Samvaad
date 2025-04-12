import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Avatar,
  Searchbar,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
import useUserStore from "../global/useUserStore";
import { create } from "zustand";
import MyFAB from "./components/MyComponent";
import { useSelector } from "react-redux";

// Zustand store for favorites
const useFavoritesStore = create((set) => ({
  favorites: [],
  toggleFavorite: (user) =>
    set((state) => {
      const isFavorite = state.favorites.some((fav) => fav.id === user.id);
      return {
        favorites: isFavorite
          ? state.favorites.filter((fav) => fav.id !== user.id)
          : [...state.favorites, user],
      };
    }),
}));

const ContactList = ({ navigation }) => {
  const { users, loading, fetchUsers } = useUserStore();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const [searchQuery, setSearchQuery] = useState("");

  const { theme, isDarkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    fetchUsers();
  }, []);

  const dummyUsers = [
    { id: "d1", name: "Alicia", email: "alicia@example.com" },
    { id: "d2", name: "Anthony", email: "anthony@example.com" },
    { id: "d3", name: "Ben", email: "ben@example.com" },
    { id: "d4", name: "Bryan", email: "bryan@example.com" },
    { id: "d5", name: "Brianna", email: "brianna@example.com" },
    { id: "d6", name: "Cindy", email: "cindy@example.com" },
    { id: "d7", name: "Daisy", email: "daisy@example.com" },
    { id: "d8", name: "Diana", email: "diana@example.com" },
    { id: "d9", name: "Test User", email: "test@example.com" },
  ];

  const allUsers = [...users, ...dummyUsers];

  const filteredUsers = searchQuery
    ? allUsers.filter(
        (user) =>
          user.name &&
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allUsers;

  const groupedContacts = filteredUsers.reduce((groups, contact) => {
    if (!contact.name) return groups;
    const letter = contact.name.charAt(0).toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(contact);
    return groups;
  }, {});

  const sections = Object.keys(groupedContacts)
    .sort()
    .map((letter) => ({
      letter,
      data: groupedContacts[letter].sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    }));

  const onChangeSearch = (query) => setSearchQuery(query);

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ContactDetails", { contact: item })}
      style={styles.contactItem}
    >
      <Avatar.Image
        size={40}
        source={{
          uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            item.name
          )}&background=random`,
        }}
        style={styles.avatar}
      />
      <Text style={[styles.contactName, { color: theme.colors.text }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionLetter, { color: theme.colors.primary }]}>
        {item.letter}
      </Text>
      {item.data.map((contact) => (
        <View key={contact.id}>{renderContactItem({ item: contact })}</View>
      ))}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Contacts
        </Text>
        <IconButton
          icon="dots-vertical"
          size={24}
          iconColor={theme.colors.text}
          onPress={() => {}}
        />
      </View>

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

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            animating={true}
            color={theme.colors.primary}
            size="large"
            style={styles.loader}
          />
        </View>
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(item) => item.letter}
          renderItem={renderSection}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      <MyFAB navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchBar: {
    marginHorizontal: 16,
    marginVertical: 12,
    elevation: 0,
    borderRadius: 20,
    height: 40,
  },
  sectionContainer: {
    marginBottom: 8,
  },
  sectionLetter: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  avatar: {
    marginRight: 12,
  },
  contactName: {
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    marginTop: 24,
  },
  listContent: {
    paddingBottom: 80,
  },
});

export default ContactList;
