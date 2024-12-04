import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CookingStepsScreen = ({ route }) => {
  const { steps } = route.params; // Lấy dữ liệu các bước nấu từ params

  return (
    <ScrollView style={styles.container}>
      {Array.isArray(steps) && steps.length > 0 ? (
        steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noStepsText}>Không có dữ liệu về các bước nấu ăn!</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom:80,
    backgroundColor: '#fff',
  },
  stepContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
  },
  noStepsText: {
    fontSize: 16,
    color: 'gray',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default CookingStepsScreen;
