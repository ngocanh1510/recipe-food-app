import React, { useState, useEffect } from 'react';
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
import { get, put } from '../src/api/api';

const EditProfileScreen = ({ navigation }) => {
    // const { userData, updateUserData } = useUser();
    const [ userData, setUserData ] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            // console.log('Fetching profile...')
            const profileData = await get('/auth/profile'); // Lấy thông tin người dùng
            setUserData(profileData); // Cập nhật thông tin người dùng vào state
            // console.log('Profile data:', profileData);
            
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        };
    
        fetchProfile();
      }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        image: '',
    });
       
    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || '',
                email: userData.email || '',
                image: userData.avatar || '', // Lấy ảnh từ userData
            });
        }
    }, [userData]);

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

    const handleSave = async () => {
        // if (validateForm()) {
        //     updateUserData(formData);
        //     Alert.alert('Thành công', 'Thông tin đã được cập nhật', [
        //         { text: 'OK', onPress: () => navigation.goBack() }
        //     ]);
        // }
        
        if (validateForm()) {
            try {
                const formDataToUpdate = new FormData();
                if (formData.name) formDataToUpdate.append('name', formData.name);
                if (formData.email) formDataToUpdate.append('email', formData.email);
                // if (formData.image) {
                //     formDataToUpdate.append('avatar', {
                //     uri: formData.image,
                //     type: 'image/jpeg',
                //     name: 'avatar.jpg',
                // });
                // }

            const response = await put('/auth/update-profile', formDataToUpdate);
               
            // setUserData(
            //     name: userData.name || '',
            //     email: userData.email || '',
            // );

            // Thông báo thành công
            Alert.alert('Thành công', response.message, [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
            } catch (error) {
                // Nếu có lỗi xảy ra
                Alert.alert('Lỗi', error.message || 'Cập nhật thất bại');
            }
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
                        <Text style={styles.saveText}>Cập nhật</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF3E0',
        paddingBottom:80,
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
