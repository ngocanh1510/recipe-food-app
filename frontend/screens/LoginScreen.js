//22520073-Phan Thị Ngọc Ánh
import React, { useState, useContext } from 'react';
import { View, Text, TextInput,TouchableOpacity,StyleSheet,Image } from 'react-native';
import { AuthContext } from './AuthContext.js';
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.containerheader}>
        <Image source={require('../assets/snapedit_1729764442315.png')} style={styles.imageStyle}/>
        <Text style={styles.header} >Welcome</Text>
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name='email-outline' style={styles.icon}/>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name='lock-outline' style={styles.icon} />
        <TextInput placeholder="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry />
      </View>
      <Text style={styles.forgotpassword}>Forgot password?</Text>
      <TouchableOpacity style={styles.button} onPress={() => login(email, password)}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableOpacity>
      <Text style={styles.loginWithText}>Or login with</Text>
      <View style={styles.iconContainer}>
      <MaterialCommunityIcons name='facebook' style={styles.facebook}/>
      <Image source={require('../assets/7123025_logo_google_g_icon.png')} style={styles.gmail}/>
      </View>
    <View style={styles.loginContainer}>
      <Text style={styles.question}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')} >
          <Text style={styles.signupText}> Sign up here!</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{
    flex: 1, 
    justifyContent: 'center', 
    padding: 20
  },
  containerheader:{
    alignItems:'center',
  },
  imageStyle: {
    marginTop:50,
    width: 300, 
    height: 170,
    borderRadius: 10,
  },
  header:{
    fontSize:25,
    fontWeight:'600'
  },
  button:{
    backgroundColor:'#EC9B4D',
    padding:18,
    borderRadius:10,
    marginTop:20,
    marginHorizontal:20,
  },
  forgotpassword:{
    color:'red',
    fontSize:13,
    opacity:0.3,
    fontWeight:'500',
    textAlign:'right',
    padding:5,
    marginRight:5
  },
  loginText:{
    color:'white',
    fontSize:16,
    textAlign:'center'
  },
  loginWithText:{
    textAlign:'center',
    fontWeight:'500', 
    padding:15, 
    fontSize:20
  },
  iconContainer:{
    flexDirection:'row',
    justifyContent:'center'
  },
  facebook:{
    color:'#1877F2', 
    fontSize:60, 
    padding:9
  },
  gmail:{
    height:79,
    width:79
  },
  loginContainer:{
    flexDirection:'row',
    padding:10,
    justifyContent:'center',
  },
  inputContainer:{
    flexDirection: 'row',         
    alignItems: 'center',         
    borderWidth: 1,              
    borderColor: '#ccc',          
    borderRadius: 8,               
    padding: 13,                   
    backgroundColor: '#fff', 
    marginTop:15,
    marginHorizontal:20     
  },
  icon:{
    fontSize:26,
    opacity:0.5,
    paddingHorizontal:5
  },
  question:{
    fontSize:16,
    fontWeight:'300'
  },
  signupText:{
    fontSize:16,
    color:'blue',
    fontWeight:'800'
  },
})