import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CreateRecipeScreen = () => {
    const navigation = useNavigation();

    return (
            <View style={styles.container}>
                <Text style={styles.title}>CHIA SẺ CÔNG THỨC CỦA BẠN</Text>
                <Image
                    source={require('/Users/datRobot/Documents/Documents/GitHub/recipe-food-app/frontend/assets/People Cooking Concept.png')}
                    style={styles.illustration}
                    resizeMode="contain"
                />
                <TouchableOpacity
                    style={styles.createButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('RecipeForm')}
                >
                    <Text style={styles.buttonText}>Tạo công thức</Text>
                    <Ionicons name="arrow-forward" size={20} color="#8B0000" />
                </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#8B0000',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '100%',
        backgroundColor: '#8B0000',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'System',
        letterSpacing: 1,
        marginBottom: 40,
        marginTop: 40,
    },
    illustration: {
        width: '100%',
        height: 400,
        marginVertical: 40,
        marginBottom: 40,
    },
    createButton: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 60,
        borderRadius: 25,
        width: '80%',
        gap: 8,
        marginTop: 40,
        bottom: 100,
    },
    buttonText: {
        color: '#8B0000',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'System',
        
    },
});

export default CreateRecipeScreen;
