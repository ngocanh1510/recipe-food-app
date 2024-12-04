
import React from 'react';
import { View, Text } from 'react-native';
import ScreenTemplate from './ScreenTemplate';

const SettingsScreen = ({ navigation }) => {
    return (
        <ScreenTemplate navigation={navigation} title="SettingsScreen">
            <Text>Danh sách các công thức yêu thích</Text>
        </ScreenTemplate>
    );
};

export default SettingsScreen;