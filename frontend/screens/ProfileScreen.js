import {
    MaterialCommunityIcons,
    MaterialIcons
} from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useUser } from '../context/UserContext';
import { post } from '../src/api/api';
import { AuthContext } from './AuthContext';
import { Alert } from 'react-native';
import { get } from '../src/api/api';

const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity
        style={styles.menuItem}
        onPress={onPress}
        activeOpacity={0.7}
    >
        {icon}
        <Text style={styles.menuText}>{title}</Text>
        <MaterialIcons name="chevron-right" size={24} color="#5C3A29" />
    </TouchableOpacity>
);

const ProfileScreen = ({navigation}) => {
    const [ userData, setUserData ] = useState({});
    const { logout } = useContext(AuthContext);
     // Hàm xử lý logout

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

    const handleLogout = async () => {
        try {
            // Gọi API logout
            const response = await post('/auth/logout');

            if (response.status === 200) {
                logout();

                // Chuyển hướng về màn hình Login
                Alert.alert('Thành công', 'Đăng xuất thành công!'
                //     , [
                //     {
                //         text: 'OK',
                //         onPress: () => navigation.replace('Login'), // Chuyển về màn hình Login
                //     },
                // ]
            );
            } else {
                Alert.alert('Lỗi', 'Không thể đăng xuất, vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
            Alert.alert(
                'Lỗi',
                'Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại sau!'
            );
        }
    };

    const menuItems1 = [
        {
            icon: <MaterialIcons name="favorite" size={24} color="#5C3A29" />, 
            title: "Yêu thích",
            onPress: () => navigation.navigate('Favorites')
        },
        { icon: <MaterialIcons name="history" size={24} color="#5C3A29" />, title: "Lịch sử" },
        { icon: <MaterialIcons name="notifications" size={24} color="#5C3A29" />, title: "Thông báo" },
        { icon: <MaterialCommunityIcons name="trophy" size={24} color="#5C3A29" />, title: "Thành tựu" },
        { icon: <MaterialIcons name="share" size={24} color="#5C3A29" />, title: "Chia sẻ" },
    ];

    const menuItems2 = [
        {
            icon: <MaterialIcons name="settings" size={24} color="#5C3A29" />, 
            title: "Cài đặt",
            onPress: () => navigation.navigate('Settings')
        },
        { icon: <MaterialIcons name="security" size={24} color="#5C3A29" />, title: "Chính sách bảo mật" },
        { icon: <MaterialIcons name="help" size={24} color="#5C3A29" />, title: "Hỗ trợ" },
        { icon: <MaterialIcons name="info" size={24} color="#5C3A29" />, title: "Về chúng tôi" },
    ];

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.profileSection}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: userData.avatar }}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{userData.name}</Text>
                        <Text style={styles.description}>{userData.email}</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
                    <MaterialIcons name="edit" size={24} color="#5C3A29" />
                    </TouchableOpacity>
                </View>

                <View style={styles.menuSection}>
                    {menuItems1.map((item, index) => (
                        <MenuItem key={index} {...item} />
                    ))}
                </View>

                <View style={styles.menuSection}>
                    {menuItems2.map((item, index) => (
                        <MenuItem key={index} {...item} />
                    ))}
                </View>

                <TouchableOpacity 
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                    <MaterialIcons name="logout" size={24} color="#5C3A29" />
                </TouchableOpacity>

            </ScrollView>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f1f1',
        paddingBottom:80,
        paddingTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5C3A29',
        textAlign: 'center',
        padding: 16,
    },
    scrollView: {
        flex: 1,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        borderColor: '#E0E0E0',
        borderWidth: 1,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5C3A29',
    },
    description: {
        fontSize: 14,
        color: '#5C3A29',
        opacity: 0.8,
    },
    editButton: {
        padding: 8,
    },
    menuSection: {
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    menuText: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
        color: '#5C3A29',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5CAC3',
        margin: 16,
        padding: 16,
        borderRadius: 12,
    },
    logoutText: {
        color: '#5C3A29',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
});

export default ProfileScreen;
