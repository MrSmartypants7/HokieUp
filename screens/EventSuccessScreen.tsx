// Import necessary components from 'react-native'
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons or any other icon library you prefer

// Define the EventSuccessScreen component
const EventSuccessScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    // Navigate back to the home screen or the desired screen
    navigation.navigate('TabOne');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="md-checkmark-circle" size={50} color="#28A745" style={styles.successIcon} />
        <Text style={styles.successText}>Event registration successful!</Text>
        <TouchableOpacity onPress={handleGoBack} style={styles.button}>
          <Text style={styles.buttonText}>Go Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Set the background color to white
  },
  content: {
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 20,
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF', // Set your desired button color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

// Export the component
export default EventSuccessScreen;
