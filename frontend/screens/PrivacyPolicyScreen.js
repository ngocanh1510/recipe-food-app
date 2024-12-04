
import React from 'react';
import { View, Text } from 'react-native';
import ScreenTemplate from './ScreenTemplate';

const PrivacyPolicyScreen = ({ navigation }) => {
    return (
        <ScreenTemplate navigation={navigation} title="PrivacyPolicyScreen">
            <Text>Danh sách các công thức yêu thích</Text>
        </ScreenTemplate>
    );
};

export default PrivacyPolicyScreen;