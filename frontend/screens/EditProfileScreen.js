import React, { useState } from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/UserContext';

const EditProfileScreen = ({ navigation }) => {
    const { userData, updateUserData } = useUser();
    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email,
        image: userData.image
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Tên không được để trống';
        if (!formData.email.trim()) {
            newErrors.email = 'Email không được để trống';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            updateUserData(formData);
            Alert.alert('Thành công', 'Thông tin đã được cập nhật', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setFormData(prev => ({ ...prev, image: result.assets[0].uri }));
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.content}>
                <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                    <Image source={{ uri: formData.image }} style={styles.avatar} />
                    <View style={styles.editIconContainer}>
                        <Ionicons name="camera" size={20} color="#FFF" />
                    </View>
                </TouchableOpacity>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Tên</Text>
                        <TextInput
                            style={[styles.input, errors.name && styles.inputError]}
                            value={formData.name}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            value={formData.email}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>
                </View>

                <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.saveText}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF3E0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#FFF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5C3A29',
    },
    saveText: {
        color: '#5C3A29',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 16,
    },
    content: {
        padding: 20,
    },
    imageContainer: {
        alignSelf: 'center',
        marginBottom: 50,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    editIconContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#5C3A29',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FAF3E0',
    },
    form: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#5C3A29',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F8F8F8',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    inputError: {
        borderColor: '#FF6B6B',
    },
    errorText: {
        color: '#FF6B6B',
        fontSize: 12,
        marginTop: 4,
    },
});

export default EditProfileScreen;
