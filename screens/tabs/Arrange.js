import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Svg, { Circle, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";

const Arrange = () => {
  const Number = "IBAn123456789";
  const amount = "R12345";
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownOption = (option) => {
    setDropdownVisible(false);
    navigation.navigate(option);
  };

  const [data, setData] = useState([
    { key: "1", label: "Business Account", amount },
    { key: "2", label: "Personal Account", amount },
  ]);

  const [dataSecond, setDataSecond] = useState([
    { key: "3", label: "Visa Prepaid Card", amount: "R5000" },
    { key: "4", label: "Mastercard Prepaid Card", amount: "R3000" },
    { key: "5", label: "Discover Prepaid Card", amount: "R2500" },
  ]);

  const [dataSavings, setDataSavings] = useState([
    { key: "6", label: "High-Interest Savings Account", amount: "R10000" },
    { key: "7", label: "Emergency Fund Savings Account", amount: "R8000" },
  ]);

  const renderItem = ({ item, index, drag }) => (
    <TouchableOpacity onLongPress={drag} style={styles.accountContainer}>
      <Svg
        style={styles.icon}
        height={scale(25)}
        width={scale(25)}
        viewBox="0 0 487.6 487.6"
      >
        <Path
          fill="white"
          d="M440,80H48c-22.1,0-40,17.9-40,40v247.2c0,22.1,17.9,40,40,40h392c22.1,0,40-17.9,40-40V120C480,97.9,462.1,80,440,80z
          M48,100h392c11.1,0,20,8.9,20,20v40H28v-40C28,108.9,36.9,100,48,100z M440,368H48c-11.1,0-20-8.9-20-20V240h432v108
          C460,359.1,451.1,368,440,368z M100,320h120c11,0,20-9,20-20s-9-20-20-20H100c-11,0-20,9-20,20S89,320,100,320z M340,320h48c11,0,20-9,20-20s-9-20-20-20h-48c-11,0-20,9-20,20S329,320,340,320z"
        />
      </Svg>
      <View style={styles.accountDetails}>
        <Text style={[styles.card, styles.cardOrange]}>{item.label}</Text>
        <Text style={[styles.amount, item.label === "Account's" ? styles.amountLarge : null]}>
          {item.amount}
        </Text>
      </View>
      <View style={styles.leftAlign}>
        <Text style={styles.idNum}>{Number}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderAccountSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.accountText}>Accounts</Text>
      <DraggableFlatList
        data={data}
        renderItem={({ item, index, drag }) => (
          <TouchableOpacity onLongPress={drag} style={styles.accountContainer}>
           <Svg
  style={styles.icon}
  height={scale(25)}
  width={scale(25)}
  viewBox="0 0 487.6 487.6"
>
  <Path 
    fill="white"  // Set fill to white
    d="M460.3,216.55h-11.6v-69.7c0-28.5-23.2-51.6-51.6-51.6h-10.7l0.1-25.9c0-19.2-15.6-34.8-34.8-34.8H42.3c-23.1,0-42,18.6-42.3,41.7c0,0.2,0,0.4,0,0.6v341.4c0,19.2,15.6,34.8,34.8,34.8h362.4c28.5,0,51.6-23.2,51.6-51.6v-69.8h11.6c15,0,27.2-12.2,27.2-27.2v-60.7C487.5,228.75,475.3,216.55,460.3,216.55z M42.3,58.55h309.4c5.9,0,10.8,4.8,10.8,10.7l-0.1,26H42.3c-10.1,0-18.3-8.2-18.3-18.3S32.2,58.55,42.3,58.55z M424.7,401.35c0,15.2-12.4,27.6-27.6,27.6H34.7c-5.9,0-10.8-4.8-10.8-10.8v-303.1c5.6,2.7,11.8,4.2,18.4,4.2h354.8c15.2,0,27.6,12.4,27.6,27.6v69.7h-81.9c-15,0-27.2,12.2-27.2,27.2v60.7c0,15,12.2,27.2,27.2,27.2h81.9V401.35z M463.5,304.45c0,1.8-1.4,3.2-3.2,3.2H342.9c-1.8,0-3.2-1.4-3.2-3.2v-60.7c0-1.7,1.4-3.2,3.2-3.2h117.4c1.7,0,3.2,1.4,3.2,3.2L463.5,304.45z" 
  />
</Svg>

            <View style={styles.accountDetails}>
              <Text style={[styles.card, styles.cardOrange]}>{item.label}</Text>
              <Text style={[styles.amount, item.label === "Account's" ? styles.amountLarge : null]}>
                {item.amount}
              </Text>
            </View>
            <View style={styles.leftAlign}>
              <Text style={styles.idNum}>{Number}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
        onDragEnd={({ data }) => setData(data)}
      />
    </View>
  );
  
  const renderCardSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.accountText}>Cards</Text>
      <DraggableFlatList
        data={dataSecond}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onDragEnd={({ data }) => setDataSecond(data)}
      />
    </View>
  );

  const renderSavingsSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.accountText}>Savings Accounts</Text>
      <DraggableFlatList
        data={dataSavings}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onDragEnd={({ data }) => setDataSavings(data)}
      />
    </View>
  );

  const renderContent = () => (
    <>
      {renderAccountSection()}
      {renderCardSection()}
      {renderSavingsSection()}
    </>
  );

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#2a2b37" />
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
        </View>
      </View>
      

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

      {/* Content Section with FlatList */}
      <View style={styles.contentContainer}>
        <FlatList
          data={[{ key: 'sections', render: renderContent }]}
          renderItem={renderContent}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
        />
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#2a2b37",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: verticalScale(8),
    paddingBottom: verticalScale(100),
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingTop: scale(50),
    paddingBottom: scale(20),
  },
  dropdown: {
    position: 'absolute',
    top: verticalScale(100), // Position it below the dropdown icon
    right: 0, // Align with the dropdown icon's right
    backgroundColor: '#2a2b37',
    padding: scale(15),
    width: scale(160),
    zIndex: 99999, // Ensure it's above all elements
    borderLeftWidth: scale(2),
    borderLeftColor: 'orange',
    borderTopLeftRadius: scale(10),
    borderBottomLeftRadius: scale(10),
  },
  dropdownText: {
    fontSize: moderateScale(22),
    color: 'white',
    paddingVertical: verticalScale(5),
    textAlign: 'right',
    marginBottom: 10,
  },
  dropdownOption: {
    padding: scale(10),
  },
  dropdownIconContainer: {
    position: 'relative',
    zIndex: 10,
  },
  overview: {
    backgroundColor: "#1e2026",
  },
  iconContainer: {
    paddingRight: scale(8),
  },
  boxTwo: {
    flex: 1,
    fontSize: scale(16),
    color: "orange",
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionContainer: {
    marginBottom: verticalScale(16),
  },
  accountText: {
    fontSize: scale(18),
    color: "white",
    marginBottom: verticalScale(8),
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(16),
    backgroundColor: "#3a3d45",
    borderRadius: scale(8),
    marginBottom: verticalScale(8),
    zIndex: 1,
  },
  accountDetails: {
    flex: 1,
    paddingHorizontal: scale(8),
  },
  card: {
    fontSize: scale(14),
    color: "white",
  },
  cardOrange: {
    color: "orange",
  },
  amount: {
    fontSize: scale(12),
    color: "white",
  },
  amountLarge: {
    fontSize: scale(16),
  },
  leftAlign: {
    alignItems: "flex-end",
  },
  idNum: {
    fontSize: scale(12),
    color: "white",
  },
  icon: {
    marginRight: scale(8),
  },
});

export default Arrange;
