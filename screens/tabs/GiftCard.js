import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const GiftCard = () => {
  const [recipientId, setRecipientId] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [country, setCountry] = useState('');
  const [store, setStore] = useState('');
  const [brand, setBrand] = useState('');
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState('');

  const [openCountry, setOpenCountry] = useState(false);
  const [openStore, setOpenStore] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);

  const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];
  const stores = ['Amazon', 'Walmart', 'Best Buy', 'eBay', 'Target'];
  const luxuryBrands = ['Gucci', 'Louis Vuitton', 'Chanel', 'Prada', 'Rolex'];
  const products = ['Gift Card', 'E-Gift Card', 'Physical Gift Card'];

  const handleGiftCardPurchase = async () => {
    try {
      const response = await axios.post(`https://api.example.com/buyGiftCard`, {
        recipientId,
        recipientEmail,
        country,
        store,
        brand,
        product,
        amount,
      });

      setConfirmation(response.data.message);
      setError('');
    } catch (error) {
      setError('Failed to purchase gift card. Please try again.');
      console.error('Error purchasing gift card:', error);
    }
  };

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case 'country':
        setOpenCountry(!openCountry);
        setOpenStore(false);
        setOpenBrand(false);
        setOpenProduct(false);
        break;
      case 'store':
        setOpenStore(!openStore);
        setOpenCountry(false);
        setOpenBrand(false);
        setOpenProduct(false);
        break;
      case 'brand':
        setOpenBrand(!openBrand);
        setOpenCountry(false);
        setOpenStore(false);
        setOpenProduct(false);
        break;
      case 'product':
        setOpenProduct(!openProduct);
        setOpenCountry(false);
        setOpenStore(false);
        setOpenBrand(false);
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buy Gift Cards</Text>

      <TextInput
        style={styles.input}
        placeholder="Recipient ID"
        value={recipientId}
        onChangeText={setRecipientId}
      />

      <TextInput
        style={styles.input}
        placeholder="Recipient Email"
        value={recipientEmail}
        onChangeText={setRecipientEmail}
        keyboardType="email-address"
      />

      <DropDownPicker
        open={openCountry}
        value={country}
        items={countries.map((country) => ({ label: country, value: country }))}
        setOpen={() => toggleDropdown('country')}
        setValue={setCountry}
        placeholder="Select Country"
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        zIndex={3000} 
      />

      <DropDownPicker
        open={openStore}
        value={store}
        items={stores.map((store) => ({ label: store, value: store }))}
        setOpen={() => toggleDropdown('store')}
        setValue={setStore}
        placeholder="Select Store"
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        zIndex={2000}
      />

      <DropDownPicker
        open={openBrand}
        value={brand}
        items={luxuryBrands.map((brand) => ({ label: brand, value: brand }))}
        setOpen={() => toggleDropdown('brand')}
        setValue={setBrand}
        placeholder="Select Luxury Brand"
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        zIndex={1000}
      />

      <DropDownPicker
        open={openProduct}
        value={product}
        items={products.map((product) => ({ label: product, value: product }))}
        setOpen={() => toggleDropdown('product')}
        setValue={setProduct}
        placeholder="Select Product"
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        zIndex={500} 
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.normalButton} onPress={handleGiftCardPurchase}>
        <Text style={styles.buttonText}>Buy Gift Card</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {confirmation && <Text style={styles.confirmationText}>{confirmation}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C00', 
    marginBottom: 30,
    marginTop: 50, 
  },
  input: {
    width: '90%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#FF8C00', 
    borderRadius: 8,
    marginBottom: 20,
    color: '#2a2b37',
    fontSize: 16,
    backgroundColor: '#FFFFFF', 
  },
  dropdownContainer: {
    width: '90%',
    marginBottom: 20,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#2a2b37',
  },
  placeholderStyle: {
    color: '#a1a1a1',
  },
  dropDownContainerStyle: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF8C00',
    borderWidth: 1,
    borderRadius: 8,
  },
  normalButton: {
    paddingVertical: 14,
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
  confirmationText: {
    color: 'green',
    marginTop: 20,
  },
});

export default GiftCard;
