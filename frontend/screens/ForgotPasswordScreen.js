// 22520073-Phan Thị Ngọc Ánh
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Logic gửi yêu cầu đặt lại mật khẩu
    alert(`Reset password link sent to ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quên mật khẩu</Text>
      <Text style={styles.instructions}>
        Vui lòng nhập email của bạn để đặt lại mật khẩu.
      </Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email-outline" style={styles.icon} />
        <TextInput
          placeholder="Nhập email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Đặt lại mật khẩu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#a62626',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 13,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  icon: {
    fontSize: 26,
    opacity: 0.5,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#a62626',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backText: {
    color: '#a62626',
    fontSize: 16,
  },
});
