import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native'; // Add navigation hook

const List = () => {
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
      <Text style={styles.dropdownText}>Add Card</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.dropdownOption} onPress={() => handleDropdownOption('Exchange')}>
      <Text style={styles.dropdownText}>Exchange</Text>
    </TouchableOpacity>
  </View>
)}

        </View>
      </View>

      {/* Account text above new section */}
      <View style={styles.accountTextContainer}>
        <Text style={styles.accountText}>Accounts</Text>
      </View>

      {/* New Section for Account */}
      {['Prepaid Card', 'Debit Card','Business Credit Card'].map((cardName, index) => (
        <View style={styles.newSection} key={index}>
          <View style={styles.accountContainer}>
          <Svg style={styles.icon} height={scale(25)} width={scale(25)} viewBox="0 0 487.6 487.6">
  <Path d="M440,80H48c-22.1,0-40,17.9-40,40v247.2c0,22.1,17.9,40,40,40h392c22.1,0,40-17.9,40-40V120C480,97.9,462.1,80,440,80z
    M48,100h392c11.1,0,20,8.9,20,20v40H28v-40C28,108.9,36.9,100,48,100z M440,368H48c-11.1,0-20-8.9-20-20V240h432v108
    C460,359.1,451.1,368,440,368z M100,320h120c11,0,20-9,20-20s-9-20-20-20H100c-11,0-20,9-20,20S89,320,100,320z M340,320h48c11,0,20-9,20-20s-9-20-20-20h-48c-11,0-20,9-20,20S329,320,340,320z"/>
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
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
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

export default List;
