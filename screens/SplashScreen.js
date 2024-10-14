import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const navigation = useNavigation();

  // Navigate to the Login screen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // After splash, navigate to Login
    }, 3000); // 3 seconds

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['black', 'black']} // You can adjust colors if needed
      angle={90}
      style={styles.container}
    >
      <Image
        source={require('../assets/icon.png')} // Ensure this path is correct
        style={styles.image}
        resizeMode="contain"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%', // Adjust size as needed
    height: '80%',
  },
});
