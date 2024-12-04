
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Tìm kiếm</Text>
      <TouchableOpacity>
        <Ionicons name="camera-outline" size={28} color="#881415" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#881415',
    fontWeight: 'bold',
  },
});

export default SearchHeader;