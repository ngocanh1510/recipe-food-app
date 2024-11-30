//22520073_Phan Thị Ngọc Ánh
import React from "react";
import { View,Text,StyleSheet } from "react-native"

export default function HomeDetailScreen() {
    return(
        <View style={styles.container}>
        <Text>Home Details Screen</Text>
        </View>
    );
}
const styles=StyleSheet.create( {
    container:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
})
