// 22520073-Phan Thị Ngọc Ánh
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,Image } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfpassword,setCfpassword]=useState('');

  return (
    <View style={styles.container}>
      <View style={styles.containerheader}>
        <Image source={require('../assets/snapedit_1729764442315.png')} style={styles.imageStyle}/>
        <Text style={styles.header}>Create New Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name='account-outline' style={styles.icon}/>
        <TextInput placeholder="Enter username" value={name} onChangeText={setName} />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name='email-outline' style={styles.icon}/>
        <TextInput placeholder="Enter email" value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name='lock-outline' style={styles.icon} />
        <TextInput placeholder="Enter password" value={password} onChangeText={setPassword} secureTextEntry />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name='lock-outline' style={styles.icon} />
        <TextInput placeholder="Confirm password" value={cfpassword} onChangeText={setCfpassword} secureTextEntry/>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.creatText}>CREATE</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.question}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText} > Login now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center'
  },
  containerheader:{
    alignItems:'center',
  },
  header:{
    fontSize:25,
    fontWeight:'600'
  },
  imageStyle: {
    marginTop:50,
    width: 300, 
    height: 170,
    borderRadius: 10,
  },
  inputContainer:{
    flexDirection: 'row',         
    alignItems: 'center',         
    borderWidth: 1,              
    borderColor: '#ccc',          
    borderRadius: 8,               
    padding: 13,                   
    backgroundColor: '#fff', 
    marginTop:18,
    marginHorizontal:20     
  },
  registerContainer:{
    flexDirection:'row',
    padding:10,
    justifyContent:'center',
  },
  icon:{
    fontSize:26,
    opacity:0.5,
    paddingHorizontal:5
  },
  button:{
    backgroundColor:'#EC9B4D',
    padding:18,
    borderRadius:10,
    marginTop:30,
    marginHorizontal:20,
  },
  creatText:{
    color:'white',
    fontSize:16,
    textAlign:'center'
  },
  question:{
    fontSize:16,
    fontWeight:'300'
  },
  loginText:{
    fontSize:16,
    color:'blue',
    fontWeight:'800'
  },
})
