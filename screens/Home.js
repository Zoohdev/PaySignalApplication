import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Search from './Search';
import SwitchProfile from './tabs/SwitchProfile';
import Profile from './Profile';


// Is the tab for the menu and other assorted peices of it
const Tab = createBottomTabNavigator();

const Bank = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Bank Screen</Text>
  </View>
);

const Messages = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Messages Screen</Text>
  </View>
);

const WelcomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const menuItems = [
    { title: 'Deposit', icon: 'cash' },
    { title: 'Withdraw', icon: 'arrow-down-circle' },
    { title: 'Transfer', icon: 'swap-horizontal' },
    { title: 'Account Info', icon: 'information-circle' },
    { title: 'Loan', icon: 'document-text' },
    { title: 'Investments', icon: 'rocket' },
    { title: 'Settings', icon: 'settings' },
    { title: 'Support', icon: 'help-circle' },
    { title: 'Transactions', icon: 'list' },
    { title: 'Notifications', icon: 'notifications' },
    { title: 'Profile', icon: 'person' },
    { title: 'Feedback', icon: 'chatbubbles' },
  ];

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuIcon}
      onPress={() => {
        setMenuVisible(false);
      }}
    >
      <Ionicons name={item.icon} size={20} color="#000000" />
      <Text style={styles.menuIconText}>{item.title}</Text>
    </TouchableOpacity>
  );

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

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#2a2b37', display: isKeyboardVisible ? 'none' : 'flex' },
          tabBarActiveTintColor: '#ff8c00',
          tabBarInactiveTintColor: '#ffffff',
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="Search" 
          component={Search} 
          options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} 
        />
        <Tab.Screen 
          name="Profile" 
          component={Profile} 
          options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} 
        />
        <Tab.Screen 
          name="Bank" 
          component={Bank} 
          options={{ tabBarIcon: ({ color }) => <Ionicons name="wallet" size={24} color={color} /> }} 
        />
        <Tab.Screen 
          name="Messages" 
          component={Messages} 
          options={{ tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses" size={24} color={color} /> }} 
        />
        <Tab.Screen 
          name="Menu" 
          component={() => null} 
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="menu" size={24} color={color} />,
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => setMenuVisible((prev) => !prev)}
              />
            ),
          }} 
        />
      </Tab.Navigator>
      
      {menuVisible && (
        <View style={styles.menuOverlay}>
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.title}
            numColumns={4}
            contentContainerStyle={styles.menuList}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2b37',
  },
  screenText: {
    fontSize: moderateScale(20),
    color: '#ffffff',
  },
  menuOverlay: {
    position: 'absolute',
    bottom: verticalScale(70),
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingVertical: scale(10),
    borderRadius: scale(8),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuIcon: {
    flex: 1,
    alignItems: 'center',
    margin: scale(4),
  },
  menuIconText: {
    color: '#000',
    textAlign: 'center',
    marginTop: scale(4),
    fontSize: moderateScale(12),
  },
});

export default WelcomeScreen;
