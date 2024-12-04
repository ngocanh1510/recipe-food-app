import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

const RecipeForm = ({ navigation, recipeId }) => {
    const db = useSQLiteContext();
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [steps, setSteps] = useState([{ title: '', description: '', image: null }]);

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

    const addStep = () => {
        setSteps([...steps, { title: '', description: '', image: null }]);
    };

    const pickStepImage = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            const updatedSteps = [...steps];
            updatedSteps[index].image = result.assets[0].uri;
            setSteps(updatedSteps);
        }
    };

    const handleStepTitleFocus = (index) => {
        const newSteps = [...steps];
        if (!newSteps[index].title.startsWith(`Bước ${index + 1}: `)) {
            newSteps[index].title = `Bước ${index + 1}: `;
            setSteps(newSteps);
        }
    };

    const handleComplete = async () => {
        try {
            // Insert all steps
            for (let i = 0; i < steps.length; i++) {
                const step = steps[i];
                await db.runAsync(
                    'INSERT INTO recipe_steps (recipe_id, step_number, title, description, image) VALUES (?, ?, ?, ?, ?)',
                    [recipeId, i + 1, step.title, step.description, step.image]
                );
            }

            Alert.alert('Thành công', 'Công thức đã được lưu', [
                { text: 'OK', onPress: () => navigation.navigate('CreateRecipe') }
            ]);
        } catch (error) {
            console.error('Error saving steps:', error);
            Alert.alert('Lỗi', 'Không thể lưu các bước thực hiện');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.stepsTitle}>Bước thực hiện</Text>
                {steps.map((step, index) => (
                    <View key={index} style={styles.stepCard}>
                        <TouchableOpacity style={styles.stepImageContainer} onPress={() => pickStepImage(index)}>
                            {step.image ? (
                                <Image source={{ uri: step.image }} style={styles.stepImage} />
                            ) : (
                                <View style={styles.stepImagePlaceholder}>
                                    <Ionicons name="camera-outline" size={24} color="#666" />
                                </View>
                            )}
                        </TouchableOpacity>
                        <View style={styles.stepContent}>
                            <TextInput
                                style={styles.stepTitle}
                                placeholder={`Bước ${index + 1}: `}
                                value={step.title}
                                onFocus={() => handleStepTitleFocus(index)}
                                onChangeText={(text) => {
                                    const newSteps = [...steps];
                                    // Ensure prefix remains when user edits
                                    const prefix = `Bước ${index + 1}: `;
                                    if (!text.startsWith(prefix)) {
                                        text = prefix + text.replace(prefix, '');
                                    }
                                    newSteps[index].title = text;
                                    setSteps(newSteps);
                                }}
                            />
                            <TextInput
                                style={styles.stepDescription}
                                placeholder="Chi tiết bước thực hiện"
                                multiline
                                value={step.description}
                                onChangeText={(text) => {
                                    const newSteps = [...steps];
                                    newSteps[index].description = text;
                                    setSteps(newSteps);
                                }}
                            />
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={styles.addButton} onPress={addStep}>
                    <Text style={styles.addButtonText}>+ Thêm bước</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
                    <Text style={styles.completeButtonText}>Hoàn thành</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5E5E5',
        paddingTop: 20,
        paddingBottom: 80,
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
    stepsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 16,
    },
    stepCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    stepImageContainer: {
        width: 80,
        height: 80,
        marginRight: 12,
    },
    stepImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    stepImagePlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    stepDescription: {
        fontSize: 14,
        color: '#666',
    },
    completeButton: {
        backgroundColor: '#8B0000',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    completeButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default RecipeForm;
