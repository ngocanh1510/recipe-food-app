
import React from 'react';
import { View, Text } from 'react-native';
import ScreenTemplate from './ScreenTemplate';

const HelpScreen = ({ navigation }) => {
    return (
        <ScreenTemplate navigation={navigation} title="HelpScreen">
            <Text>Danh sách các công thức yêu thích</Text>
        </ScreenTemplate>
    );
};

export default HelpScreen;