import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getSavedRecipes, getMyRecipes, deleteRecipe } from '../src/api/api';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
export default function NoteScreen({ navigation }) {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState('saved'); // 'saved' or 'my'
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
    fetchRecipes();
  }, []));

  const fetchRecipes = async () => {
    setIsLoading(true);
    const savedData = await getSavedRecipes();
    const myData = await getMyRecipes();
    if (savedData) setSavedRecipes(savedData);
    if (myData) setMyRecipes(myData);
    setIsLoading(false);
  };

  const handleDelete = async (recipeId) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa công thức này không?',
      [
        {
          text: 'Hủy',
          // style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: async () => {
            try {
              await deleteRecipe(recipeId);  // Gọi API xóa công thức
              fetchRecipes();                // Cập nhật lại danh sách công thức
            } catch (error) {
              Alert.alert('Lỗi', 'Có lỗi xảy ra khi xóa công thức, vui lòng thử lại.');
              console.error('Lỗi khi gọi API xóa công thức:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderRecipe = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.info}>{item.time}</Text>
        </View>
        {activeTab === 'my' && (
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={(e) => {
                e.stopPropagation();
                navigation.navigate('EditRecipe', { recipe: item });
              }}
            >
              <MaterialIcons name="edit" size={18} color="#FF6B6B" />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.deleteButton]}
              onPress={(e) => {
                e.stopPropagation();
                handleDelete(item._id);
              }}
            >
              <MaterialIcons name="delete-outline" size={18} color="#FF0000" />
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
          onPress={() => setActiveTab('saved')}>
          <Text style={styles.tabText}>Công thức đã lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'my' && styles.activeTab]}
          onPress={() => setActiveTab('my')}>
          <Text style={styles.tabText}>Công thức của tôi</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'saved' ? savedRecipes : myRecipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F3F3',
    padding: 16,
    paddingBottom:80,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  iconPadding: {
    marginLeft: 12,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionText: {
    color: '#FF6B6B',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  deleteButton: {
    backgroundColor: '#FFE5E5',
  },
  deleteText: {
    color: '#FF0000',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeTab: {
    backgroundColor: '#FF6B6B',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 15,
    color: '#333',
  },
});
