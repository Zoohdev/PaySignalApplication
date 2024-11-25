import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';  // Importing FontAwesome icons
import axios from 'axios';


const { height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);  // State to toggle password visibility

  // Email validation regex
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    if (!email || !username || !password) {
      Alert.alert('Error', 'Please enter email, username, and password');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.0.175:8000/api/users/login/', {
        email,
        username,
        password,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Login successful');

        // Assuming the response includes the user's data (name, username, and email)
        const { name, username, email } = response.data;

        // Navigate to Profile screen, passing the name, username, and email
        navigation.navigate('Home', { name, username, email });
        
      } else {
        Alert.alert('Error', response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.response ? error.response.data.message : 'Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/image.jpg')} // Ensure the path to your image is correct
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.overlay}>
        <Text style={styles.title}>PaySignal</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#fff"
          value={username}
          onChangeText={setUsername}
        />
        
        {/* Password Input with Transparent Background */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, paddingRight: 40 }]}  // Ensure input takes up most space
            placeholder="Password"
            placeholderTextColor="#fff"
            value={password}
            secureTextEntry={secureText}  // Toggle password visibility
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIconContainer}>
            <Icon name={secureText ? 'eye-slash' : 'eye'} size={30} color="#fff" />  {/* Eye icon size increased */}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>Sign Up</Text>
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
  input: {
    height: 55,
    width: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Remove any extra shadow
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    elevation: 0,  // Remove shadow or elevation that may cause the extra piece
    shadowOpacity: 0,  // Remove shadow opacity
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'transparent',  // Set background to transparent
    borderRadius: 10,
    marginBottom: 20,
    position: 'relative',
    elevation: 0,  // Remove shadow or elevation that may cause the extra piece
    shadowOpacity: 0,  // Remove shadow opacity
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: 12,  // Adjust the `top` value to move the eye icon higher
  },
  button: {
    height: 50,
    width: '90%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  footerText: {
    color: 'white',
    fontSize: 16,
  },
  signupText: {
    color: '#FFA500',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
