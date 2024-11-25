import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Electricity = () => {
  const [provider, setProvider] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  // DropDownPicker states
  const [openProvider, setOpenProvider] = useState(false);
  const [openCountryCode, setOpenCountryCode] = useState(false);

  // Country codes and their respective electricity providers and currencies
  const countryCodes = [
    { label: 'South Africa (+27)', value: '+27', currency: 'R' },
    { label: 'Nigeria (+234)', value: '+234', currency: '₦' },
    { label: 'USA (+1)', value: '+1', currency: '$' },
  ];

  const allProviders = {
    '+27': [
      { label: 'Eskom', value: 'eskom' },
      { label: 'City Power', value: 'city_power' },
      { label: 'Ekurhuleni', value: 'ekurhuleni' },
      { label: 'Cape Town Electricity', value: 'cape_town' },
    ],
    '+234': [
      { label: 'PHCN', value: 'phcn' },
      { label: 'Ibadan Electricity', value: 'ibadan' },
      { label: 'Jos Electricity', value: 'jos' },
      { label: 'Kaduna Electricity', value: 'kaduna' },
    ],
    '+1': [
      { label: 'Con Edison', value: 'con_edison' },
      { label: 'Duke Energy', value: 'duke_energy' },
      { label: 'Pacific Gas and Electric', value: 'pg_electric' },
      { label: 'Florida Power & Light', value: 'fpl' },
    ],
  };

  const [providers, setProviders] = useState(allProviders['+27']); // Default to South Africa
  const [currency, setCurrency] = useState('R'); // Default to South Africa's currency

  // Update providers and currency when countryCode changes
  useEffect(() => {
    const selectedCountry = countryCodes.find(item => item.value === countryCode);
    setCurrency(selectedCountry?.currency || 'R');
    setProviders(allProviders[countryCode] || []);
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
      <Text style={styles.title}>Purchase Electricity</Text>

      {/* Provider Dropdown */}
      <DropDownPicker
        open={openProvider}
        value={provider}
        items={providers.length > 0 ? providers : [{ label: 'Choose a Provider', value: null }]}
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

export default Electricity;
