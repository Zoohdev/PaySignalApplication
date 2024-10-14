import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Welcome Card */}
      <View style={styles.card}>
        <Image
          source={require('../assets/icon.png')}  // Fixed the image import
          style={styles.logo}
          accessible={true}
          accessibilityLabel="PaySignal Logo"
        />
        <Text style={styles.welcomeText}>Welcome to PaySignal!</Text>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Accounts")}
          accessible={true}
          accessibilityLabel="Go to Accounts"
        >
          <Text style={styles.buttonText}>Go to Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Prepaid')}
          accessible={true}
          accessibilityLabel="Buy Prepaid"
        >
          <Text style={styles.buttonText}>Buy Prepaid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SendMoney')}
          accessible={true}
          accessibilityLabel="Send Money"
        >
          <Text style={styles.buttonText}>Send Money</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#f7f7f',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,  // Elevation for Android shadow
    width: width * 0.9,
  },
  logo: {
    width: width * 0.25,  // Responsive width
    height: width * 0.25, // Responsive height
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FA7901',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
