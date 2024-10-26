// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageProvider } from './ImageContext'; // Import the provider
import Profile from './Profile';
import OtherScreen from './OtherScreen'; // Example other screen

const Stack = createStackNavigator();

const App = () => {
    return (
        <ImageProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Profile">
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="OtherScreen" component={OtherScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ImageProvider>
    );
};

export default ImageContext;
