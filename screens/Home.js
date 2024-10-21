import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const WelcomeAnimation = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity
  const [scaleAnim] = useState(new Animated.Value(0.5)); // Initial scale
  const [showHome, setShowHome] = useState(false); // To control when to show the home screen

  const navigation = useNavigation();

  // Animation to fade in and scale up the text
  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000, // 2 seconds fade-in
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800, // 0.8 seconds scale-up
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After the animation is done, set `showHome` to true
      setShowHome(true);
    });
  }, [fadeAnim, scaleAnim]);

  // If animation is complete, show Home screen
  if (showHome) {
    return <Home />;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.welcomeText}>Welcome to PaySignal</Text>
      </Animated.View>
    </View>
  );
};

// Home Component
const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Welcome Card */}
      <View style={styles.card}>
        <Text style={styles.welcomeText}>Home!</Text>

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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Set background color to black
  },
  textContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    color: 'black', // Text color is white for visibility
    fontSize: 36,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff', // Dark gray card background for contrast
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Elevation for Android shadow
    width: width * 0.9,
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

export default WelcomeAnimation;
