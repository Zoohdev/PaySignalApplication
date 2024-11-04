import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import CountryFlag from 'react-native-country-flag';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const currencyData = [
  { label: 'South African Rand', value: 'ZAR', flag: 'ZA' },
  { label: 'US Dollar', value: 'USD', flag: 'US' },
  { label: 'Euro', value: 'EUR', flag: 'EU' },
  { label: 'British Pound', value: 'GBP', flag: 'GB' },
  { label: 'Japanese Yen', value: 'JPY', flag: 'JP' },
  { label: 'Australian Dollar', value: 'AUD', flag: 'AU' },
];

const conversionRates = {
  ZAR: { USD: 0.055, EUR: 0.051, GBP: 0.045, JPY: 8.30 },
  USD: { ZAR: 18.20, EUR: 0.92, GBP: 0.82, JPY: 151.00 },
  EUR: { ZAR: 19.60, USD: 1.09, GBP: 0.89, JPY: 164.00 },
  GBP: { ZAR: 22.20, USD: 1.22, EUR: 1.12, JPY: 185.00 },
};

const SendMoney = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('R0.00');
  const [fromCurrency, setFromCurrency] = useState('ZAR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState(''); // New state for phone number

  const handleSend = () => {
    Alert.alert('Send Money', `Sending ${fromAmount} ${fromCurrency} to ${recipientName}. Converted amount: ${convertedAmount}`);
    setFromAmount('');
    setConvertedAmount('R0.00');
    setRecipientName('');
    setRecipientPhone(''); // Reset the phone input
  };

  useEffect(() => {
    handleConversion();
  }, [fromAmount, fromCurrency, toCurrency]);

  const handleConversion = () => {
    if (fromAmount && !isNaN(fromAmount) && conversionRates[fromCurrency][toCurrency]) {
      const convertedValue = parseFloat(fromAmount) * conversionRates[fromCurrency][toCurrency];
      setConvertedAmount(`${toCurrency === 'ZAR' ? 'R' : ''}${convertedValue.toFixed(2)}`);
    } else {
      setConvertedAmount('R0.00');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Money</Text>
      
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Converted Amount:</Text>
        <Text style={styles.convertedAmount}>{convertedAmount} {toCurrency}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter recipient's name"
        placeholderTextColor="#b0b0b0"
        value={recipientName}
        onChangeText={text => setRecipientName(text)}
        textAlign="center"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter recipient's phone number"
        placeholderTextColor="#b0b0b0"
        keyboardType="phone-pad"
        value={recipientPhone} // Use recipientPhone state here
        onChangeText={text => setRecipientPhone(text)} // Update the recipientPhone state
        textAlign="center"
      />

      <Dropdown
        style={styles.dropdown}
        data={currencyData}
        labelField="label"
        valueField="value"
        value={fromCurrency}
        onChange={item => setFromCurrency(item.value)}
        renderLeftIcon={() => (
          <CountryFlag isoCode={currencyData.find(currency => currency.value === fromCurrency)?.flag} size={25} />
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        placeholderTextColor="#b0b0b0"
        keyboardType="numeric"
        value={fromAmount}
        onChangeText={text => setFromAmount(text)}
        textAlign="center"
      />

      <Dropdown
        style={styles.dropdown}
        data={currencyData}
        labelField="label"
        valueField="value"
        value={toCurrency}
        onChange={item => setToCurrency(item.value)}
        renderLeftIcon={() => (
          <CountryFlag isoCode={currencyData.find(currency => currency.value === toCurrency)?.flag} size={25} />
        )}
      />

      <TouchableOpacity onPress={handleSend} style={styles.button}>
        <Text style={styles.buttonText}>Initiate Transfer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale(20),
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2b37',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#ff9800',
    marginBottom: verticalScale(20),
  },
  resultContainer: {
    marginBottom: verticalScale(20),
    alignItems: 'center',
  },
  resultText: {
    fontSize: moderateScale(18),
    color: '#fff',
  },
  convertedAmount: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: '#ff9800',
  },
  dropdown: {
    height: verticalScale(50),
    width: '100%',
    maxWidth: scale(250),
    borderColor: '#ff9800',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: verticalScale(10),
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  input: {
    height: verticalScale(50),
    width: '100%',
    maxWidth: scale(250),
    borderColor: '#ff9800',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: scale(15),
    backgroundColor: '#fff',
    color: '#000',
    fontSize: moderateScale(18),
    textAlign: 'center',
    marginBottom: verticalScale(15),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
  },
  button: {
    backgroundColor: '#ff9800',
    borderRadius: scale(10),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(30),
    marginTop: verticalScale(20),
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SendMoney;
