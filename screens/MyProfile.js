import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const CustomerInfo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FF8C00" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Information</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          {/* Using a local image with require */}
          <Image
            source={require('../assets/profile.jpeg')} // Local image path
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileSubText}>Premium Member</Text>
        </View>

        {/* Account Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Details</Text>

          <View style={styles.accountRow}>
            <Text style={styles.label}>Account Number:</Text>
            <Text style={styles.value}>123456789</Text>
          </View>

          <View style={styles.accountRow}>
            <Text style={styles.label}>Account Holder:</Text>
            <Text style={styles.value}>John Doe</Text>
          </View>

          <View style={styles.accountRow}>
            <Text style={styles.label}>Bank Name:</Text>
            <Text style={styles.value}>ABC Bank</Text>
          </View>

          <View style={styles.accountRow}>
            <Text style={styles.label}>Branch:</Text>
            <Text style={styles.value}>Main Branch</Text>
          </View>

          <View style={styles.accountRow}>
            <Text style={styles.label}>Balance:</Text>
            <Text style={[styles.value, styles.balance]}>$10,000</Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Information</Text>

          <View style={styles.accountRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>johndoe@email.com</Text>
          </View>

          <View style={styles.accountRow}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>+1 234 567 890</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomerInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginLeft: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profileSubText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#AAA',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 20,
  },
  accountRow: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#AAA',
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '500',
  },
  balance: {
    color: '#4CAF50',
  },
});
