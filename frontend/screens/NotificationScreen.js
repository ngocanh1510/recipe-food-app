//22520073_Phan Thị Ngọc Ánh
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function NotificationsScreen({navigation}) {
  return (
    <View style={styles.text}>
      <Text>NotificationsScreen</Text>
    </View>
  );
}
const styles=StyleSheet.create({
  text:{
    flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
  },
  button:{
    backgroundColor:'#1E90FF',
    padding:13,
    marginTop:10,
    borderRadius:5
  },
  buttonText:{
    color:'white',
  }
})

