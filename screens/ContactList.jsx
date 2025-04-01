import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { 
  Text, 
  Avatar, 
  Searchbar, 
  List, 
  Surface, 
  ActivityIndicator,
  useTheme 
} from "react-native-paper";
import useUserStore from "../global/useUserStore";
import { create } from "zustand";
import MyFAB from "./components/MyComponent";

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

const ContactList = () => {
  const { users, loading, fetchUsers } = useUserStore();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

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
    ? allUsers.filter(user => 
        user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allUsers;

  // Group contacts by first letter of name
  const groupedContacts = filteredUsers.reduce((groups, contact) => {
    // Ensure contact has a name property
    if (!contact.name) return groups;
    
    const letter = contact.name.charAt(0).toUpperCase();
    if (!groups[letter]) {
      groups[letter] = [];
    }
    groups[letter].push(contact);
    return groups;
  }, {});

  // Convert to array and sort alphabetically
  const sections = Object.keys(groupedContacts)
    .sort()
    .map(letter => ({
      letter,
      data: groupedContacts[letter].sort((a, b) => a.name.localeCompare(b.name))
    }));

  const onChangeSearch = query => setSearchQuery(query);

  const renderContactItem = ({ item }) => (
    <List.Item
      title={item.name}
      description={item.email}
      onPress={() => toggleFavorite(item)}
      left={props => (
        <Avatar.Image
          {...props}
          size={40}
          source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random` }}
        />
      )}
      style={[
        styles.contactItem,
        favorites.some(fav => fav.id === item.id) && styles.favoriteItem
      ]}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.surface}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#757575"
        />

        {loading ? (
          <ActivityIndicator animating={true} color={theme.colors.primary} style={styles.loader} />
        ) : (
          <FlatList
            data={sections}
            keyExtractor={item => item.letter}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.sectionLetter}>{item.letter}</Text>
                {item.data.map(contact => (
                  <View key={contact.id}>
                    {renderContactItem({ item: contact })}
                  </View>
                ))}
              </View>
            )}
            style={styles.list}
          />
        )}
        <MyFAB />
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
    backgroundColor: "#FFFFFF"
  },
 
  searchBar: {
    backgroundColor: "#F3F4F6",
    elevation: 0,
    borderRadius: 12,
    marginBottom: 16,
    height: 48
  },
  sectionLetter: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2196F3",
    marginVertical: 8
  },
  contactItem: {
    paddingVertical: 8,
    backgroundColor: "#FFFFFF"
  },
  favoriteItem: {
    backgroundColor: "#FFF8E1"
  },
  loader: {
    marginTop: 24
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    padding: 8
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center"
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: "#2196F3"
  },
  tabTitle: {
    fontSize: 12,
    textAlign: "center"
  },
  activeTabTitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#2196F3",
    fontWeight: "bold"
  }
});

export default ContactList;