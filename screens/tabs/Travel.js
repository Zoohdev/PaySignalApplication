import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure this package is installed
import { useNavigation } from '@react-navigation/native'; // Import for navigation

const Travel = () => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Travel Services</Text>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Flight')}>
        <MaterialIcons name="flight-takeoff" size={24} color="#FFA500" />
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Book Your Flight</Text>
          <Text style={styles.buttonText}>Flight Booking</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Bus')}>
        <MaterialIcons name="directions-bus" size={24} color="#FFA500" />
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Travel by Bus</Text>
          <Text style={styles.buttonText}>Bus Booking</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Train')}>
        <MaterialIcons name="train" size={24} color="#FFA500" />
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Book Your Train</Text>
          <Text style={styles.buttonText}>Train Booking</Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark background for the container
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // Light text for the title
    textAlign: 'center',
    marginTop: 20, // Move the title lower on the screen
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Darker separator for dark mode
  },
  textContainer: {
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // Light text for subtitles
  },
  buttonText: {
    fontSize: 16,
    color: '#FFA500', // Orange color for the button text
  },
});

export default Travel;
