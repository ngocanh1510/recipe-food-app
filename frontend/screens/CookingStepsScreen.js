import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CookingStepsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { steps } = route.params;

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Các bước nấu ăn</Text>
        {Array.isArray(steps) && steps.length > 0 ? (
          steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noStepsText}>Không có dữ liệu về các bước nấu ăn!</Text>
        )}
        <View>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => navigation.navigate('SearchScreen')}
          >
            <Text style={styles.completeButtonText}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 80,
    paddingTop: 50,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 80,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
    padding: 12,
    paddingLeft: 0,
  },
  stepText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
  },
  noStepsText: {
    fontSize: 16,
    color: '#95A5A6',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  completeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingbottom: 80,
  },
});

export default CookingStepsScreen;
