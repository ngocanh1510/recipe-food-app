
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ searchText, onChangeText }) => {
  return (
    <View style={styles.searchBar}>
      <Ionicons name="search-outline" size={24} color="#881415" />
      <TextInput
        style={styles.searchInput}
        placeholder="Bạn muốn tìm món gì?"
        value={searchText}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f8f1f1',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#881415',
  },
  searchInput: {
    marginLeft: 10,
    color: '#881415',
    fontSize: 16,
    flex: 1,
  },
});

export default SearchBar;