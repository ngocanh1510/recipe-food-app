
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ScreenTemplate = ({ navigation, title, children }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#5C3A29" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <View style={styles.content}>
                {children}
            </View>
        </View>
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        marginLeft: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5C3A29',
    },
    content: {
        flex: 1,
        padding: 16,
    },
});

export default ScreenTemplate;