import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';

const FlightBooking = () => {
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [flightClass, setFlightClass] = useState('');
  const [error, setError] = useState('');

  const [openDeparture, setOpenDeparture] = useState(false);
  const [openArrival, setOpenArrival] = useState(false);
  const [openClass, setOpenClass] = useState(false);

  const airports = ['JFK - New York', 'LHR - London Heathrow', 'DXB - Dubai International', 'HKG - Hong Kong International', 'SYD - Sydney Kingsford Smith'];
  const flightClasses = ['Economy', 'Business', 'First Class'];

  const handleSearch = () => {
    if (departureAirport && arrivalAirport && departureAirport !== arrivalAirport) {
      setError('');
    } else {
      setError('Please select different airports for departure and arrival.');
    }
  };

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case 'departure':
        setOpenDeparture(!openDeparture);
        setOpenArrival(false);
        setOpenClass(false);
        break;
      case 'arrival':
        setOpenArrival(!openArrival);
        setOpenDeparture(false);
        setOpenClass(false);
        break;
      case 'class':
        setOpenClass(!openClass);
        setOpenDeparture(false);
        setOpenArrival(false);
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <FontAwesome name="plane" size={30} color="#FF8C00" style={styles.icon} />
        <Text style={styles.title}>Flight Booking</Text>
      </View>

      <DropDownPicker
        open={openDeparture}
        value={departureAirport}
        items={airports.map((airport) => ({ label: airport, value: airport }))} 
        setOpen={() => toggleDropdown('departure')}
        setValue={setDepartureAirport}
        placeholder="Select Departure Airport"
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownTextWhite}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        zIndex={3000}
      />

      <DropDownPicker
        open={openArrival}
        value={arrivalAirport}
        items={airports.map((airport) => ({ label: airport, value: airport }))}
        setOpen={() => toggleDropdown('arrival')}
        setValue={setArrivalAirport}
        placeholder="Select Arrival Airport"
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownTextWhite}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        zIndex={2000}
      />

      <TextInput
        style={styles.input}
        placeholder="Flight Date (YYYY-MM-DD)"
        value={flightDate}
        onChangeText={setFlightDate}
        placeholderTextColor="#a1a1a1"
      />

      <DropDownPicker
        open={openClass}
        value={flightClass}
        items={flightClasses.map((flightClass) => ({ label: flightClass, value: flightClass }))}
        setOpen={() => toggleDropdown('class')}
        setValue={setFlightClass}
        placeholder="Select Flight Class"
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownTextWhite}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        zIndex={1000}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search Flights</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      {departureAirport && arrivalAirport && flightClass && flightDate && !error && (
        <View style={styles.results}>
          <Text style={styles.resultText}>Departure: {departureAirport}</Text>
          <Text style={styles.resultText}>Arrival: {arrivalAirport}</Text>
          <Text style={styles.resultText}>Flight Date: {flightDate}</Text>
          <Text style={styles.resultText}>Class: {flightClass}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#121212', // Dark background
    paddingBottom: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00', // Accent color
  },
  icon: {
    marginRight: 10,
  },
  dropdownContainer: {
    width: '90%',
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#555555', // Grey background for dropdowns
  },
  dropdownTextWhite: {
    fontSize: 16,
    color: 'grey', // White text for all dropdowns
  },
  placeholderStyle: {
    color: '#a1a1a1', // Light gray placeholder text
  },
  dropDownContainerStyle: {
    backgroundColor: '#fff', // Matching grey background for dropdown options
    borderColor: '#FF8C00', // Accent color for borders
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#333333',
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  results: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#333333', // Dark background for results
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: '90%',
  },
  resultText: {
    fontSize: 16,
    color: '#fff', // White text for results
  },
});

export default FlightBooking;
