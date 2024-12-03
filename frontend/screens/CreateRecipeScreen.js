import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const CreateRecipeScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View>
                {/* Main Title */}
                <Text style={styles.title}>CHIA SẺ CÔNG THỨC CỦA BẠN</Text>
            </View>

            {/* Illustration */}
            <Image
                source={require('/Users/datRobot/Documents/Documents/GitHub/recipe-food-app/frontend/assets/People Cooking Concept.png')}
                style={styles.illustration}
                resizeMode="contain"
            />

            {/* Create Recipe Button */}
            <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('RecipeForm')}
            >
                <Text style={styles.buttonText}>Tạo công thức</Text>
                <Ionicons name="arrow-forward" size={20} color="#8B0000" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8B0000',
        paddingTop: 40,
    },
    backButton: {
        padding: 16,
        position: 'absolute',
        top: 40,
        left: 0,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '300',
        textAlign: 'center',
        marginTop: 60,
        fontFamily: 'System',
        letterSpacing: 1,
    },
    illustration: {
        width: '80%',
        height: '50%',
        alignSelf: 'center',
        marginTop: 40,
    },
    createButton: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        gap: 8,
    },
    buttonText: {
        color: '#8B0000',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'System',
    },
});

export default CreateRecipeScreen;
