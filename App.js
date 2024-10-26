import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native'; // Import StatusBar component
import SplashScreen from './screens/SplashScreen'; // Import SplashScreen
import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/Sign-up';
import Home from './screens/Home';
import Accounts from './screens/Accounts';
import Profile from './screens/tabs/Profile';
import Exchange from './screens/tabs/Exchange';
import AddCard from './screens/tabs/AddCard';
import Prepaid from './screens/tabs/Prepaid';
import BusinessAccount from './screens/tabs/BusinessAccount';
import SendMoney from './screens/SendMoney';
import CardDetails from './screens/tabs/CardDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* Set StatusBar style here */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="SplashScreen" 
          component={SplashScreen} 
          options={{ headerShown: false }} // Optional: Hide the header for SplashScreen
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Accounts" component={Accounts} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="addCard" component={AddCard} />
        <Stack.Screen name="Exchange" component={Exchange} />
        <Stack.Screen name="Prepaid" component={Prepaid} />
        <Stack.Screen name="BusinessAccount" component={BusinessAccount} />
        <Stack.Screen name="SendMoney" component={SendMoney} />
        <Stack.Screen name="CardDetails" component={CardDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
