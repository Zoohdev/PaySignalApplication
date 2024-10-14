import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const OverView = () => {
  const Number = "IBAn123456789"; // Placeholder for actual Number
  const amount = "R12345"; // Placeholder for actual amounts

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, styles.overview]}>
        <View style={styles.iconContainer}>
          <Svg height={scale(18)} width={scale(18)} viewBox="0 0 32 32">
            <Circle cx="8" cy="8" r="4" fill={"gold"} />
            <Circle cx="24" cy="8" r="4" fill={"gold"} />
            <Circle cx="8" cy="24" r="4" fill={"gold"} />
            <Circle cx="24" cy="24" r="4" fill={"gold"} />
          </Svg>
        </View>
        <Text style={styles.boxTwo}>OverView</Text>
        <View style={styles.iconContainer}>
          <Svg height={scale(25)} width={scale(25)} viewBox="0 0 32 32">
            <Path d="M4,8 L28,8 M10,16 L22,16" stroke={"gold"} strokeWidth="2" strokeLinecap="round" />
          </Svg>
        </View>
      </View>

      {/* Account text above new section */}
      <View style={styles.accountTextContainer}>
        <Text style={styles.accountText}>Account</Text>
      </View>

      {/* New Section for Account */}
      {['Bussiness Account', ' Personal Account',].map((cardName, index) => (
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
          <View style={styles.leftAlign}>
            <Text style={styles.idNum}>{Number}</Text>
          </View>
        </View>
      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(20),
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxTwo: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
  },
  newSection: {
    marginVertical: verticalScale(20),
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    width: scale(25),
    height: scale(25),
  },
  accountDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(10),
    flex: 1,
    justifyContent: 'space-between',
  },
  card: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  amount: {
    fontSize: moderateScale(14),
    color: 'gray',
    textAlign: 'right',
  },
  idNum: {
    fontSize: moderateScale(14),
    color: 'gray',
    marginTop: verticalScale(5),
    marginLeft: scale(20),
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
    color: 'gold',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
});

export default OverView;
