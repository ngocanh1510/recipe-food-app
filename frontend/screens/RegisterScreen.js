// 22520073-Phan Thị Ngọc Ánh
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { post } from '../src/api/api.js';
import { Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfpassword, setCfpassword] = useState('');

  // Hàm đăng ký
  const handleRegister = async () => {
  
    if (!name || !email || !password || !cfpassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (password !== cfpassword) {
      Alert.alert('Lỗi', 'Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    try {
      // Gửi yêu cầu đăng ký tới API
      const response = await post('/auth/register', { name, email, password });

      if (response.status === 201) {
        Alert.alert('Thành công', 'Đăng ký thành công!');
        navigation.navigate('Login'); // Điều hướng về màn hình Đăng nhập
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Đã xảy ra lỗi, vui lòng thử lại!';
      Alert.alert('Lỗi', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerheader}>
        <Image source={require('../assets/snapedit_1729764442315.png')} style={styles.imageStyle} />
        <Text style={styles.header}>Tạo tài khoản</Text>
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name='account-outline' style={styles.icon} />
        <TextInput placeholder="Nhập họ và tên" value={name} onChangeText={setName} />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name='email-outline' style={styles.icon} />
        <TextInput placeholder="Nhập email" value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name='lock-outline' style={styles.icon} />
        <TextInput placeholder="Nhập mật khẩu" value={password} onChangeText={setPassword} secureTextEntry />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name='lock-outline' style={styles.icon} />
        <TextInput placeholder="Xác nhận mật khẩu" value={cfpassword} onChangeText={setCfpassword} secureTextEntry />
      </View>
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.creatText}>Đăng ký</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.question}>Đã có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText} > Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f1f1',
  },
  containerheader: {
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: '600',
    color: '#a62626',
  },
  imageStyle: {
    marginTop: 50,
    width: 300,
    height: 170,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 13,
    backgroundColor: '#fff',
    marginTop: 18,
    marginHorizontal: 20
  },
  registerContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 26,
    opacity: 0.5,
    paddingHorizontal: 5
  },
  button: {
    backgroundColor: '#a62626',
    padding: 18,
    borderRadius: 10,
    marginTop: 30,
    marginHorizontal: 20,
  },
  creatText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  question: {
    fontSize: 16,
    fontWeight: '300'
  },
  loginText: {
    fontSize: 16,
    color: '#a62626',
    fontWeight: '800'
  },
})
