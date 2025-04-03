import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Searchbar, Text, Avatar, Chip, ActivityIndicator, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    'John Doe', 'Chat app', 'React Native', 'UI design'
  ]);

  const { theme, isDarkMode } = useSelector((state) => state.theme);
  const colors = theme.colors;

  const dummyContacts = [
    { id: '1', name: 'Alex Johnson', status: 'online', image: 'https://ui-avatars.com/api/?name=AJ&background=random' },
    { id: '2', name: 'Jamie Smith', status: 'offline', image: 'https://ui-avatars.com/api/?name=JS&background=random' },
    { id: '3', name: 'Morgan Taylor', status: 'online', image: 'https://ui-avatars.com/api/?name=MT&background=random' },
    { id: '4', name: 'Casey Wilson', status: 'away', image: 'https://ui-avatars.com/api/?name=CW&background=random' },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = dummyContacts.filter(
        contact => contact.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
      
      // Add to recent searches if not already there
      if (query.trim() !== '' && !recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
      }
    }, 500);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.resultItem, 
        { backgroundColor: colors.background }
      ]}
    >
      <Avatar.Image source={{ uri: item.image }} size={50} />
      <View style={styles.resultInfo}>
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: '500' }}>
          {item.name}
        </Text>
        <Text style={{ color: isDarkMode ? '#aaaaaa' : '#666666' }}>
          {item.status === 'online' ? 'Active now' : 
           item.status === 'away' ? 'Away' : 'Last seen 2h ago'}
        </Text>
      </View>
      <Icon 
        name="message-circle" 
        size={24} 
        color={colors.button} 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Search</Text>
        </View>
        
        <Searchbar
          placeholder="Search people, chats, messages..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={[
            styles.searchbar,
            { backgroundColor: isDarkMode ? '#222222' : '#F0F0F0' }
          ]}
          iconColor={colors.button}
          inputStyle={{ color: colors.text }}
          placeholderTextColor={isDarkMode ? '#888888' : '#757575'}
          clearButtonMode="while-editing"
        />
        
        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.button} />
          </View>
        ) : searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
              <Divider style={{ backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }} />
            )}
            contentContainerStyle={styles.resultsList}
          />
        ) : (
          <View style={styles.recentContainer}>
            <View style={styles.recentHeader}>
              <Text style={[styles.recentTitle, { color: colors.text }]}>
                Recent Searches
              </Text>
              {recentSearches.length > 0 && (
                <TouchableOpacity onPress={clearRecentSearches}>
                  <Text style={{ color: colors.button }}>Clear all</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.chipContainer}>
              {recentSearches.length > 0 ? (
                recentSearches.map((search, index) => (
                  <Chip
                    key={index}
                    mode="outlined"
                    onPress={() => handleSearch(search)}
                    style={[
                      styles.chip,
                      { 
                        backgroundColor: isDarkMode ? '#222222' : '#F0F0F0',
                        borderColor: isDarkMode ? '#444444' : '#E0E0E0'
                      }
                    ]}
                    textStyle={{ color: colors.text }}
                  >
                    {search}
                  </Chip>
                ))
              ) : (
                <Text style={{ color: isDarkMode ? '#888888' : '#757575' }}>
                  No recent searches
                </Text>
              )}
            </View>
            
            <View style={styles.suggestionsContainer}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Suggested
              </Text>
              <FlatList
                data={dummyContacts.slice(0, 2)}
                renderItem={renderSearchResult}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => (
                  <Divider style={{ backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }} />
                )}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchbar: {
    elevation: 0,
    borderRadius: 12,
    marginBottom: 16,
    height: 48,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsList: {
    paddingTop: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  resultInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recentContainer: {
    flex: 1,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  chip: {
    margin: 4,
  },
  suggestionsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  }
});