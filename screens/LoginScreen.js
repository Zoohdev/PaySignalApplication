import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "./Authcontext";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for eye icon

const { width, height } = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation();

  // State variables to store email, password, and password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); // To toggle password visibility

  // Function to validate the email format
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Function to handle login
  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (password.trim().length === 0) {
      Alert.alert("Invalid Password", "Please enter a password.");
      return;
    }

    console.log("Email: ", email);
    console.log("Password: ", password);

    navigation.navigate("Home");
  };

  // Function to toggle the password visibility
  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={{ backgroundColor: 'black', height, width }}>
      <StatusBar style="light" />
      <Image style={{ height, width, position: 'absolute' }} source={require("../assets/image.jpg")} />
      {/* Lights Images */}
      
      {/* Title and Form */}
      <View style={{ height, width, justifyContent: 'space-around', paddingTop: height * 0.1, paddingBottom: 10 }}>
        {/* Title */}
        <View style={{ alignItems: 'center', color: "#F7A460" }}>
          <Animated.Text entering={FadeInUp.duration(1000).springify()} style={{ color: '#ffa500', fontWeight: 'bold', letterSpacing: 1, fontSize: height * 0.06 }}>
            PaySignal
          </Animated.Text>
        </View>
      
        {/* Form */}
        <View style={{ alignItems: 'center', marginHorizontal: 16 }}>
          <Animated.View entering={FadeInDown.duration(1000).springify()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 15, borderRadius: 10, width: '90%', marginBottom: 16 }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={"white"}
              style={{ height: 40, color: 'white' }}
              value={email}
              onChangeText={setEmail}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 15, borderRadius: 10, width: '90%', marginBottom: 16, flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={"white"}
              secureTextEntry={secureTextEntry} // Bind the password visibility
              style={{ height: 40, color: 'white', flex: 1 }}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={{ padding: 10 }}>
              <Icon name={secureTextEntry ? 'eye-slash' : 'eye'} size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        </View>
        
        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={{ alignItems: 'center', width: '100%' }}>
          <TouchableOpacity style={{ width: '90%', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 12, marginHorizontal: 'auto' }} onPress={handleLogin}>
            <Text style={{ fontSize: height * 0.025, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
              Login
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: 'white' }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push('SignUp')}>
            <Text style={{ color: '#FA7901' }}> Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
