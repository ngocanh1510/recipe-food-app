import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const registerText = "Tạo tài khoản"; // Định nghĩa text cho nút đăng ký
  const loginText = "Đăng nhập"; // Định nghĩa text cho nút đăng nhập

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pho.png')} // Đường dẫn tới hình ảnh của bạn
        style={styles.image}
      />
      <Text style={styles.title}>Công thức món ngon mỗi ngày</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>{registerText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>{loginText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a62626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  registerButton: {
    backgroundColor: '#a62626', // Màu nền của nút
    borderColor: 'white', // Màu của đường viền
    borderWidth: 2, // Độ dày của đường viền
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },  
  loginButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#a62626',
    fontWeight: '600',
    fontSize: 16,
    fontStyle: 'bold', // Thêm phong cách chữ nghiêng cho văn bản
  },
});

export default WelcomeScreen;
