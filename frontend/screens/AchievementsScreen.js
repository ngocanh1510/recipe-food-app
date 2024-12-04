
import React from 'react';
import { View, Text } from 'react-native';
import ScreenTemplate from './ScreenTemplate';

const AchievementsScreen = ({ navigation }) => {
    return (
        <ScreenTemplate navigation={navigation} title="Thành tựu">
            <Text>Danh sách các công thức yêu thích</Text>
        </ScreenTemplate>
    );
};

export default AchievementsScreen;