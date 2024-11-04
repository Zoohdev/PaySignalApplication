import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';

import Svg, { Circle, Path } from 'react-native-svg';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native'; // Add navigation hook
import { StatusBar } from 'react-native';

const CardDetails = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const Number = "IBAn123456789"; // Placeholder for actual Number
  const amount = "R12345"; // Placeholder for actual amounts

  const navigation = useNavigation(); // React Navigation hook for navigation

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Handler for navigating to different screens
  const handleDropdownOption = (option) => {
    setDropdownVisible(false); // Close the dropdown
    navigation.navigate(option); // Navigate to corresponding screen
  };

  return (

    <View style={styles.outerContainer}>
 <StatusBar
        barStyle="light" // This sets the icons to white
        backgroundColor="transparent" // Background color of the status bar
      />

   
      <View style={[styles.container, styles.overview]}>
        <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={() => navigation.goBack()}>
        <Svg
      fill={"#fff"} // Default fill color
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
        </View>
        <Text style={styles.boxTwo}>Card Details</Text>
        <View style={styles.dropdownIconContainer}>
          <TouchableOpacity onPress={toggleDropdown}>
            <Svg height={scale(25)} width={scale(25)} viewBox="0 0 32 32">
              <Path d="M4,8 L28,8 M10,16 L22,16" stroke="orange" strokeWidth="2" strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>

          {/* Dropdown Options */}
          {dropdownVisible && (
  <View style={styles.dropdown}>
    <TouchableOpacity style={styles.dropdownOption} onPress={() => handleDropdownOption('Profile')}>
      <Text style={styles.dropdownText}>Profile</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.dropdownOption} onPress={() => handleDropdownOption('addCard')}>
      <Text style={styles.dropdownText}>Add Card</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.dropdownOption} onPress={() => handleDropdownOption('Exchange')}>
      <Text style={styles.dropdownText}>Exchange</Text>
    </TouchableOpacity>
  </View>
)}

        </View>
      </View>
    <ScrollView>


      {/* Account text above new section */}
      <View style={styles.accountTextContainer}>
        <Text style={styles.accountText}>Cards</Text>
      </View>

      {/* New Section for Account */}
      {['Debit Card'].map((cardName, index) => (
  <View style={styles.newSection} key={index}>
    <View style={styles.accountContainer}>
      <Svg style={styles.icon} height={scale(25)} width={scale(25)} viewBox="0 0 487.6 487.6">
        <Path 
          fill="white"  // Set fill color to white for the SVG path
          d="M460.3,216.55h-11.6v-69.7c0-28.5-23.2-51.6-51.6-51.6h-10.7l0.1-25.9c0-19.2-15.6-34.8-34.8-34.8H42.3c-23.1,0-42,18.6-42.3,41.7c0,0.2,0,0.4,0,0.6v341.4c0,19.2,15.6,34.8,34.8,34.8h362.4c28.5,0,51.6-23.2,51.6-51.6v-69.8h11.6c15,0,27.2-12.2,27.2-27.2v-60.7C487.5,228.75,475.3,216.55,460.3,216.55z M42.3,58.55h309.4c5.9,0,10.8,4.8,10.8,10.7l-0.1,26H42.3c-10.1,0-18.3-8.2-18.3-18.3S32.2,58.55,42.3,58.55z M424.7,401.35c0,15.2-12.4,27.6-27.6,27.6H34.7c-5.9,0-10.8-4.8-10.8-10.8v-303.1c5.6,2.7,11.8,4.2,18.4,4.2h354.8c15.2,0,27.6,12.4,27.6,27.6v69.7h-81.9c-15,0-27.2,12.2-27.2,27.2v60.7c0,15,12.2,27.2,27.2,27.2h81.9V401.35z M463.5,304.45c0,1.8-1.4,3.2-3.2,3.2H342.9c-1.8,0-3.2-1.4-3.2-3.2v-60.7c0-1.7,1.4-3.2,3.2-3.2h117.4c1.7,0,3.2,1.4,3.2,3.2L463.5,304.45z" 
        />
      </Svg>
      <View style={styles.accountDetails}>
        <Text style={[styles.card, { color: "white" }]}>{cardName}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </View>

    {/* Conditionally render ID number based on card type */}
    <View style={styles.leftAlign}>
      <Text style={styles.idNum}>
        {cardName === 'Debit Card' ? 'Personal Account' : Number}
      </Text>
    </View>
  </View>

  
))}

<View style={styles.imageContainer}>
          <Image
            source={require('./bankcard.png')} // Replace with your actual PNG path
            style={styles.image}
          />
        </View>
        {['Debit Card'].map((cardName, index) => (
  <View style={styles.newSection} key={index}>
    <View style={styles.accountContainer}>
      
      
    </View>

   

    {/* New Details Section placed underneath */}
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsText}>Details</Text>
      <Text style={styles.numberText}>Number: <Text style={styles.numberValue}>{Number}</Text></Text>
      <Text style={styles.numberText}>Expiration Date: <Text style={styles.numberValue}>05 - 202</Text></Text>
      <Text style={styles.numberText}>CCV: <Text style={styles.numberValue}>123</Text></Text>
    </View>
    <View style={styles.centeredContainer}>
      <Svg
        width={100}
        height={100}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M25 37a7 7 0 100-14 7 7 0 000 14z"
          stroke="#E2C792"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M20 25.11V19c0-2.76 2.24-5 5-5 1.38 0 2.63.56 3.54 1.46.9.91 1.46 2.16 1.46 3.54v6.11M25 30v2"
          stroke="#E2C792"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M26 29a1 1 0 11-2 0 1 1 0 012 0z" stroke="#E2C792" />
      </Svg>
      <Text style={{color:"orange",padding:20}}>LOCK CARD</Text>
    </View>
  </View>
  
  
))}
<View style={styles.iconBlock}>
  {/* First Icon */}
  <Svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M28 19.02h-7l-2-5c1 0 2 0 3 1 .45-.57 1-1 2.5-1.02 1.5.02 2.01.33 2.5 1.02 1-1 2-1 3-1l-2 5zM28 19.02h-7c-2 2-5 5.51-5 9 0 4.8 3.76 8.71 8.5 8.97 4.74-.26 8.5-4.17 8.5-8.97 0-3.49-3-7-5-9z"
        stroke="#E2C792"
        strokeMiterlimit={10}
      />
      <Path
        d="M22.1 25.52c0-1.33 1.07-2.4 2.4-2.4 1.33 0 2.4 1.07 2.4 2.4M26.9 29.52c0 1.33-1.07 2.4-2.4 2.4-1.33 0-2.4-1.07-2.4-2.4M22.1 25.52c0 1.6.82 2 2.4 2 1.44 0 2.4.4 2.4 2"
        stroke="#E2C792"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>

  {/* Second Icon */}
  <Svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M24.5 37C30.851 37 36 31.851 36 25.5S30.851 14 24.5 14 13 19.149 13 25.5 18.149 37 24.5 37zM15.5 25.5a9 9 0 0118 0M24.5 21v5"
        stroke="#E2C792"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.5 29a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        stroke="#E2C792"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  {/* Third Icon */}
  <Svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M25 14c-3 2-6 3-9 2v11c0 4 6 7 9 10 3-3 9-6 9-10V16c-3 1-6 0-9-2z"
        stroke="#E2C792"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
</View>



</ScrollView>

    </View>
    
    
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor:"#1a1b23",
    color:"white",
  },
  iconBlock: {
  flexDirection: 'row',
  justifyContent: 'space-around', // Distributes icons evenly with space around
  paddingHorizontal: 10, // Adds 10px padding on left and right
  height: 70, // Sets height to 100px
  alignItems: 'center', // Centers icons vertically within the block
  backgroundColor: '#2a2b37', // Sets background color to white
  margin:10

},


  
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(20),
    backgroundColor: "#2a2b37",
    width: '100%',
    paddingHorizontal: scale(10), // Adjusted to shift content more to the left
    paddingVertical: scale(15),
  },
  centeredContainer: {
  alignItems: 'center', // Center horizontally
  justifyContent: 'center', // Center vertically
  marginVertical: scale(20), // Adjust vertical margin as needed
},
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxTwo: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: 'orange',
  },
  newSection: {
    paddingVertical: scale(25),
    paddingHorizontal: scale(15),
  },
  imageContainer: {
    marginTop: 0,
    width: '100%',  // Use full width of the container
    height: 250,    // Increase height as needed
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  detailsContainer: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
  },
  detailsText: {
    fontSize: moderateScale(18),
    color: 'white',
    fontWeight: 'bold',
  },
  numberText: {
    fontSize: moderateScale(16),
    marginVertical:scale(15),
    color: 'gold', // Gold color for the label
  },
  numberValue: {
    color: 'white', // Keep the number itself white
  },
  image: {
    width: '100%',    // Ensure the image fills the width
    height: '100%',   // Ensure the image fills the height
    resizeMode: 'contain', // Ensures the image fits within the container without distortion
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    color:"white",

  },
  icon: {
    width: scale(25),
    height: scale(25),
    marginLeft: scale(10),
    color:"white",
  },
  accountDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: scale(5),
    flex: 1,
    color:"white",
  },
  card: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    flexShrink: 1, // Ensures text doesn't overflow
    maxWidth: '60%', // Limits card name width
  },
  arrowButton: {
    borderRadius: 10,
    padding: 10,
    marginRight: 10, // Space between button and text
  },
  arrowText: {
    color: 'orange',
    fontSize: 30,
  },
  amount: {
    fontSize: moderateScale(20),
    color: 'white',
    marginLeft: scale(10),
    flexShrink: 1, // Prevents overflow
  },
  idNum: {
    fontSize: moderateScale(14),
    color:"white",

    marginTop: verticalScale(5),
    marginLeft: scale(20),
    flexWrap: 'wrap',
  },
  leftAlign: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: verticalScale(5),
    marginLeft: scale(20),
    color:"white",

  },
  accountTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: verticalScale(5),
  },
  accountText: {
    color: 'orange',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },


  dropdown: {
    position: 'absolute',
    top: verticalScale(30), // Position it below the dropdown icon
    right: -10, // Align with the dropdown icon's right
    backgroundColor: '#2a2b37',
    padding: scale(15),
    paddingBottom: 0,
    width: scale(150), // Increase width if necessary
    zIndex: 999, // Ensure it's above other elements
    borderLeftWidth: scale(2), // Set left border width
    borderLeftColor: 'orange', // Set left border color
    borderTopLeftRadius: scale(10), // Top left corner radius
    borderBottomLeftRadius: scale(10), // Bottom left corner radius
  },
  dropdownText: {
    fontSize: moderateScale(22),
    color: 'white',
    paddingVertical: verticalScale(5),
    textAlign: 'right',
    marginBottom: 10, // Ensures full-width
  },
});

export default CardDetails;
