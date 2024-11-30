import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons'

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.user}>
        <Image
          source={require('../assets/325471648_3435328433353012_6625490091817151127_n.jpg')} // Replace with actual profile image
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.greeting}>Chào buổi sáng </Text>
          <Text style={styles.username}> Em bot</Text>
        </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('THÔNG BÁO')}>
          <Ionicons name='notifications-outline' style={styles.notification}/>
        </TouchableOpacity>
      </View>

      {/* Featured Dish */}
        <View style={styles.dishItem}>
        <View>
             <Text style={styles.dishName}>Cơm tấm</Text>
             <TouchableOpacity style={styles.button}>
               <Text style={styles.buttonText}>Tìm hiểu ngay</Text>
               <MaterialCommunityIcons name='arrow-right-thin' style={styles.icon}/>
             </TouchableOpacity>
          </View>
          <Image
            source={require('../assets/tải xuống.jpeg')} // Replace with actual image
            style={styles.dishImage}
          />
        </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hôm nay ăn gì?</Text>
        <ScrollView horizontal style={styles.mealList}>
          <TouchableOpacity style={styles.mealItem}>
           <Image
            source={require('../assets/tải xuống (1).jpeg')}
            style={styles.pho}/>
            <Text style={styles.mealName}>Công thức Phở chuẩn vị</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/bunbo.jpeg')}
            style={styles.pho}/>
            <Text style={styles.mealName}>Công thức Bún bò chuẩn vị</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Popular Pho Types Section */}
      <View style={styles.section}>
        <View style={styles.category}>
          <Text style={styles.sectionTitle}>Thể loại phổ biến</Text>
          <TouchableOpacity >
            <Text style={styles.seemore}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.phoCategories}>
          <TouchableOpacity style={styles.phoCategory}>
            <Text style={styles.phoCategoryText}>Cơm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.phoCategory}>
            <Text style={styles.phoCategoryText}>Cháo/Súp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.phoCategory}>
            <Text style={styles.phoCategoryText}>Bún/Bánh canh</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5edea',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  user:{
    flexDirection:'row'
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  greeting: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    color:'gray',
    marginLeft:10
  },
  username:{
    fontSize:25,
    marginLeft:25,
    color:'#881415'
  },
  notification:{
    fontSize:25,
    color:'gray',
    fontWeight:'900',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 17,
    borderRadius: 25,
    flexDirection:'row',
    marginLeft:10
  },
  icon:{
    fontSize:20,
    marginLeft:5
  },
  
  buttonText: {
    color: '#881415',
    fontWeight: 'bold',
    marginTop:1,
  },
  featuredDish: {
    marginTop: 20,
    paddingLeft: 20,
  },
  dishItem: {
    alignItems: 'center',
    flexDirection:'row',
    backgroundColor:'#881415',
    marginHorizontal:15,
    paddingVertical:18,
    borderRadius:13
  },
  dishImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
    marginLeft:15
  },
  dishName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
    marginLeft:25
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical:10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'gray',
  },
  mealList: {
    marginTop: 10,
  },
  pho:{
    borderRadius:20,
    height:200,
    marginTop:10
  },
  mealItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
  },
  mealName: {
    fontSize: 16,
  },
  phoCategories: {
    flexDirection: 'row',
    marginTop: 10,
  },
  category:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  seemore:{
    color:'#881415',
    fontSize:18

  },
  phoCategory: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    borderColor:'#881415',
    borderWidth:1
  },
  phoCategoryText: {
    fontSize: 16,
  },

});

export default HomeScreen;
