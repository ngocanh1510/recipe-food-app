import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = ({ title, iconName = 'camera-outline' }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            {iconName && (
                <TouchableOpacity>
                    <Ionicons name={iconName} size={28} color="#881415" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 28,
        color: '#881415',
        fontWeight: 'bold',
    },
});

export default Header;