import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
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
      {/* Display Converted Amount */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          Converted Amount: {convertedAmount} {toCurrency}
        </Text>
      </View>

      <Text style={styles.label}>From Currency:</Text>
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
        placeholderTextColor="#ff9800"
        keyboardType="numeric"
        value={fromAmount}
        onChangeText={text => setFromAmount(text)}
        textAlign="center"
      />

      <Text style={styles.label}>To Currency:</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale(20),
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2a2b37', // Set background color to #2a2b37
  },
  resultContainer: {
    marginBottom: verticalScale(20),
  },
  resultText: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  label: {
    fontSize: scale(18),
    marginVertical: verticalScale(5),
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
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
    paddingHorizontal: scale(10),
    backgroundColor: '#fff',
    color: '#000',
    fontSize: moderateScale(18),
    textAlign: 'center',
    marginBottom: verticalScale(15),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});

export default SendMoney;
