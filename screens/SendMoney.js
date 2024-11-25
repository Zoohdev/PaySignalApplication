import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function SendMoneyScreen({ navigation }) {
  const [recipientAccount, setRecipientAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState('');

  const exchangeRates = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.81,
    INR: 82,
    ZAR: 18.44, // South African Rand (example exchange rate)
    NGN: 775,   // Nigerian Naira (example exchange rate)
  };

  const handleAmountChange = (amount) => {
    setAmount(amount);

    if (!isNaN(amount) && parseFloat(amount) > 0 && currency) {
      const converted = (parseFloat(amount) / exchangeRates[currency]).toFixed(2);
      setConvertedAmount(converted);
    } else {
      setConvertedAmount('');
    }
  };

  const handleSendMoney = async () => {
    if (!recipientAccount || !amount || !currency) {
      Alert.alert('Error', 'Please enter all required fields.');
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount.');
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.1.113:8000/api/send-money/',
        {
          recipient_account: recipientAccount,
          amount: convertedAmount,
          message,
          currency,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token YOUR_AUTH_TOKEN`,
          }
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Money sent successfully!');
        setRecipientAccount('');
        setAmount('');
        setMessage('');
        setCurrency('USD');
        setConvertedAmount('');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.detail || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Money</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Recipient Account Number"
          placeholderTextColor="#888"
          value={recipientAccount}
          onChangeText={setRecipientAccount}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Picker
          selectedValue={currency}
          onValueChange={(value) => {
            setCurrency(value);
            handleAmountChange(amount);
          }}
          style={styles.picker}
        >
          <Picker.Item label="USD - United States Dollar" value="USD" />
          <Picker.Item label="EUR - Euro" value="EUR" />
          <Picker.Item label="GBP - British Pound" value="GBP" />
          <Picker.Item label="INR - Indian Rupee" value="INR" />
          <Picker.Item label="ZAR - South African Rand" value="ZAR" />
          <Picker.Item label="NGN - Nigerian Naira" value="NGN" />
        </Picker>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Amount in Selected Currency"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={amount}
          onChangeText={handleAmountChange}
        />
      </View>

      {convertedAmount ? (
        <View style={styles.card}>
          <Text style={styles.cardText}>Converted Amount in USD</Text>
          <Text style={styles.cardAmount}>${convertedAmount}</Text>
        </View>
      ) : null}

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Message (Optional)"
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSendMoney}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
    justifyContent: 'center',
  },
  title: {
    color: '#FFA500',
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputWrapper: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  input: {
    color: '#fff',
    fontSize: 16,
    height: 50,
  },
  picker: {
    color: '#fff',
    fontSize: 16,
    height: 50,
  },
  card: {
    backgroundColor: '#292929',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cardText: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 8,
  },
  cardAmount: {
    color: '#FFA500',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
