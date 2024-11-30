//22520073-Phan Thị Ngọc Ánh
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from './AuthContext.js';

export default function ProfilrScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <TouchableOpacity onPress={logout} style={styles.button}>
        <Text style={styles.text}>LOG OUT</Text>
      </TouchableOpacity> 
    </View>
  );
}

const styles=StyleSheet.create({
  button:{
    backgroundColor:'#1E90FF',
    padding:13,
    marginTop:10
  },
  container:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text:{
    color:'white',
    fontSize:16,
    textAlign:'center'
  }
})