import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const UserAuth = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const validUsername = 'Ethan';
    const validPassword = '1234';

    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Required Fields', 'Please enter your username and password.');
      return;
    }

    if (username === validUsername && password === validPassword) {
      navigation.navigate('MyProfile');
    } else {
      Alert.alert('Invalid Credentials', 'Please check your username and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Authentication</Text>
      <Text style={styles.subtitle}>
        Please enter your credentials to access your account securely.
      </Text>

      <TextInput
        placeholder="Username *"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password *"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.securityContainer}>
        <Text style={styles.securityText}>
          Your credentials are secure and encrypted.
        </Text>
      </View>
    </View>
  );
};

export default UserAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#FF8C00',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
    color: '#000',
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#FF8C00',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  securityContainer: {
    position: 'absolute',
    bottom: 20, // Position at the bottom of the screen
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  securityText: {
    fontSize: 12,
    color: '#888',
  },
  loginButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
