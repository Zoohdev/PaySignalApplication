import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';

const TrainBooking = () => {
  const [departureStation, setDepartureStation] = useState('');
  const [arrivalStation, setArrivalStation] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [trainClass, setTrainClass] = useState('');
  const [error, setError] = useState('');

  const [openDeparture, setOpenDeparture] = useState(false);
  const [openArrival, setOpenArrival] = useState(false);
  const [openClass, setOpenClass] = useState(false);

  const stations = ['NYC - New York', 'LA - Los Angeles', 'CHI - Chicago', 'SF - San Francisco', 'DC - Washington D.C.'];
  const trainClasses = ['Standard', 'First Class', 'Luxury'];

  const handleSearch = () => {
    if (departureStation && arrivalStation && departureStation !== arrivalStation) {
      setError('');
    } else {
      setError('Please select different stations for departure and arrival.');
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
        <FontAwesome name="train" size={30} color="#FF8C00" style={styles.icon} />
        <Text style={styles.title}>Train Booking</Text>
      </View>

      {/* Departure Station Dropdown */}
      <DropDownPicker
        open={openDeparture}
        value={departureStation}
        items={stations.map((station) => ({ label: station, value: station }))}
        setOpen={() => toggleDropdown('departure')}
        setValue={setDepartureStation}
        placeholder="Select Departure Station"
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownTextWhite}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        zIndex={3000}
      />

      {/* Arrival Station Dropdown */}
      <DropDownPicker
        open={openArrival}
        value={arrivalStation}
        items={stations.map((station) => ({ label: station, value: station }))}
        setOpen={() => toggleDropdown('arrival')}
        setValue={setArrivalStation}
        placeholder="Select Arrival Station"
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownTextWhite}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        zIndex={2000}
      />

      {/* Travel Date Input */}
      <TextInput
        style={styles.input}
        placeholder="Travel Date (YYYY-MM-DD)"
        value={travelDate}
        onChangeText={setTravelDate}
        placeholderTextColor="#a1a1a1"
      />

      {/* Train Class Dropdown */}
      <DropDownPicker
        open={openClass}
        value={trainClass}
        items={trainClasses.map((trainClass) => ({ label: trainClass, value: trainClass }))}
        setOpen={() => toggleDropdown('class')}
        setValue={setTrainClass}
        placeholder="Select Train Class"
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownTextWhite}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        zIndex={1000}
      />

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search Trains</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Results Display */}
      {departureStation && arrivalStation && trainClass && travelDate && !error && (
        <View style={styles.results}>
          <Text style={styles.resultText}>Departure: {departureStation}</Text>
          <Text style={styles.resultText}>Arrival: {arrivalStation}</Text>
          <Text style={styles.resultText}>Travel Date: {travelDate}</Text>
          <Text style={styles.resultText}>Class: {trainClass}</Text>
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
    width: '100%',
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
    width: '100%',
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
    width: '100%',
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
    width: '100%',
  },
  resultText: {
    fontSize: 16,
    color: '#fff', // White text for results
  },
});

export default TrainBooking;
