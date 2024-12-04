
import React from 'react';
import { View, Text } from 'react-native';
import ScreenTemplate from './ScreenTemplate';

const AboutScreen = ({ navigation }) => {
    return (
        <ScreenTemplate navigation={navigation} title="AboutScreen">
            <Text>Danh sách các công thức yêu thích</Text>
        </ScreenTemplate>
    );
};

export default AboutScreen;