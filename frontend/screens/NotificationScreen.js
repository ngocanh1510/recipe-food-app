import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const NotificationsScreen = () => {
  // Danh sách thông báo
  const notifications = [
    { id: '1', title: 'Cập nhật mới', message: 'Đã thêm món ăn mới vào danh sách!' },
    { id: '2', title: 'Khuyến mãi', message: 'Giảm giá 20% cho món Phở Hà Nội.' },
    { id: '3', title: 'Thông báo', message: 'Đơn đặt hàng của bạn đã được xác nhận.' },
  ];

  // Render từng thông báo
  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5edea',
    padding: 20,
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a62626',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default NotificationsScreen;
