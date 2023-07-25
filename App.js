import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import LoginPage from './screens/LoginPage'; // Import the login page component
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'; // Import the "Forgot Password" page component';
import FillUserDetails from './screens/Fill_User_Details';
import OtpScreen from './screens/OtpScreen';
import SetPasswordScreen from './screens/SetPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import WishListScreen from './screens/WishListScreen';
import Regions from './screens/Regions';
import NewToOldest from './screens/NewToOldest';
import Variety from './screens/Variety';
import CartScreen from './screens/CartScreen';
import ProductProfileScreen from './screens/ProductProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import {AuthProvider} from './screens/AuthContext';
import {CartProvider} from './screens/CartContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Define your tab navigation screens
function TabNavigator({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'heart' : 'heart';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(route.name)}
              style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Icon
                name={iconName}
                size={focused ? 25 : 20}
                color={focused ? '#9ACD32' : 'gray'}
              />
            </TouchableOpacity>
          );
        },
        tabBarLabelStyle: {
          fontSize: 15, // Default font size
        },
        tabBarLabel: ({focused, color}) => {
          const labelStyle = {
            fontSize: focused ? 18 : 15, // Custom font size when focused
            fontWeight: focused ? 'bold' : 'normal', // Custom font weight when focused
            color: focused ? '#9ACD32' : 'gray', // Custom color when focused
          };

          return <Text style={labelStyle}>{route.name}</Text>;
        },
        headerShown: false,
        tabBarStyle: {
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Wishlist" component={WishListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Define your stack navigation screens
function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="login">
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
        name="Home"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductProfile"
        component={ProductProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const fetchUserEmail = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      if (email) {
        setUserEmail(email);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('Error retrieving user email from AsyncStorage:', error);
    }
  };
  useEffect(() => {
    // Fetch the email from AsyncStorage
    fetchUserEmail();
  }, []);
  const handleLogin = () => {
    navigation.navigate('login');
  };

  return (
    <DrawerContentScrollView {...props}>
      {isLoggedIn && (
        <View style={styles.afterLoginContainer}>
          <Text style={styles.normalText}>Welcome back,</Text>
          <Text style={styles.afterLogin}>{userEmail}</Text>
        </View>
      )}
      {!isLoggedIn && (
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.line} />
      <DrawerItemList {...props} />
      <View style={styles.bottomline} />
      <Image style={styles.img} source={require('./assets/images/logo1.png')} />
      <Text style={styles.testversion}>Version Test 4</Text>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  loginButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  loginButton: {
    width: '70%',
    height: 50,
    backgroundColor: 'green',
    borderRadius: 25,
    marginVertical: 15,
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  bottomline: {
    borderBottomWidth: 1,
    marginVertical: 5,
    opacity: 0.2,
  },
  img: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 0,
  },
  testversion: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginTop: -15,
    color: 'black',
  },
  afterLogin: {
    color: 'black',
    fontSize: 15,
    marginBottom: 4,
  },
  normalText: {
    color: 'black',
    fontSize: 15,
    marginBottom: 5,
  },
  afterLoginContainer: {
    marginLeft: 15,
    marginVertical: 15,
  },
});
// Define the root component
function App({userEmail}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleLogin = () => {
    // Perform your login logic here
    // Once the user is successfully logged in, set the isLoggedIn state to true
    setIsLoggedIn(true);
  };
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <StackNavigator cartItems={cartItems} setCartItems={setCartItems}>
            <DrawerNavigator>
              <CustomDrawerContent
                isLoggedIn={isLoggedIn}
                userEmail={userEmail}
                handleLogin={handleLogin}
              />
              <ProductProfileScreen isLoggedIn={isLoggedIn} />
            </DrawerNavigator>
          </StackNavigator>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '700',
          color: 'black',
        },
        drawerItemStyle: {
          backgroundColor: 'skyblue',
          paddingHorizontal: 10,
          marginVertical: 8,
          height: 55,
        },
        drawerActiveTintColor: 'lightblue',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeDrawer"
        component={TabNavigator}
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="Regions"
        component={Regions}
        options={{
          title: 'Regions/Origins',
        }}
      />
      <Drawer.Screen
        name="Variety"
        component={Variety}
        options={
          {
            // Add options if needed
          }
        }
      />
      <Drawer.Screen
        name="NewToOldest"
        component={NewToOldest}
        options={{
          title: 'New To Oldest',
        }}
      />
    </Drawer.Navigator>
  );
};

export default App;
