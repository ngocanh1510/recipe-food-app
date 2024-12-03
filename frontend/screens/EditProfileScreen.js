import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditProfileScreen = ({ navigation }) => {
    const [name, setName] = useState('John Doe');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');

    const handleSave = () => {
        // Handle save logic here
        navigation.goBack();
    };

    const InputField = ({ label, value, onChangeText, multiline }) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, multiline && styles.multilineInput]}
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#5C3A29" />
                </TouchableOpacity>
                {/* <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text> */}
                <TouchableOpacity onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    style={styles.avatar}
                />
                <TouchableOpacity style={styles.changeAvatarButton}>
                    <Text style={styles.changeAvatarText}>Đổi ảnh</Text>
                </TouchableOpacity>
                <Text style={styles.userName}>{name}</Text>
            </View>

            <View style={styles.form}>
                <InputField label="Tên" value={name} onChangeText={setName} />
                <InputField label="Số điện thoại" value={phone} onChangeText={setPhone} />
                <InputField label="Email" value={email} onChangeText={setEmail} />
                <InputField
                    label="Tiểu sử"
                    value={bio}
                    onChangeText={setBio}
                    multiline
                />
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
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5C3A29',
    },
    saveButtonText: {
        color: '#5C3A29',
        fontSize: 16,
        fontWeight: 'bold',
    },
    avatarContainer: {
        alignItems: 'center',
        padding: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changeAvatarButton: {
        marginTop: 10,
    },
    changeAvatarText: {
        color: '#5C3A29',
        fontSize: 16,
    },
    userName: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '600',
        color: '#5C3A29',
    },
    form: {
        padding: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        color: '#5C3A29',
        marginBottom: 4,
        fontFamily: 'sans-serif',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        fontFamily: 'sans-serif',
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#B71C1C',
        margin: 16,
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'sans-serif',
    },
});

export default EditProfileScreen;
