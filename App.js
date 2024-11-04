import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUp from "./screens/Sign-up";
import Home from "./screens/Home";
import Accounts from "./screens/Accounts";
import Profile from "./screens/tabs/SwitchProfile";
import Exchange from "./screens/tabs/Exchange";
import AddCard from "./screens/tabs/AddCard";
import Prepaid from "./screens/tabs/Prepaid";
import BusinessAccount from "./screens/tabs/BusinessAccount";
import SendMoney from "./screens/SendMoney";
import CardDetails from "./screens/tabs/CardDetails";
import Arrange from "./screens/tabs/Arrange";
import Crypto from "./screens/tabs/Crypto";
import Search from "./screens/Search";
import SwitchProfile from "./screens/tabs/SwitchProfile";
import UserAuth from "./screens/UserAuth";
import MyProfile from "./screens/MyProfile";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#000" />

        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Accounts" component={Accounts} />
          <Stack.Screen name="SwitchProfile" component={SwitchProfile} />
          <Stack.Screen name="addCard" component={AddCard} />
          <Stack.Screen name="Exchange" component={Exchange} />
          <Stack.Screen name="Prepaid" component={Prepaid} />
          <Stack.Screen name="BusinessAccount" component={BusinessAccount} />
          <Stack.Screen name="SendMoney" component={SendMoney} />
          <Stack.Screen name="CardDetails" component={CardDetails} />
          <Stack.Screen name="Arrange" component={Arrange} />
          <Stack.Screen name="Crypto" component={Crypto} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="UserAuth" component={UserAuth} />
          <Stack.Screen name="MyProfile" component={MyProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
