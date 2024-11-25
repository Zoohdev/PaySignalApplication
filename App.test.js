import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

// Mocking screen components
jest.mock('./screens/SplashScreen', () => 'SplashScreen');
jest.mock('./screens/LoginScreen', () => 'LoginScreen');
jest.mock('./screens/Sign-up', () => 'SignUp');
jest.mock('./screens/Home', () => 'Home');
jest.mock('./screens/Accounts', () => 'Accounts');
jest.mock('./screens/tabs/SwitchProfile', () => 'SwitchProfile');
jest.mock('./screens/tabs/Exchange', () => 'Exchange');
jest.mock('./screens/tabs/AddCard', () => 'AddCard');
jest.mock('./screens/tabs/Prepaid', () => 'Prepaid');
jest.mock('./screens/tabs/BusinessAccount', () => 'BusinessAccount');
jest.mock('./screens/SendMoney', () => 'SendMoney');
jest.mock('./screens/tabs/CardDetails', () => 'CardDetails');
jest.mock('./screens/tabs/Arrange', () => 'Arrange');
jest.mock('./screens/tabs/Crypto', () => 'Crypto');
jest.mock('./screens/Search', () => 'Search');
jest.mock('./screens/MyProfile', () => 'MyProfile');
jest.mock('./screens/tabs/Travel', () => 'Travel');
jest.mock('./screens/tabs/BusBooking', () => 'BusBooking');
jest.mock('./screens/tabs/FlightBooking', () => 'FlightBooking');
jest.mock('./screens/tabs/TrainBooking', () => 'TrainBooking');

describe('App', () => {
  it('should render the SplashScreen on load', () => {
    const { getByText } = render(<App />);
    
    // Check if SplashScreen is rendered
    expect(getByText('SplashScreen')).toBeTruthy();
  });

  it('should render LoginScreen after navigating', () => {
    const { getByText } = render(<App />);
    
    // Simulate navigation and check if LoginScreen is rendered
    // You would typically need to mock the navigation behavior as well
    expect(getByText('LoginScreen')).toBeTruthy();
  });

  it('should render Home screen after navigating', () => {
    const { getByText } = render(<App />);
    
    // Check if Home screen is rendered
    expect(getByText('Home')).toBeTruthy();
  });
});
