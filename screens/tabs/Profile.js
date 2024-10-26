import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput, ScrollView, Switch } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const navigation = useNavigation();

  const handleImagePress = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
    }
  };

  const toggleFingerprint = () => setFingerprintEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Arrow Button next to Profile Settings */}
        <TouchableOpacity style={styles.arrowButton} onPress={() => navigation.goBack()}>
        <Svg
      fill={"#000000"} // Default fill color
      height={"20px"} // Default height
      width={"20px"} // Default width
      viewBox="0 0 330 330" // ViewBox as defined in your SVG
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M315,150H105V90c0-6.067-3.655-11.537-9.26-13.858c-5.606-2.322-12.058-1.038-16.347,3.252l-75,75
        c-5.858,5.858-5.858,15.355,0,21.213l75,75c2.87,2.87,6.705,4.394,10.61,4.394c1.932,0,3.881-0.374,5.737-1.142
        c5.605-2.322,9.26-7.791,9.26-13.858v-60h210c8.284,0,15-6.716,15-15C330,156.716,323.284,150,315,150z M75,203.787L36.213,165
        L75,126.213V203.787z"
      />
    </Svg>
        </TouchableOpacity>
        <Text style={styles.text}>Profile Settings</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.subText}>Your Profile Information</Text>

        <TouchableOpacity style={styles.imageContainer} onPress={handleImagePress}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.image}
            />
          ) : (
            <Text style={styles.chooseImageText}>Choose an Image</Text>
          )}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder="First Name" placeholderTextColor="gray" />
          <TextInput style={styles.textInput} placeholder="Last Name" placeholderTextColor="gray" />
          <TextInput style={styles.textInput} placeholder="Email" placeholderTextColor="gray" />
          <TextInput style={styles.textInput} placeholder="Phone Number" placeholderTextColor="gray" />
        </View>

        <Text style={styles.securityText}>Security</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder="Password" placeholderTextColor="gray" secureTextEntry />
          <TextInput style={styles.textInput} placeholder="Confirm Password" placeholderTextColor="gray" secureTextEntry />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Fingerprint</Text>
          <Switch
            value={fingerprintEnabled}
            onValueChange={toggleFingerprint}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={fingerprintEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a2b37',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    marginBottom: 10, // Space below the header
    marginTop:20,

  },
  arrowButton: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 10,
    marginRight: 10, // Space between button and text
  },
  arrowText: {
    color: 'white',
    fontSize: 30,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  subText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 70,
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    width: 150,
    height: 150,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  chooseImageText: {
    color: 'white',
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
    justifyContent: 'flex-start',
    paddingLeft: 110,
  },
  toggleLabel: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  securityText: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
});

export default Profile;
