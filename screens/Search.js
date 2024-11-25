import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const menuItems = [
  { title: 'Deposit', icon: 'cash-outline' },
  { title: 'Withdraw', icon: 'arrow-down-circle-outline' },
  { title: 'SendMoney', icon: 'send-outline' },
  { title: 'Transfer', icon: 'swap-horizontal-outline' },
  { title: 'Account Info', icon: 'information-circle-outline' },
  { title: 'Investments', icon: 'rocket-outline' },
  { title: 'Contact', icon: 'mail-outline' },
  { title: 'Support', icon: 'help-circle-outline' },
  { title: 'Transactions', icon: 'list-outline' },
  { title: 'Notifications', icon: 'notifications-outline' },
  { title: 'Insurance', icon: 'shield-outline' },
  { title: 'Betting', icon: 'game-controller-outline' },
  { title: 'Travel', icon: 'airplane-outline' },
  { title: 'Crypto', icon: 'logo-bitcoin' },
  { title: 'Prepaid', icon: 'wallet-outline' },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');  // Add state to manage search query
  const [filteredItems, setFilteredItems] = useState(menuItems);  // Filtered items based on search query

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // Filter menu items based on search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
    ]).start();
  }, [scaleAnim, opacityAnim, textAnim]);

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate(item.title)}>
      <Ionicons name={item.icon} size={30} color="#FFA500" />
      <Text style={styles.menuIconText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Signal Success in Banking</Text>
        </View>
        <View style={styles.profilePicContainer}>
          <Image source={require('../assets/profile.jpeg')} style={styles.profilePic} />
        </View>
      </View>

      <View style={styles.imageBlock}>
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
        >
          <Image source={require('../assets/icon.png')} style={styles.fullWidthImage} resizeMode="contain" />
        </Animated.View>
      </View>

      <Animated.Text
        style={{
          ...styles.logoText,
          opacity: textAnim,
          transform: [
            {
              translateY: textAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
          marginBottom: 20,
        }}
      >
        Your Foreign Exchange Partner
      </Animated.Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={searchQuery}  // Bind the search input to the state
          onChangeText={setSearchQuery}  // Update the search query state on input change
        />
      </View>

      <FlatList
        data={filteredItems}  // Use filteredItems instead of menuItems
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.title}
        numColumns={3}
        contentContainerStyle={styles.menuList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#1F1F1F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  profilePicContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  imageBlock: {
    width: '90%',
    height: 120,
    alignSelf: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginBottom: 10,
    position: 'relative',
  },
  fullWidthImage: {
    width: '100%',
    height: '100%',
  },
  logoText: {
    fontSize: 16,
    color: '#FFA500',
    fontWeight: 'bold',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 1,
  },
  searchIcon: {
    padding: 10,
  },
  searchBar: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    color: '#fff',
    borderRadius: 25,
  },
  menuList: {
    paddingHorizontal: 0,
  },
  menuCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  menuIconText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 12,
  },
});

export default Search;
