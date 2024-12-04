import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const RecipeForm = ({ navigation }) => {
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        console.log(result);
    };
    return (
        <View style={styles.container}>
            {image ? (
                <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.editImageOverlay}>
                        <Ionicons name="camera" size={24} color="white" />
                        <Text style={styles.editImageText}>Đổi ảnh</Text>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={pickImage} style={[styles.image, styles.placeholderContainer]}>
                    <Ionicons name="image-outline" size={50} color="#ccc" />
                    <Text style={styles.placeholderText}>Chọn ảnh món ăn</Text>
                </TouchableOpacity>
            )}

            
            <ScrollView contentContainerStyle={styles.scrollView}>
                <TextInput style={styles.input} placeholder="Tên món ăn" />
                <TextInput style={styles.input} placeholder="Nhập thời gian nấu" />
                <TextInput style={[styles.input, styles.textArea]} placeholder="Mô tả ngắn" multiline />
                <Text style={styles.sectionTitle}>Nguyên liệu</Text>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientRow}>
                        <TextInput style={styles.ingredientInput} placeholder="Nguyên liệu" value={ingredient.name} />
                        <TextInput style={styles.ingredientInput} placeholder="Số lượng" value={ingredient.quantity} />
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
                    <Text style={styles.addButtonText}>+ Thêm nguyên liệu</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Tiếp tục</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5E5E5',
    },
    scrollView: {
        padding: 16,
        paddingTop: 8,
        alightItems: 'center',
    },
    image: {
        width: '100%',
        height: 250,
        marginBottom: 0,
    },
    placeholderContainer: {
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
    },
    placeholderText: {
        marginTop: 8,
        color: '#666',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom : 10,
        marginVertical: 8,
    },
    textArea: {
        height: 100,
    },
    sectionTitle: {
        fontSize: 18,
        marginVertical: 8,
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ingredientInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginVertical: 8,
        marginRight: 8,
    },
    video: {
        width: 350,
        height: 275,
    },
    controlsContainer: {
        padding: 10,
    },
    addButton: {
        alignItems: 'center',
        marginVertical: 8,
    },
    addButtonText: {
        color: '#8B0000',
    },
    saveButton: {
        backgroundColor: '#8B0000',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        position: 'absolute',
        marginTop: 46,
        bottom: 16,
        left: 16,
        right: 16,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    imageContainer: {
        width: '100%',
        height: 250,
        position: 'relative',
    },
    editImageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editImageText: {
        color: 'white',
        marginTop: 8,
        fontSize: 16,
    },
});

export default RecipeForm;
