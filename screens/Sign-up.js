import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, Dimensions, ImageBackground, Animated } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const Signup = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1); // Step state to control which fields are visible
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [otp, setOtp] = useState(''); // State for OTP
  const [loading, setLoading] = useState(false);
  const [isOtpSubmitting, setIsOtpSubmitting] = useState(false);  // New state for OTP submission


  // Animated values for fields
  const fadeAnim1 = useState(new Animated.Value(0))[0];
  const fadeAnim2 = useState(new Animated.Value(0))[0];
  const fadeAnim3 = useState(new Animated.Value(0))[0];
  const fadeAnimOtp = useState(new Animated.Value(0))[0]; // Animation for OTP box

  const handleRegister = async () => {
    // Ensure all fields are filled out
    if (!username || !email || !password || !firstname || !lastname || !phoneNumber || !dateOfBirth || !country) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.0.175:8000/api/users/register/', {
        username,
        email,
        password,
        firstname,
        middlename,
        lastname,
        phone_number: phoneNumber,  // Ensure the backend field matches
        date_of_birth: dateOfBirth, // Ensure the backend field matches
        country,
      });

      console.log('Response:', response);

      if (response.status === 201) {
        Alert.alert('Success', 'User registered successfully. Please enter OTP to verify.');
        setStep(4); // Show OTP box after successful registration
        Animated.timing(fadeAnimOtp, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      if (error.response) {
        const errorMsg = error.response.data.message || error.response.data.detail || 'Unknown error';
        Alert.alert('Error', errorMsg);
      } else {
        Alert.alert('Error', 'Failed to connect to the server');
      }
    }
  };

  // Handle OTP verification
  // Handle OTP verification
  const handleOtpSubmit = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
  
    setIsOtpSubmitting(true); // Start showing "Processing..."
    try {
      const response = await axios.post('http://192.168.0.175:8000/api/users/verify-email/', {
        email,
        otp,
      });
  
      if (response.status === 200) {
        Alert.alert('Success', 'OTP verified successfully');
        navigation.navigate('Login'); // Navigate to the login screen
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP');
    } finally {
      setIsOtpSubmitting(false); // Reset back to "Submit OTP"
    }
  };
  


  // Handle the step transition (Next Fields)
  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1); // Move to next step
  };

  useEffect(() => {
    // Fade-in animations based on step
    if (step === 1) {
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else if (step === 2) {
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else if (step === 3) {
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else if (step === 4) {
      Animated.timing(fadeAnimOtp, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [step]);

  return (
    <ImageBackground 
      source={require('../assets/image.jpg')} 
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.overlay}>
        <Text style={styles.title}>Join Us</Text>

        {/* Step 1: First three fields */}
        {step === 1 && (
          <Animated.View style={[styles.inputContainer, { opacity: fadeAnim1 }]}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#fff"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#fff"
              value={firstname}
              onChangeText={setFirstname}
            />
            <TextInput
              style={styles.input}
              placeholder="Middle Name"
              placeholderTextColor="#fff"
              value={middlename}
              onChangeText={setMiddlename}
            />
          </Animated.View>
        )}

        {/* Step 2: Next three fields */}
        {step === 2 && (
          <Animated.View style={[styles.inputContainer, { opacity: fadeAnim2 }]}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="#fff"
              value={lastname}
              onChangeText={setLastname}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#fff"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#fff"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </Animated.View>
        )}

        {/* Step 3: Last three fields */}
        {step === 3 && (
          <Animated.View style={[styles.inputContainer, { opacity: fadeAnim3 }]}>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD)"
              placeholderTextColor="#fff"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              placeholderTextColor="#fff"
              value={country}
              onChangeText={setCountry}
            />
          </Animated.View>
        )}

        {/* Step 4: OTP Input */}
        {step === 4 && (
          <Animated.View style={[styles.inputContainer, { opacity: fadeAnimOtp }]}>
            <TextInput
              style={[styles.input, styles.otpInput]}
              placeholder="Enter OTP"
              placeholderTextColor="#fff"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
            />
          </Animated.View>
        )}

        {/* Submit or Next Button */}
        <TouchableOpacity 
          onPress={step === 4 ? handleOtpSubmit : step === 3 ? handleRegister : handleNextStep} 
          style={styles.signupButton} 
          disabled={loading}
        >
          <Text style={styles.signupText}>
            {loading ? 'Processing...' : step === 4 ? 'Submit OTP' : step === 3 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push('Login')}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent overlay for readability
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: height * 0.07,
    color: '#FFA500',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 30,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  input: {
    height: 55,
    backgroundColor: 'black', // Black background for the input fields
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
  },
  otpInput: {
    backgroundColor: 'black', // Orange background for OTP
    color: '#fff',
  },
  signupButton: {
    width: '90%',
    backgroundColor: '#fff',
    paddingVertical: 12,
    marginVertical: 12,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  signupText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
  loginLink: {
    color: '#FFA500',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Signup;
