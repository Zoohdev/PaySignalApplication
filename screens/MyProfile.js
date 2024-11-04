import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const MyProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')}>
          <Ionicons name="arrow-back" size={24} color="#FF8C00" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Dashboard</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate('DocumentsScreen')}
        >
          <Ionicons name="document" size={24} style={styles.icon} color="#FF8C00" />
          <View>
            <Text style={styles.optionTitle}>Documents</Text>
            <Text style={styles.optionDescription}>Manage your important documents</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate('PersonalInfoScreen')}
        >
          <Ionicons name="person" size={24} style={styles.icon} color="#FF8C00" />
          <View>
            <Text style={styles.optionTitle}>Personal Info</Text>
            <Text style={styles.optionDescription}>View and update your personal information</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate('PreferencesScreen')}
        >
          <Ionicons name="options" size={24} style={styles.icon} color="#FF8C00" />
          <View>
            <Text style={styles.optionTitle}>My Preferences</Text>
            <Text style={styles.optionDescription}>Customize your experience</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate('ActivityHistoryScreen')}
        >
          <Ionicons name="time" size={24} style={styles.icon} color="#FF8C00" />
          <View>
            <Text style={styles.optionTitle}>Activity History</Text>
            <Text style={styles.optionDescription}>Review your recent activities</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#FF8C00',
  },
  optionsContainer: {
    marginTop: 20,
    paddingBottom: 20,
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
