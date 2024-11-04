import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const BusinessAccountScreen = ({ navigation }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions] = useState([
    { id: '1', date: '2024-10-01', amount: '$200', description: 'Payment to Supplier' },
    { id: '2', date: '2024-10-02', amount: '$500', description: 'Office Rent' },
    { id: '3', date: '2024-10-03', amount: '$150', description: 'Purchase of Office Supplies' },
    { id: '4', date: '2024-10-04', amount: '$75', description: 'Courier Service' },
    { id: '5', date: '2024-10-05', amount: '$320', description: 'IT Services' },
  ]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.date.includes(searchQuery) ||
      transaction.amount.includes(searchQuery)
  );

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, styles.overview]}>
        <TouchableOpacity style={styles.arrowButton} onPress={() => navigation.goBack()}>
          <Svg fill="#fff" height="20px" width="20px" viewBox="0 0 330 330">
            <Path d="M315,150H105V90c0-6.067-3.655-11.537-9.26-13.858c-5.606-2.322-12.058-1.038-16.347,3.252l-75,75c-5.858,5.858-5.858,15.355,0,21.213l75,75c2.87,2.87,6.705,4.394,10.61,4.394c1.932,0,3.881-0.374,5.737-1.142c5.605-2.322,9.26-7.791,9.26-13.858v-60h210c8.284,0,15-6.716,15-15C330,156.716,323.284,150,315,150z" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.boxTwo}>Account History</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.transactionsList}>
        {filteredTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionContainer}>
            <Text style={styles.date}>{transaction.date}</Text>
            <Text style={styles.amount}>{transaction.amount}</Text>
            <Text style={styles.description}>{transaction.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#2a2b37',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: scale(15),
    backgroundColor: '#2a2b37',
  },
  boxTwo: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: 'orange',
    marginLeft: scale(59), // Align the text more to the left
    marginVertical: scale(20), // Add margin for spacing
  },
  searchContainer: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
  },
  input: {
    backgroundColor: '#1f1f2e',
    color: 'white',
    padding: scale(10),
    borderRadius: scale(5),
  },
  transactionsList: {
    paddingHorizontal: scale(15),
  },
  transactionContainer: {
    backgroundColor: '#3a3a4a',
    padding: scale(10),
    marginVertical: verticalScale(5),
    borderRadius: scale(5),
  },
  date: {
    color: 'orange',
    fontSize: moderateScale(14),
  },
  amount: {
    color: 'white',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  description: {
    color: '#ccc',
    fontSize: moderateScale(12),
  },
  arrowButton: {
    padding: scale(5),
  },
});

export default BusinessAccountScreen;
