import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Betting = () => {
  const [provider, setProvider] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  // DropDownPicker states
  const [openProvider, setOpenProvider] = useState(false);
  const [openCountryCode, setOpenCountryCode] = useState(false);

  // Country codes and their respective currencies
  const countryCodes = [
    { label: 'South Africa (+27)', value: '+27', currency: 'R' },
    { label: 'Nigeria (+234)', value: '+234', currency: '₦' },
    { label: 'USA (+1)', value: '+1', currency: '$' },
  ];

  // Networks for South Africa, Nigeria, and the USA
  const networks = {
    SouthAfrica: ['MTN', 'Vodacom', 'Cell C', 'Telkom'],
    Nigeria: ['MTN', 'Glo', 'Airtel', '9mobile'],
    USA: ['Verizon', 'AT&T', 'T-Mobile', 'Sprint'],
  };

  const [providers, setProviders] = useState(networks['SouthAfrica']); // Default to South Africa
  const [currency, setCurrency] = useState('R'); // Default to South Africa's currency

  // Update providers and currency when countryCode changes
  useEffect(() => {
    const selectedCountry = countryCodes.find(item => item.value === countryCode);
    setCurrency(selectedCountry?.currency || 'R');
    setProviders(networks[selectedCountry?.label.split(' ')[0]] || []); // Set providers based on country
    setProvider(null); // Reset selected provider when country changes
  }, [countryCode]);

  const handleAmountChange = (text) => {
    // Allow only numeric input
    if (/^\d+$/.test(text) || text === '') {
      setAmount(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sports Betting</Text>

      {/* Provider Dropdown */}
      <DropDownPicker
        open={openProvider}
        value={provider}
        items={providers.length > 0 ? providers.map(provider => ({ label: provider, value: provider })) : [{ label: 'Choose a Provider', value: null }]}
        setOpen={setOpenProvider}
        setValue={setProvider}
        placeholder="Select Provider"
        containerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        textStyle={styles.dropdownText}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
      />

      {/* Country Code Dropdown */}
      <DropDownPicker
        open={openCountryCode}
        value={countryCode}
        items={countryCodes}
        setOpen={setOpenCountryCode}
        setValue={setCountryCode}
        placeholder="Select Country Code"
        containerStyle={[styles.dropdownContainer, { zIndex: 500 }]}
        textStyle={styles.dropdownText}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
      />

      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
      />

      {/* Amount Input with Currency Display */}
      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>{currency}</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
          placeholder="Amount"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.normalButton}>
        <Text style={styles.buttonText}>Purchase Electricity</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2a2b37',
    marginBottom: 25,
  },
  dropdownContainer: {
    width: '80%',
    marginBottom: 15,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 16,
    color: '#2a2b37',
  },
  placeholderStyle: {
    color: '#a1a1a1',
  },
  dropDownContainerStyle: {
    borderColor: '#E0E0E0',
    borderRadius: 5,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 15,
    color: '#2a2b37',
    fontSize: 16,
  },
  normalButton: {
    padding: 10,
    backgroundColor: '#FF8C00',
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  amountContainer: {
    flexDirection: 'row',
    width: '80%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#2a2b37',
  },
  amountInput: {
    width: '80%',
    fontSize: 16,
    color: '#2a2b37',
    padding: 10,
  },
});

export default Betting;
