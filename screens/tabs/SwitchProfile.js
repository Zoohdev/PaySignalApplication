import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SwitchProfile = () => {
  const [accounts, setAccounts] = useState([]);
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState({}); // Track error messages

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const addAccount = () => {
    let errors = {};

    if (!name) {
      errors.name = 'Name is required';
    }
    if (!idNumber) {
      errors.idNumber = 'ID Number is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return; // Prevent adding the account
    }

    setAccounts([...accounts, { id: accounts.length, name, idNumber }]);
    setName('');
    setIdNumber('');
    setPassword('');
    setEmail('');
    setIsAddingAccount(false);
    setErrorMessage({}); // Clear errors on successful addition
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.switchUserText}>Switch Users</Text>
        </TouchableOpacity>
        <Ionicons name="search" size={24} color="black" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {isAddingAccount ? (
          <View style={styles.formContainer}>
            <TextInput
              placeholder={errorMessage.name ? errorMessage.name : "Name"}
              value={name}
              onChangeText={setName}
              style={[styles.input, errorMessage.name && styles.errorInput]}
            />
            <TextInput
              placeholder={errorMessage.idNumber ? errorMessage.idNumber : "ID Number"}
              value={idNumber}
              onChangeText={setIdNumber}
              style={[styles.input, errorMessage.idNumber && styles.errorInput]}
              keyboardType="numeric"
            />
            <TextInput
              placeholder={errorMessage.password ? errorMessage.password : "Password"}
              value={password}
              onChangeText={setPassword}
              style={[styles.input, errorMessage.password && styles.errorInput]}
              secureTextEntry
            />
            <TextInput
              placeholder={errorMessage.email ? errorMessage.email : "Email"}
              value={email}
              onChangeText={setEmail}
              style={[styles.input, errorMessage.email && styles.errorInput]}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.addButton} onPress={addAccount}>
              <Text style={styles.addButtonText}>Add User</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.accountBlock} onPress={() => setIsAddingAccount(true)}>
            <Ionicons name="add-circle" size={24} color="#ff8c00" />
            <Text style={styles.addText}>Add Another User</Text>
          </TouchableOpacity>
        )}

        {accounts.map((account) => (
          <View key={account.id} style={styles.accountBlock}>
            <Ionicons name="person-circle" size={24} color="#ff8c00" />
            <Text style={styles.addText}>{`${account.name} - ID: ${account.idNumber}`}</Text>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchUserText: {
    fontSize: 16,
    color: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  addButton: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  accountBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  addText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default SwitchProfile;
