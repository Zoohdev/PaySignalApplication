import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const SplashScreen = React.lazy(() => import("./screens/SplashScreen"));
const LoginScreen = React.lazy(() => import("./screens/LoginScreen"));
const SignUp = React.lazy(() => import("./screens/Sign-up"));
const Home = React.lazy(() => import("./screens/Home"));
const Accounts = React.lazy(() => import("./screens/Accounts"));
const Profile = React.lazy(() => import("./screens/tabs/SwitchProfile"));
const Exchange = React.lazy(() => import("./screens/tabs/Exchange"));
const AddCard = React.lazy(() => import("./screens/tabs/AddCard"));
const Prepaid = React.lazy(() => import("./screens/tabs/Prepaid"));
const BusinessAccount = React.lazy(() => import("./screens/tabs/BusinessAccount"));
const SendMoney = React.lazy(() => import("./screens/SendMoney"));
const CardDetails = React.lazy(() => import("./screens/tabs/CardDetails"));
const Arrange = React.lazy(() => import("./screens/tabs/Arrange"));
const Crypto = React.lazy(() => import("./screens/tabs/Crypto"));
const Search = React.lazy(() => import("./screens/Search"));
const SwitchProfile = React.lazy(() => import("./screens/tabs/SwitchProfile"));
const MyProfile = React.lazy(() => import("./screens/MyProfile"));
const Travel = React.lazy(() => import("./screens/tabs/Travel"));
const Bus = React.lazy(() => import("./screens/tabs/BusBooking"));
const Flight = React.lazy(() => import("./screens/tabs/FlightBooking"));
const Train = React.lazy(() => import("./screens/tabs/TrainBooking"));

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Accounts" component={Accounts} />
          <Stack.Screen name="SwitchProfile" component={SwitchProfile} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="Exchange" component={Exchange} />
          <Stack.Screen name="Prepaid" component={Prepaid} />
          <Stack.Screen name="BusinessAccount" component={BusinessAccount} />
          <Stack.Screen name="SendMoney" component={SendMoney} />
          <Stack.Screen name="CardDetails" component={CardDetails} />
          <Stack.Screen name="Arrange" component={Arrange} />
          <Stack.Screen name="Crypto" component={Crypto} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="MyProfile" component={MyProfile} />
          <Stack.Screen name="Travel" component={Travel} />
          <Stack.Screen name="Bus" component={Bus} />
          <Stack.Screen name="Flight" component={Flight} />
          <Stack.Screen name="Train" component={Train} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
