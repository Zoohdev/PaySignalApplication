import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

const AddCard = () => {
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const navigation = useNavigation();

  const toggleFingerprint = () => setFingerprintEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={() => navigation.goBack()}>
          <Svg
            fill={"#000000"}
            height={"20px"}
            width={"20px"}
            viewBox="0 0 330 330"
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
        <Text style={styles.text}>Add Card</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* PNG Image Display */}
        <View style={styles.imageContainer}>
          <Image
            source={require('./bankcard.png')} // Replace with your actual PNG path
            style={styles.image}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder="First Name" placeholderTextColor="gray" />
          <TextInput style={styles.textInput} placeholder="Last Name" placeholderTextColor="gray" />
          <TextInput style={styles.textInput} placeholder="Email" placeholderTextColor="gray" />
          <TextInput style={styles.textInput} placeholder="Phone Number" placeholderTextColor="gray" />
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  arrowButton: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 70,
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 0,
    width: '100%',  // Use full width of the container
    height: 250,    // Increase height as needed
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',    // Ensure the image fills the width
    height: '100%',   // Ensure the image fills the height
    resizeMode: 'contain', // Ensures the image fits within the container without distortion
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    height: 40,
    backgroundColor: '#000',
    color: 'black',
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});

export default AddCard;
