
import React from 'react';
import { Text } from 'react-native';
import ScreenTemplate from './ScreenTemplate';

const HistoryScreen = ({ navigation }) => {
    return (
        <ScreenTemplate navigation={navigation} title="Lịch sử">
            <Text>Danh sách các công thức yêu thích</Text>
        </ScreenTemplate>
    );
};

export default HistoryScreen;