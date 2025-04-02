import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import {
  Text,
  Avatar,
  Searchbar,
  List,
  Surface,
  ActivityIndicator,
} from "react-native-paper";
import useUserStore from "../global/useUserStore";
import { create } from "zustand";
import MyFAB from "./components/MyComponent";

import { useSelector } from "react-redux";

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

  // Add dummy users to supplement Firestore users
  const dummyUsers = [
    { id: "d1", name: "Alicia", email: "alicia@example.com" },
    { id: "d2", name: "Anthony", email: "anthony@example.com" },
    { id: "d3", name: "Ben", email: "ben@example.com" },
    { id: "d4", name: "Bryan", email: "bryan@example.com" },
    { id: "d5", name: "Brianna", email: "brianna@example.com" },
    { id: "d6", name: "Cindy", email: "cindy@example.com" },
    { id: "d7", name: "Daisy", email: "daisy@example.com" },
    { id: "d8", name: "Diana", email: "diana@example.com" },
  ];

  const allUsers = [...users, ...dummyUsers];

  // Filter users based on search query
  const filteredUsers = searchQuery
    ? allUsers.filter(
        (user) =>
          user.name &&
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allUsers;

  // Group contacts by first letter of name
  const groupedContacts = filteredUsers.reduce((groups, contact) => {
    if (!contact.name) return groups;

    const letter = contact.name.charAt(0).toUpperCase();
    if (!groups[letter]) {
      groups[letter] = [];
    }
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

  const renderContactItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    
    return (
      <List.Item
        title={<Text style={{ color: theme.colors.text }}>{item.name}</Text>}
        description={<Text style={{ color: isDarkMode ? '#aaaaaa' : '#666666' }}>{item.email}</Text>}
        onPress={() => toggleFavorite(item)}
        left={(props) => (
          <Avatar.Image
            {...props}
            size={40}
            source={{
              uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                item.name
              )}&background=random`,
            }}
          />
        )}
        style={[
          styles.contactItem,
          { backgroundColor: theme.colors.background },
          isFavorite && { backgroundColor: isDarkMode ? theme.colors.sender : theme.colors.receiver }
        ]}
      />
    );
  };

  const renderSection = ({ item }) => (
    <View>
      <View style={{ backgroundColor: theme.colors.background }}>
        <Text
          style={[
            styles.sectionLetter,
            { 
              backgroundColor: theme.colors.background,
              color: theme.colors.primary 
            }
          ]}
        >
          {item.letter}
        </Text>
      </View>

      {item.data.map((contact) => (
        <View key={contact.id}>{renderContactItem({ item: contact })}</View>
      ))}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
    >
      <Surface
        style={[styles.surface, { backgroundColor: theme.colors.background }]}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={[
            styles.searchBar, 
            { backgroundColor: isDarkMode ? '#2d2d2d' : '#F3F4F6' }
          ]}
          iconColor={isDarkMode ? '#bbbbbb' : '#757575'}
          inputStyle={{ color: theme.colors.text }}
          placeholderTextColor={isDarkMode ? '#888888' : '#757575'}
        />

        {loading ? (
          <ActivityIndicator
            animating={true}
            color={theme.colors.primary}
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={sections}
            keyExtractor={(item) => item.letter}
            renderItem={renderSection}
            style={styles.list}
          />
        )}
        <View style={{ position: "absolute", right: 16, top: 80 }}>
          <MyFAB navigation={navigation} />
        </View>
      </Surface>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surface: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBar: {
    elevation: 0,
    borderRadius: 12,
    marginBottom: 16,
    height: 48,
  },
  sectionLetter: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    padding: 10,
  },
  contactItem: {
    paddingVertical: 8,
  },
  loader: {
    marginTop: 24,
  },
  list: {
    marginBottom: 50,
  },
});

export default ContactList;