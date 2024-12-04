
import React from 'react';
import { View, Text } from 'react-native';
import ScreenTemplate from './ScreenTemplate';

const FavoritesScreen = ({ navigation }) => {
    return (
        <ScreenTemplate navigation={navigation} title="Yêu thích">
            <Text>Danh sách các công thức yêu thích</Text>
        </ScreenTemplate>
    );
};

export default FavoritesScreen;