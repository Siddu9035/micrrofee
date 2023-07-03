import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import LoginPage from './screens/LoginPage'; // Import the login page component
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'; // Import the "Forgot Password" page component';
import FillUserDetails from './screens/Fill_User_Details';
import OtpScreen from './screens/OtpScreen';
import SetPasswordScreen from './screens/SetPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SeachScreen';
import WishListScreen from './screens/WishListScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
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
          component={OtpScreen}
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
        <Stack.Screen
          name="HomeScreen"
          component={HomeTabNavigator}
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
            title: 'Microffee',
            headerRight: () => (
              <Icon name="shopping-cart" size={25} color="white" style={{ marginRight: 20 }} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#9ACD32',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: {
        fontSize: 15,
        fontWeight: '700',
        justifyContent: 'center',

      },
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Icon name="home" color={focused ? '#9ACD32' : 'grey' } size={25} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({focused}) => (
            <Icon name="search" color={focused ? '#9ACD32' : 'grey' } size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishListScreen}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({focused}) => (
            <Icon name="heart" color={focused ? '#9ACD32' : 'grey' } size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Icon name="user" color={focused ? '#9ACD32' : 'grey' } size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
