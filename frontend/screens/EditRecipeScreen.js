
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function EditRecipeScreen({ route, navigation }) {
    const { recipe } = route.params;
    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    const [time, setTime] = useState(recipe.time);
    const [ingredients, setIngredients] = useState(recipe.ingredients || []);
    const [steps, setSteps] = useState(recipe.steps || []);
    const [image, setImage] = useState(recipe.image);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        const updatedRecipe = {
            ...recipe,
            title,
            description,
            time,
            ingredients,
            steps,
            image,
        };
        // TODO: Call API to update recipe
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <MaterialIcons name="add-photo-alternate" size={40} color="#666" />
                )}
            </TouchableOpacity>

            <View style={styles.form}>
                <Text style={styles.label}>Tên món ăn</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Nhập tên món ăn"
                />

                <Text style={styles.label}>Mô tả</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Nhập mô tả món ăn"
                    multiline
                />

                <Text style={styles.label}>Thời gian nấu</Text>
                <TextInput
                    style={styles.input}
                    value={time}
                    onChangeText={setTime}
                    placeholder="Ví dụ: 30 phút"
                />

                <Text style={styles.label}>Nguyên liệu</Text>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientRow}>
                        <TextInput
                            style={styles.ingredientInput}
                            value={ingredient}
                            onChangeText={(text) => {
                                const newIngredients = [...ingredients];
                                newIngredients[index] = text;
                                setIngredients(newIngredients);
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                const newIngredients = ingredients.filter((_, i) => i !== index);
                                setIngredients(newIngredients);
                            }}
                        >
                            <MaterialIcons name="remove-circle" size={24} color="#FF6B6B" />
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setIngredients([...ingredients, ''])}
                >
                    <Text style={styles.addButtonText}>Thêm nguyên liệu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        height: 200,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    form: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ingredientInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginRight: 8,
    },
    addButton: {
        backgroundColor: '#FF6B6B',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});