import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginPage from './screens/LoginPage'; // Import the login page component
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'; // Import the "Forgot Password" page component';
import FillUserDetails from './screens/Fill_User_Details';
import OtpScreen from './screens/OtpScreen';
import SetPasswordScreen from './screens/SetPasswordScreen';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
const OtpStack = createStackNavigator(); // Create a stack navigator for the OTP screen
const OtpNavigator = () => {
  return (
    <OtpStack.Navigator>
      <OtpStack.Screen
        name="otp"
        component={OtpScreen}
        options={{headerShown: false}}
      /> 
        {/* <OtpStack.Screen
        name="setpassword"
        component={setPasswordScreen}
        options={{headerShown: false}}
      /> */}
    </OtpStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen
          name="login"
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#52850f',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            title: 'Forgot Password',
          }}
        /> 
         <Stack.Screen
          name="Fill_User_Details"
          component={FillUserDetails}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#52850f',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            title: 'Fill User Details',
          }}
        /> 
        <Stack.Screen
          name="Otp"
          component={OtpNavigator}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#52850f',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            title: 'OTP',
          }}
        />
        <Stack.Screen
          name="SetPassword"
          component={SetPasswordScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#52850f',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            title: 'Set Password',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
