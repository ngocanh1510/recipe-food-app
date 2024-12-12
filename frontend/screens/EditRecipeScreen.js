import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addRecipe } from '../src/api/api';

const EditRecipeScreen = ({ route, navigation }) => {
    const { recipes } = route.params;
    React.useEffect(() => {
        navigation.setOptions({
            tabBarStyle: { display: 'none' }
        });
        
        // Cleanup when leaving screen
        return () => {
            navigation.setOptions({
                tabBarStyle: { display: 'flex' }
            });
        };
    }, []);
    const [title, setTitle] = useState(recipes.title || '');
    const [description, setDescription] = useState(recipes.description || '');
    const [showSpiceModal, setShowSpiceModal] = useState(false);
    const [selectedSpice, setSelectedSpice] = useState(null);
    const [customSpice, setCustomSpice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [ingredients, setIngredients] = useState(recipes.ingredients || []);
    const [carbs, setCarbs] = useState(recipes.carbs?.toString() || '0');
    const [protein, setProtein] = useState(recipes.protein?.toString() || '0');
    const [calories, setCalories] = useState(recipes.calories?.toString() || '0');
    const [fat, setFat] = useState(recipes.fat?.toString() || '0');
    const [time, setTime] = useState(recipes.time?.toString() || '');
    const [category, setCategory] = useState(recipes.category || '');
    const [image, setImage] = useState(recipes.image || null);
    const [servings, setServings] = useState(recipes.servings || 1);
    const [steps, setSteps] = useState(
        recipes.steps?.length > 0 
            ? recipes.steps 
            : [{ title: '', description: '', image: null }]
    );
    const spiceList = [
        'Hạt tiêu', 'Ớt', 'Hành khô', 'Tỏi', 'Gừng', 'Quế', 'Hồi', 'Khác'
    ];
    console.log("Recipes: ",recipes);
    
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    
    const categories = [
        'Cơm',
        'Cháo/Súp',
        'Phở/Bún/Bánh canh',
        'Món xào',
        'Bánh mì',
        'Ăn vặt',
        'Món cuốn'
    ];
    const handleAddSpice = () => {
        const spiceName = selectedSpice === 'Khác' ? customSpice : selectedSpice;
        if (spiceName && quantity) {
            setIngredients(prev => [...prev, { name: spiceName, quantity: quantity }]);
            setSelectedSpice(null);
            setCustomSpice('');
            setQuantity('');
            setShowSpiceModal(false);
        }
    };
    const pickImage = async () => {
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
        console.log(result.assets[0].uri);
    };

    const handleDeleteIngredient = (index) => {
        setIngredients(prev => prev.filter((_, i) => i !== index));
    };
    const increaseServings = () => setServings(prev => prev + 1);
    const decreaseServings = () => setServings(prev => Math.max(1, prev - 1));

    const addStep = () => {
        setSteps([...steps, { title: '', description: '', image: null }]);
    };

    const handleStepTitleFocus = (index) => {
        const newSteps = [...steps];
        if (!newSteps[index].title.startsWith(`Bước ${index + 1}: `)) {
            newSteps[index].title = `Bước ${index + 1}: `;
            setSteps(newSteps);
        }
    };

    const handleSave = async () => {
        const recipe = {
            title,
            description,
            image,
            time,
            carbs,
            protein,
            calories,
            fat,
            category,
            ingredients,
            steps
        };

        try {
            // Gửi công thức lên backend
            const savedRecipe = await addRecipe(recipe);

            // Hiển thị thông báo thành công
            Alert.alert('Thành công', 'Công thức đã được lưu', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            // Xử lý lỗi
            Alert.alert('Lỗi', 'Không thể lưu công thức');
            console.log(error)
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {image ? (
                    <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.headerImage} />
                        <View style={styles.editImageOverlay}>
                            <Ionicons name="camera" size={24} color="white" />
                            <Text style={styles.editImageText}>Đổi ảnh</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={pickImage} style={[styles.headerImage, styles.placeholderContainer]}>
                        <Ionicons name="image-outline" size={50} color="#ccc" />
                        <Text style={styles.placeholderText}>Chọn ảnh món ăn</Text>
                    </TouchableOpacity>
                )}

                
                <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={20} color="#666" />
                    <TextInput
                        style={styles.timeText}
                        value={time}
                        onChangeText={setTime}
                        placeholder="60 "
                    />
                    <Text> phút</Text>
                </View>

                <View style={styles.contentContainer}>
                    <TextInput
                        style={styles.titleInput}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Tên món ăn"
                    />
                    
                    <TouchableOpacity 
                        style={styles.categoryDropdown}
                        onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    >
                        <Text style={styles.categoryText}>
                            {category || 'Chọn thể loại món ăn'}
                        </Text>
                        <Ionicons 
                            name={showCategoryDropdown ? 'chevron-up' : 'chevron-down'} 
                            size={24} 
                            color="#666" 
                        />
                    </TouchableOpacity>

                    {showCategoryDropdown && (
                        <View style={styles.dropdownList}>
                            {categories.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setCategory(item);
                                        setShowCategoryDropdown(false);
                                    }}
                                >
                                    <Text style={styles.dropdownItemText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                    
                    <TextInput
                        style={styles.descriptionInput}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Mô tả món ăn"
                        multiline
                    />

                    <View style={styles.nutritionGrid}>
                        {[
                            { icon: 'nutrition', name: 'Tinh bột', value: carbs, setValue: setCarbs },
                            { icon: 'fish', name: 'Chất đạm', value: protein,setValue: setProtein},
                            { icon: 'flame', name: 'Năng lượng', value: calories, setValue: setCalories },
                            { icon: 'water', name: 'Chất béo', value: fat, setValue: setFat }
                        ].map((item, index) => (
                            <View key={index} style={styles.nutritionItem}>
                                <Ionicons name={`${item.icon}-outline`} size={24} color="#666" />
                                    <TextInput
                                    style={styles.nutritionInput}
                                    value={item.value}
                                    onChangeText={(text) => item.setValue(text)}
                                    placeholder="0g"
                                /> 
                                <Text style={styles.nutritionName}>{item.name}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Các nguyên liệu</Text>
                    
                    <View style={styles.servingsContainer}>
                        <Text style={styles.servingsLabel}>Khẩu phần</Text>
                        <View style={styles.servingsControls}>
                            <TouchableOpacity onPress={decreaseServings} style={styles.servingButton}>
                                <Text style={styles.servingButtonText}>-</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.servingsInput}
                                value={String(servings)}
                                keyboardType="number-pad"
                                onChangeText={(text) => setServings(parseInt(text) || 1)}
                            />
                            <TouchableOpacity onPress={increaseServings} style={styles.servingButton}>
                                <Text style={styles.servingButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {ingredients.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientRow}>
                            <Text style={styles.ingredientName}>{ingredient.name}</Text>
                            <View style={styles.ingredientActions}>
                                <Text style={styles.ingredientAmount}>{ingredient.quantity}</Text>
                                <TouchableOpacity 
                                    onPress={() => handleDeleteIngredient(index)}
                                    style={styles.deleteButton}
                                >
                                    <Ionicons name="close-circle-outline" size={24} color="#B22222" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity 
                        style={styles.spiceButton}
                        onPress={() => setShowSpiceModal(true)}
                    >
                        <Text style={styles.spiceButtonText}>Thêm gia vị</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.sectionTitle}>Các bước thực hiện</Text>
                    {steps.map((steps, index) => (
                        <View key={index} style={styles.stepCard}>
                            <View style={styles.stepContent}>
                                <TextInput
                                    style={styles.stepTitle}
                                    placeholder={`Bước ${index + 1}: `}
                                    value={steps.title}
                                    onFocus={() => handleStepTitleFocus(index)}
                                    onChangeText={(text) => {
                                        const newSteps = [...steps];
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
                                    value={steps.description}
                                    onChangeText={(text) => {
                                        const newSteps = [...steps];
                                        newSteps[index].description = text;
                                        setSteps(newSteps);
                                    }}
                                />
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.spiceButton} onPress={addStep}>
                        <Text style={styles.spiceButtonText}>Thêm bước</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.nextButton} 
                        onPress={handleSave}  // Add this onPress handler
                    >
                        <Text style={styles.nextButtonText}>Lưu công thức</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
            <Modal
                visible={showSpiceModal}
                transparent={true}
                animationType="slide"
            >
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalContainer}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
                >
                    <TouchableOpacity 
                        style={styles.modalOverlay} 
                        activeOpacity={1} 
                        onPress={() => setShowSpiceModal(false)}
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Chọn gia vị</Text>
                        
                            <View style={styles.spiceSelectionContainer}>
                                {spiceList.map((spice, index) => (
                                    <TouchableOpacity 
                                        key={index}
                                        style={[
                                            styles.spiceItem,
                                            selectedSpice === spice && styles.selectedSpiceItem
                                        ]}
                                        onPress={() => setSelectedSpice(spice)}
                                    >
                                        <Text style={selectedSpice === spice ? styles.selectedSpiceText : null}>
                                            {spice}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {selectedSpice === 'Khác' && (
                                <TextInput
                                    style={styles.customSpiceInput}
                                    value={customSpice}
                                    onChangeText={setCustomSpice}
                                    placeholder="Nhập tên gia vị"
                                />
                            )}

                            <View style={styles.amountContainer}>
                                <Text>Số lượng:</Text>
                                <TextInput
                                    style={styles.amountInput}
                                    value={quantity}
                                    onChangeText={setQuantity}
                                    placeholder="VD: 10g, 1 muỗng,..."
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity 
                                    style={styles.cancelButton}
                                    onPress={() => setShowSpiceModal(false)}
                                >
                                    <Text style={styles.buttonText}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[
                                        styles.addButton,
                                        (!selectedSpice || !quantity) && styles.disabledButton
                                    ]}
                                    onPress={handleAddSpice}
                                    disabled={!selectedSpice || !quantity}
                                >
                                    <Text style={styles.buttonText}>Thêm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerImage: {
        width: '100%',
        height: 250,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    timeContainer: {
        position: 'absolute',
        top: 40,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 8,
        borderRadius: 15,
    },
    timeText: {
        marginLeft: 4,
        color: '#666',
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 80, // Add extra padding at bottom to ensure content is visible above tab bar
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        padding: 4,
    },
    descriptionInput: {
        color: '#666',
        marginBottom: 16,
        lineHeight: 20,
        padding: 4,
        minHeight: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        color: '#666',
        marginBottom: 16,
        lineHeight: 20,
    },
    nutritionGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    nutritionItem: {
        alignItems: 'center',
        flex: 1,
    },
    nutritionValue: {
        fontWeight: 'bold',
        marginVertical: 4,
    },
    nutritionInput: {
        fontWeight: 'bold',
        marginVertical: 4,
        textAlign: 'center',
        padding: 2,
    },
    nutritionName: {
        fontSize: 12,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    servingsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    servingsLabel: {
        fontSize: 16,
    },
    servingsControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    servingButton: {
        backgroundColor: '#B22222',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    servingButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    servingsInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        width: 50,
        height: 40,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    ingredientActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ingredientAmount: {
        color: '#666',
        marginRight: 10,
    },
    deleteButton: {
        padding: 4,
    },
    spiceButton: {
        backgroundColor: 'transparent',
        padding: 12,
        borderRadius: 8,
        marginVertical: 16,
        borderWidth: 2,
        borderColor: '#B22222',
        borderStyle: 'dashed',
    },
    spiceButtonText: {
        color: '#B22222',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        width: '80%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    spiceSelectionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 16,
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
    spiceItem: {
        width: '48%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    selectedSpiceItem: {
        backgroundColor: '#B22222',
        borderColor: '#B22222',
    },
    selectedSpiceText: {
        color: '#fff',
    },
    customSpiceInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    amountContainer: {
        marginBottom: 16,
    },
    amountInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginTop: 8,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        flex: 1,
        padding: 12,
        backgroundColor: '#666',
        borderRadius: 8,
        marginRight: 8,
    },
    addButton: {
        flex: 1,
        padding: 12,
        backgroundColor: '#B22222',
        borderRadius: 8,
        marginLeft: 8,
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: '#B22222',
        padding: 16,
        marginTop: 24,
        marginBottom: 32,
        borderRadius: 12,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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
    categoryDropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
    },
    categoryText: {
        fontSize: 16,
        color: '#333',
    },
    dropdownList: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginTop: -14,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#333',
    }
});

export default EditRecipeScreen;