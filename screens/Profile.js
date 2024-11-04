import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FF8C00" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>
        <Ionicons name="search" size={24} color="#FF8C00" />
      </View>
      <View style={styles.profileSection}>
        <Text style={styles.profileText}>Profile</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate('UserAuth')}
        >
          <Ionicons name="person" size={24} style={styles.icon} color="#FF8C00" />
          <View>
            <Text style={styles.optionTitle}>My Profile</Text>
            <Text style={styles.optionDescription}>Update your details safely</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate('SwitchProfile')}
        >
          <Ionicons name="swap-horizontal" size={24} style={styles.icon} color="#FF8C00" />
          <View>
            <Text style={styles.optionTitle}>Switch User</Text>
            <Text style={styles.optionDescription}>More easily switch between banking profiles</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <Ionicons name="settings" size={24} style={styles.icon} color="#FF8C00" />
          <View>
            <Text style={styles.optionTitle}>Settings</Text>
            <Text style={styles.optionDescription}>Personalize your app your way</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="log-out" size={24} style={styles.icon} color="#FF8C00" />
          <View>
            <Text style={styles.optionTitle}>Log Out</Text>
            <Text style={styles.optionDescription}>Sign out of your account</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#000',
  },
  profileSection: {
    marginTop: 20,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  optionDescription: {
    fontSize: 12,
    color: '#888',
  },
});
