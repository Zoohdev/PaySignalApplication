import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SvgComponent from './svg';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Add navigation hook
import { StatusBar } from 'react-native';



const All = () => {
  const Number = "IBAn123456789"; // Placeholder for actual Number
  const amount = "R12345"; // Placeholder for actual amounts
  const [dropdownVisible, setDropdownVisible] = useState(false);
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
        barStyle="light-content" 
        backgroundColor="#2a2b37" 
      />
      <View style={[styles.container, styles.overview]}>
        <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("BusinessAccount")}
        >
          <Svg height={scale(18)} width={scale(18)} viewBox="0 0 32 32">
            <Circle cx="8" cy="8" r="4" fill={"orange"} />
            <Circle cx="24" cy="8" r="4" fill={"orange"} />
            <Circle cx="8" cy="24" r="4" fill={"orange"} />
            <Circle cx="24" cy="24" r="4" fill={"orange"} />
          </Svg>
        </TouchableOpacity>
        </View>
        <Text style={styles.boxTwo}>OverView</Text>
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
      <Text style={styles.dropdownText}>AddCard</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.dropdownOption} onPress={() => handleDropdownOption('Exchange')}>
      <Text style={styles.dropdownText}>Exchange</Text>
    </TouchableOpacity>
  </View>
)}

        </View>
      </View>

      {/* Account text above new section */}
  

      {/* Scrollable section for Accounts */}
      <View style={styles.fixedActionButtonContainer}>
      {/* Button with the two SVGs */}
      <View style={styles.fixedActionButton}>
      {/* SVG on the left with navigation */}
      <TouchableOpacity
        style={styles.svgContainer}
        onPress={() => console.log("pushed one")} // Adjust to your stack screen name
      >
        <SvgComponent />
      </TouchableOpacity>

      {/* SVG inside the button with navigation */}
      <TouchableOpacity
        onPress={() => navigation.navigate('BusinessAccount')} // Adjust to your stack screen name
      >
        <Svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M31 25C32.3807 25 33.5 23.8807 33.5 22.5C33.5 21.1193 32.3807 20 31 20C29.6193 20 28.5 21.1193 28.5 22.5C28.5 23.8807 29.6193 25 31 25Z"
            stroke="#E2C792"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M23 19C24.3807 19 25.5 17.8807 25.5 16.5C25.5 15.1193 24.3807 14 23 14C21.6193 14 20.5 15.1193 20.5 16.5C20.5 17.8807 21.6193 19 23 19Z"
            stroke="#E2C792"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M28 30.4998C28 30.4998 32.22 28.7498 33.71 28.4998C34.95 28.2898 35.75 28.8398 36.23 29.2498C36.81 29.7398 36.63 30.6898 35.91 30.9498L24.11 35.1998C23.24 35.5098 22.29 35.4698 21.46 35.0798L14.58 31.8598C14.23 31.6998 14 31.3398 14 30.9498V25.5399C14 24.9499 14.51 24.4899 15.1 24.5399C16.24 24.6499 17.8 25.0398 20 26.4998H20.17H24.37C26.73 26.4998 28 28.2898 28 30.4998ZM28 30.4998H27.64H20"
            stroke="#E2C792"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
    </View>
    </View>
      <ScrollView contentContainerStyle={[styles.scrollableContainer, { paddingBottom: scale(50) }]}>
  {/* Accounts Text inside ScrollView */}
  <View style={styles.accountTextContainer}>
    <Text style={styles.accountText}>Accounts</Text>
    <Text style={styles.currency}>Eur</Text>
  </View>
 
  
  {/* New Section for Account */}
  {['Personal Account', 'Business Account'].map((cardName, index) => (
    <View style={styles.newSection} key={index}>
      <View style={styles.accountContainer}>
        <Svg style={styles.icon} height={scale(25)} width={scale(25)} viewBox="0 0 487.6 487.6">
          <Path d="M460.3,216.55h-11.6v-69.7c0-28.5-23.2-51.6-51.6-51.6h-10.7l0.1-25.9c0-19.2-15.6-34.8-34.8-34.8H42.3c-23.1,0-42,18.6-42.3,41.7c0,0.2,0,0.4,0,0.6v341.4c0,19.2,15.6,34.8,34.8,34.8h362.4c28.5,0,51.6-23.2,51.6-51.6v-69.8h11.6c15,0,27.2-12.2,27.2-27.2v-60.7C487.5,228.75,475.3,216.55,460.3,216.55z M42.3,58.55h309.4c5.9,0,10.8,4.8,10.8,10.7l-0.1,26H42.3c-10.1,0-18.3-8.2-18.3-18.3S32.2,58.55,42.3,58.55z M424.7,401.35c0,15.2-12.4,27.6-27.6,27.6H34.7c-5.9,0-10.8-4.8-10.8-10.8v-303.1c5.6,2.7,11.8,4.2,18.4,4.2h354.8c15.2,0,27.6,12.4,27.6,27.6v69.7h-81.9c-15,0-27.2,12.2-27.2,27.2v60.7c0,15,12.2,27.2,27.2,27.2h81.9V401.35z M463.5,304.45c0,1.8-1.4,3.2-3.2,3.2H342.9c-1.8,0-3.2-1.4-3.2-3.2v-60.7c0-1.7,1.4-3.2,3.2-3.2h117.4c1.7,0,3.2,1.4,3.2,3.2L463.5,304.45z" />
        </Svg>
        <View style={styles.accountDetails}>
          <Text style={styles.card}>{cardName}</Text>
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
  <View style={styles.accountTextContainer}>
        <Text style={styles.accountText}>Cards</Text>
      </View>

      {/* New Section for Account */}
      {['Prepaid Card', 'Debit Card', 'Business Credit Card'].map((cardName, index) => (
  <View style={styles.newSection} key={index}>
    <TouchableOpacity onPress={() => navigation.navigate('CardDetails')} style={styles.accountContainer}>
      <Svg style={styles.icon} height={scale(25)} width={scale(25)} viewBox="0 0 487.6 487.6">
        <Path d="M440,80H48c-22.1,0-40,17.9-40,40v247.2c0,22.1,17.9,40,40,40h392c22.1,0,40-17.9,40-40V120C480,97.9,462.1,80,440,80z
          M48,100h392c11.1,0,20,8.9,20,20v40H28v-40C28,108.9,36.9,100,48,100z M440,368H48c-11.1,0-20-8.9-20-20V240h432v108
          C460,359.1,451.1,368,440,368z M100,320h120c11,0,20-9,20-20s-9-20-20-20H100c-11,0-20,9-20,20S89,320,100,320z M340,320h48c11,0,20-9,20-20s-9-20-20-20h-48c-11,0-20,9-20,20S329,320,340,320z"/>
      </Svg>
      <View style={styles.accountDetails}>
        <Text style={styles.card}>{cardName}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </TouchableOpacity>

    {/* Conditionally render ID number based on card type */}
    <View style={styles.leftAlign}>
      <Text style={styles.idNum}>
        {cardName === 'Debit Card' ? 'Personal Account' : Number}
      </Text>
    </View>
  </View>
))}
      <View style={styles.accountTextContainer}>
        <Text style={styles.accountText}>Cards</Text>
      </View>

      {/* New Section for Account */}
      {['House', 'Holiday Trip', 'Motorcycle'].map((cardName, index) => (
        <View style={styles.newSection} key={index}>
          <View style={styles.accountContainer}>
            <Svg style={styles.icon} height={scale(25)} width={scale(25)} viewBox="0 0 487.6 487.6">
              <Path d="M460.3,216.55h-11.6v-69.7c0-28.5-23.2-51.6-51.6-51.6h-10.7l0.1-25.9c0-19.2-15.6-34.8-34.8-34.8H42.3c-23.1,0-42,18.6-42.3,41.7c0,0.2,0,0.4,0,0.6v341.4c0,19.2,15.6,34.8,34.8,34.8h362.4c28.5,0,51.6-23.2,51.6-51.6v-69.8h11.6c15,0,27.2-12.2,27.2-27.2v-60.7C487.5,228.75,475.3,216.55,460.3,216.55z M42.3,58.55h309.4c5.9,0,10.8,4.8,10.8,10.7l-0.1,26H42.3c-10.1,0-18.3-8.2-18.3-18.3S32.2,58.55,42.3,58.55z M424.7,401.35c0,15.2-12.4,27.6-27.6,27.6H34.7c-5.9,0-10.8-4.8-10.8-10.8v-303.1c5.6,2.7,11.8,4.2,18.4,4.2h354.8c15.2,0,27.6,12.4,27.6,27.6v69.7h-81.9c-15,0-27.2,12.2-27.2,27.2v60.7c0,15,12.2,27.2,27.2,27.2h81.9V401.35z M463.5,304.45c0,1.8-1.4,3.2-3.2,3.2H342.9c-1.8,0-3.2-1.4-3.2-3.2v-60.7c0-1.7,1.4-3.2,3.2-3.2h117.4c1.7,0,3.2,1.4,3.2,3.2L463.5,304.45z" />
            </Svg>
            <View style={styles.accountDetails}>
              <Text style={styles.card}>{cardName}</Text>
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
      
</ScrollView>
    </View>
  );s
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: scale(0),
    flex: 1,
  },
  
  fixedActionButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',  // Aligns the button to the right
    position: 'absolute',
    top: 250,    // Fixes the position
    right: 0,    // Adjust the space from the right-
    zIndex: 100,
  },

  fixedActionButton: {
    backgroundColor: '#2a2b37',
    flexDirection: 'row',  // Aligns the content horizontally (SVG on left, content on right)
    alignItems: 'center',  // Centers items vertically in the row
    paddingVertical: 5,
    paddingHorizontal: 20,  // Adjusted padding for the button width
    borderTopLeftRadius: 50,  // Rounded only the top-left corner
    borderBottomLeftRadius: 50, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  svgContainer: {
    paddingRight: 10,  // Adds spacing between the left SVG and button content
 zIndex:1
  },

  buttonContent: {
    flexDirection: 'row',  // To place content on the right of the button
    alignItems: 'center',
    zIndex:1
    
  },

  accountTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: verticalScale(5),
    zIndex:1

  },

  accountText: {
    color: 'orange',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    zIndex:1

  },

  currencyCode: {
    color: 'orange',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginLeft: scale(5),
    zIndex:1

  },

  currency: {
    color: 'orange',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginLeft: scale(200), // Adds spacing between "Accounts" and "EUR"
    zIndex:1

  },
  accountTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: verticalScale(5),
    zIndex:1

  },

  accountText: {
    color: 'orange',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    zIndex:1

  },

  currencyCode: {
    color: 'orange',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginLeft: scale(5),
    zIndex:1

  },
  currency: {
    color: 'orange',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginLeft: scale(200), // Adds spacing between "Accounts" and "EUR"
    zIndex:1

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
    zIndex:1

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
  scrollableContainer: {
    flexGrow: 1, // Ensures ScrollView takes all available space
  },
  newSection: {
    paddingVertical: verticalScale(25),
    paddingHorizontal: scale(15),
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  icon: {
    width: scale(25),
    height: scale(25),
    marginLeft: scale(10),
  },
  accountDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: scale(5),
    flex: 1,
  },
  card: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    flexShrink: 1, // Ensures text doesn't overflow
    maxWidth: '60%', // Limits card name width
  },
  amount: {
    fontSize: moderateScale(14),
    color: 'gray',
    marginLeft: scale(10),
    flexShrink: 1, // Prevents overflow
  },
  idNum: {
    fontSize: moderateScale(14),
    color: 'gray',
    marginTop: verticalScale(5),
    marginLeft: scale(20),
    flexWrap: 'wrap',
  },
  leftAlign: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: verticalScale(5),
    marginLeft: scale(20),
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

export default All;
