import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

export default function SignUp() {
  const navigation = useNavigation();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    // Validation checks
    if (username.trim().length === 0) {
      Alert.alert("Invalid Username", "Please enter a username.");
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

    // If everything is valid, proceed with signup
    console.log("Username: ", username);
    console.log("Email: ", email);
    console.log("Password: ", password);

    // Navigate to the home screen (or to a different screen)
    navigation.navigate("Login"); // Make sure the screen name matches in your Stack.Navigator
  };

  return (
    <View style={{ backgroundColor: 'black', height, width }}>
      <StatusBar style="light" />
      <Image style={{ height, width, position: 'absolute' }} source={require("../assets/image.jpg")} />
      
      {/* Title and Form */}
      <View style={{ height, width, justifyContent: 'space-around', paddingTop: height * 0.1, paddingBottom: 10 }}>
        {/* Title */}
        <View style={{ alignItems: 'center' ,color: "#FFD700"}}>
          <Animated.Text entering={FadeInUp.duration(1000).springify()} style={{ color: '#ffa500', fontWeight: 'bold', letterSpacing: 1, fontSize: height * 0.06 }}>
            Join Us
          </Animated.Text>
        </View>
      
        {/* Form */}
        <View style={{ alignItems: 'center', marginHorizontal: 16 }}>
          <Animated.View entering={FadeInDown.duration(1000).springify()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 15, borderRadius: 10, width: '90%', marginBottom: 16 }}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={"white"}
              style={{ height: 40, color: 'white' }}
              value={username}
              onChangeText={setUsername}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(1000).springify()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 15, borderRadius: 10, width: '90%', marginBottom: 16 }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={"white"}
              style={{ height: 40, color: 'white' }}
              value={email}
              onChangeText={setEmail}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 15, borderRadius: 10, width: '90%', marginBottom: 16 }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={"white"}
              secureTextEntry
              style={{ height: 40, color: 'white' }}
              value={password}
              onChangeText={setPassword}
            />
          </Animated.View>
        </View>
        
        {/* SignUp Button */}
        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={{ alignItems: 'center', width: '100%' }}>
          <TouchableOpacity onPress={handleSignUp} style={{ width: '90%', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 12, marginHorizontal: 'auto' }}>
            <Text style={{ fontSize: height * 0.025, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
              SignUp
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Navigate to Login screen */}
        <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: 'white' }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push('Login')}>
            <Text style={{ color: '#ffa500' }}> Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
