import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native"; // Add navigation hook

const Overview = () => {
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
        <Text style={styles.boxTwo}>OverView</Text>
        <View style={styles.dropdownIconContainer}>
          <TouchableOpacity onPress={toggleDropdown}>
            <Svg height={scale(25)} width={scale(25)} viewBox="0 0 32 32">
              <Path
                d="M4,8 L28,8 M10,16 L22,16"
                stroke="orange"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* Dropdown Options */}
          {dropdownVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => handleDropdownOption("Profile")}
              >
                <Text style={styles.dropdownText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => handleDropdownOption("addCard")}
              >
                <Text style={styles.dropdownText}>Add Card</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => handleDropdownOption("Exchange")}
              >
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
      {["Business Account", "Personal Account"].map((cardName, index) => (
        <View style={styles.newSection} key={index}>
          <View style={styles.accountContainer}>
            <Svg
              style={styles.icon}
              height={scale(25)}
              width={scale(25)}
              viewBox="0 0 487.6 487.6"
            >
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
              {cardName === "Debit Card" ? "Personal Account" : Number}
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
    width: "100%",
    paddingHorizontal: scale(10), // Adjusted to shift content more to the left
    paddingVertical: scale(15),
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxTwo: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "orange",
  },
  newSection: {
    paddingVertical: scale(25),
    paddingHorizontal: scale(15),
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  icon: {
    width: scale(25),
    height: scale(25),
    marginLeft: scale(10),
  },
  accountDetails: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft: scale(5),
    flex: 1,
  },
  card: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    flexShrink: 1, // Ensures text doesn't overflow
    maxWidth: "60%", // Limits card name width
  },
  amount: {
    fontSize: moderateScale(14),
    color: "gray",
    marginLeft: scale(10),
    flexShrink: 1, // Prevents overflow
  },
  idNum: {
    fontSize: moderateScale(14),
    color: "gray",
    marginTop: verticalScale(5),
    marginLeft: scale(20),
    flexWrap: "wrap",
  },
  leftAlign: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: verticalScale(5),
    marginLeft: scale(20),
  },
  accountTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: verticalScale(5),
  },
  accountText: {
    color: "orange",
    fontSize: moderateScale(18),
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    top: verticalScale(30), // Position it below the dropdown icon
    right: -10, // Align with the dropdown icon's right
    backgroundColor: "#2a2b37",
    padding: scale(15),
    paddingBottom: 0,
    width: scale(150), // Increase width if necessary
    zIndex: 999, // Ensure it's above other elements
    borderLeftWidth: scale(2), // Set left border width
    borderLeftColor: "orange", // Set left border color
    borderTopLeftRadius: scale(10), // Top left corner radius
    borderBottomLeftRadius: scale(10), // Bottom left corner radius
  },
  dropdownText: {
    fontSize: moderateScale(22),
    color: "white",
    paddingVertical: verticalScale(5),
    textAlign: "right",
    marginBottom: 10, // Ensures full-width
  },
});

export default Overview;
