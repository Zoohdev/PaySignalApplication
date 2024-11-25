import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure this package is installed
import { useNavigation } from '@react-navigation/native'; // Import for navigation

const Prepaid = () => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Prepaid Services</Text>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Electricity')}>
        <MaterialIcons name="flash-on" size={24} color="#FFA500" />
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Power Up Your Home</Text>
          <Text style={styles.buttonText}>Buy Electricity</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('TopAirtime')}>
        <MaterialIcons name="signal-cellular-alt" size={24} color="#FFA500" />
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Stay Connected</Text>
          <Text style={styles.buttonText}>Top Up Airtime</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Betting')}>
        <MaterialIcons name="star" size={24} color="#FFA500" />
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Bet on Your Favorites</Text>
          <Text style={styles.buttonText}>Buy Betting Voucher</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('GiftCard')}>
        <MaterialIcons name="card-giftcard" size={24} color="#FFA500" />
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Gift a Surprise</Text>
          <Text style={styles.buttonText}>Buy Gift Cards</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2a2b37',
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Light gray for separator
  },
  textContainer: {
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2a2b37',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFA500',
  },
});

export default Prepaid;
