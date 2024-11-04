import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const Something = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const Number = "IBAn123456789"; // Placeholder for actual Number
  const amount = "R12345"; // Placeholder for actual amounts

  const navigation = useNavigation();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownOption = (option) => {
    setDropdownVisible(false);
    navigation.navigate(option);
  };

  const renderAccountItem = (cardName, index) => (
    <View style={styles.newSection} key={index}>
      <View style={styles.accountContainer}>
        {index === 0 ? (
          <Svg
            style={styles.icon}
            height={scale(25)}
            width={scale(25)}
            viewBox="0 0 487.6 487.6"
          >
            <Path d="M460.3,216.55h-11.6v-69.7c0-28.5-23.2-51.6-51.6-51.6h-10.7l0.1-25.9c0-19.2-15.6-34.8-34.8-34.8H42.3c-23.1,0-42,18.6-42.3,41.7c0,0.2,0,0.4,0,0.6v341.4c0,19.2,15.6,34.8,34.8,34.8h362.4c28.5,0,51.6-23.2,51.6-51.6v-69.8h11.6c15,0,27.2-12.2,27.2-27.2v-60.7C487.5,228.75,475.3,216.55,460.3,216.55z M42.3,58.55h309.4c5.9,0,10.8,4.8,10.8,10.7l-0.1,26H42.3c-10.1,0-18.3-8.2-18.3-18.3S32.2,58.55,42.3,58.55z M424.7,401.35c0,15.2-12.4,27.6-27.6,27.6H34.7c-5.9,0-10.8-4.8-10.8-10.8v-303.1c5.6,2.7,11.8,4.2,18.4,4.2h354.8c15.2,0,27.6,12.4,27.6,27.6v69.7h-81.9c-15,0-27.2,12.2-27.2,27.2v60.7c0,15,12.2,27.2,27.2,27.2h81.9V401.35z M463.5,304.45c0,1.8-1.4,3.2-3.2,3.2H342.9c-1.8,0-3.2-1.4-3.2-3.2v-60.7c0-1.7,1.4-3.2,3.2-3.2h117.4c1.7,0,3.2,1.4,3.2,3.2L463.5,304.45z" />
          </Svg>
        ) : (
          <Svg
            style={styles.icon}
            height={scale(25)}
            width={scale(25)}
            viewBox="0 0 487.6 487.6"
          >
            <Path
              fill="white"
              d="M440,80H48c-22.1,0-40,17.9-40,40v247.2c0,22.1,17.9,40,40,40h392c22.1,0,40-17.9,40-40V120C480,97.9,462.1,80,440,80z M48,100h392c11.1,0,20,8.9,20,20v40H28v-40C28,108.9,36.9,100,48,100z M440,368H48c-11.1,0-20-8.9-20-20V240h432v108C460,359.1,451.1,368,440,368z M100,320h120c11,0,20-9,20-20s-9-20-20-20H100c-11,0-20,9-20,20S89,320,100,320z M340,320h48c11,0,20-9,20-20s-9-20-20-20h-48c-11,0-20,9-20,20S329,320,340,320z"
            />
          </Svg>
        )}
        <View style={styles.accountDetails}>
          <Text style={styles.card}>{cardName}</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>

      <View style={styles.leftAlign}>
        <Text style={styles.idNum}>
          {cardName === "Debit Card" ? "Personal Account" : Number}
        </Text>
      </View>
    </View>
  );

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
              <Path
                d="M4,8 L28,8 M10,16 L22,16"
                stroke="orange"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>

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

      <View style={styles.accountTextContainer}>
        <Text style={styles.accountText}>Cards</Text>
      </View>

      {["House", "Holiday Trip", "Motorcycle"].map(renderAccountItem)}
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
    paddingHorizontal: scale(10),
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
    fontSize: moderateScale(15),
    color: "white",
  },
  amount: {
    fontSize: moderateScale(13),
    color: "orange",
  },
  leftAlign: {
    marginTop: scale(5),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  idNum: {
    color: "orange",
    fontSize: moderateScale(12),
  },
  accountTextContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(20),
  },
  accountText: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "orange",
  },
  dropdownIconContainer: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 5,
    zIndex: 10,
    marginTop: scale(5),
    width: scale(100),
  },
  dropdownOption: {
    padding: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  dropdownText: {
    color: "black",
  },
});

export default Something;
