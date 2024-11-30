//22520073-Phan Thị Ngọc Ánh
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FavoriteScreen() {
  return (
    <View style={styles.text}>
      <Text>Favourites Screen</Text>
    </View>
  );
}
const styles=StyleSheet.create({
  text:{
    flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
  }
})

