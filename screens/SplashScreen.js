import React, { useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const navigation = useNavigation();
  const loadingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start pulsing animation for the loading line
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(loadingAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Timer to navigate to the Login screen
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <LinearGradient colors={['black', 'black']} style={styles.container}>
      <Image
        source={require('../assets/icon.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.loadingContainer}>
        <Animated.View
          style={[
            styles.loadingLine,
            {
              opacity: loadingAnim,
            },
          ]}
        />
      </View>

      <Text style={styles.descriptionText}>
        Welcome to PaySignal - your secure, seamless payment gateway
      </Text>
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
    width: '80%',
    height: '80%',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 120, // Position slightly above the text
    width: '60%',
    height: 4,
    backgroundColor: '#333',
    overflow: 'hidden',
    borderRadius: 2,
  },
  loadingLine: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    transform: [{ scaleX: 0.5 }],
    opacity: 0.8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20, // Move closer to the loading animation
    paddingHorizontal: 20,
  },
});
