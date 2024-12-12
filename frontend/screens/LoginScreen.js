import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { post } from '../src/api/api.js';
import { AuthContext } from './AuthContext.js';



export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (navigation) => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu!');
      return;
    }

    try {
      // Gọi API đăng nhập
      const response = await post('/auth/login', { username: email, password });

      if (response.status === 200) {
        const { token } = response.data; // Lấy token từ response (giả sử token trả về từ API)
        
        // Lưu token vào AsyncStorage
        login(token);

        // Hiển thị thông báo thành công và chuyển hướng đến màn hình chính
        Alert.alert('Thành công', 'Đăng nhập thành công!');
        () => navigation.navigate('HomeScreen');
        
      }
    } catch (error) {
      // Nếu có lỗi, hiển thị thông báo lỗi
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
        <Image source={require('../assets/Login_Logo.png')} style={styles.imageStyle} />
      </View>
      <View style={styles.welcome}>
        <Text style={styles.header}>Welcome</Text>
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email-outline" style={styles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#666"
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" style={styles.icon} />
        <TextInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#666"
        />
      </View>
      <Text
        style={styles.forgotpassword}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Quên mật khẩu?
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style={styles.loginWithText}>Hoặc đăng nhập bằng</Text>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="facebook" style={styles.facebook} />
        <Image
          source={require('../assets/7123025_logo_google_g_icon.png')}
          style={styles.gmail}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.question}>Chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupText}> Đăng ký ngay!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f1f1', // Nền màu hồng nhạt
  },
  containerheader: {
    alignItems: 'center',
    paddingRight: 15,
  },
  welcome: {
    alignItems: 'center',
  },
  imageStyle: {
    marginTop: 50,
    width: 200,
    height: 155,
  },
  header: {
    fontSize: 30,
    fontWeight: '600',
    color: '#a62626', // Màu chữ đỏ
  },
  button: {
    backgroundColor: '#a62626', // Màu nút đỏ
    padding: 18,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  forgotpassword: {
    color: '#a62626', // Màu đỏ đậm
    fontSize: 13,
    opacity: 0.9,
    fontWeight: '500',
    textAlign: 'right',
    padding: 5,
    marginRight: 5,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  loginWithText: {
    textAlign: 'center',
    fontWeight: '500',
    padding: 15,
    fontSize: 16,
    color: '#a62626', // Màu chữ đỏ
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  facebook: {
    color: '#1877F2',
    fontSize: 60,
    padding: 9,
  },
  gmail: {
    height: 79,
    width: 79,
  },
  loginContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 15,
    marginHorizontal: 20,
    height: 60, // Increased height
  },
  icon: {
    fontSize: 26,
    opacity: 0.5,
    paddingHorizontal: 8, // Increased padding
  },
  input: {
    flex: 1,
    fontSize: 16, // Larger font size
    paddingVertical: 8,
    paddingHorizontal: 5,
    color: '#000',
  },
  question: {
    fontSize: 16,
    fontWeight: '300',
  },
  signupText: {
    fontSize: 16,
    color: '#a62626', // Màu đỏ
    fontWeight: '800',
  },
});
