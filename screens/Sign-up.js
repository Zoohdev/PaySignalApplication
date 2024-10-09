import { View, Text, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: 'black', height, width }}>
      <StatusBar style="light" />
      <Image style={{ height, width, position: 'absolute' }} source={require("../assets/image.jpg")} />
      
      {/* Title and Form */}
      <View style={{ height, width, justifyContent: 'space-around', paddingTop: height * 0.1, paddingBottom: 10 }}>
        {/* Title */}
        <View style={{ alignItems: 'center' }}>
          <Animated.Text entering={FadeInUp.duration(1000).springify()} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: height * 0.06 }}>
            SignUp
          </Animated.Text>
        </View>
      
        {/* Form */}
        <View style={{ alignItems: 'center', marginHorizontal: 16 }}>
        <Animated.View entering={FadeInDown.duration(1000).springify()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 15, borderRadius: 10, width: '90%', marginBottom: 16 }}>
            <TextInput placeholder="Username" placeholderTextColor={"white"} style={{ height: 40, color: 'gold' }} />
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(1000).springify()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 15, borderRadius: 10, width: '90%', marginBottom: 16 }}>
            <TextInput placeholder="Email" placeholderTextColor={"white"} style={{ height: 40, color: 'gold' }} />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 15, borderRadius: 10, width: '90%', marginBottom: 16 }}>
            <TextInput placeholder="Password" placeholderTextColor={"white"} secureTextEntry style={{ height: 40, color: 'white' }} />
          </Animated.View>
        </View>
        
        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={{ alignItems: 'center', width: '100%' }}>
          <TouchableOpacity style={{ width: '90%', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 12, marginHorizontal: 'auto' }}>
            <Text style={{ fontSize: height * 0.025, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
              SignUp
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: 'white' }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push('Login')}>
            <Text style={{ color: '#FFD700' }}> Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
