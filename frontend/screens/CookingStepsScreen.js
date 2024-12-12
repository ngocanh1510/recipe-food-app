import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
const CookingStepsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { steps } = route.params;

  // Convert object format to string if needed
  const processStep = (step) => {
    if (step.title && step.description) {
      // Format 1: {title, description}
      return { title: step.title, content: step.description };
    } else if (typeof step === 'object' && !Array.isArray(step)) {
      // Format 2: {0: 'B', 1: 'ư', 2: 'ớ', ...}
      const text = Object.entries(step)
        .filter(([key]) => !isNaN(key)) // Filter out non-numeric keys like _id
        .sort(([a], [b]) => Number(a) - Number(b)) // Sort by index
        .map(([, char]) => char)
        .join('');
      
      // Try to split into title and content if contains ":"
      const parts = text.split(':');
      return parts.length > 1 
        ? { title: parts[0] + ':', content: parts[1] }
        : { title: '', content: text };
    }
    return { title: '', content: String(step) };
  };

  const formattedSteps = React.useMemo(() => {
    if (!Array.isArray(steps)) return [];
    return steps.map(processStep);
  }, [steps]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent} // Add this
      >
        <Text style={styles.header}>Các bước nấu ăn</Text>
        {formattedSteps.length > 0 ? (
          formattedSteps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                {step.title && <Text style={styles.stepTitle}>{step.title}</Text>}
                <Text style={styles.stepText}>{step.content}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noStepsText}>Không có dữ liệu về các bước nấu ăn!</Text>
        )}
        
        {/* Add bottom padding to ensure content clears the button */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.completeButtonText}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 80,
    paddingTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 150, // Ensure content doesn't hide behind button
  },
  bottomPadding: {
    height: 100, // Extra padding at bottom
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
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 85,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'white', // Add background to avoid transparency
  },
  completeButton: {
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
