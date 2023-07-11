import 'react-native-gesture-handler';
import React, {useState} from 'react';
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

import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';

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
        component={HomeScreen}
        options={{headerShown: false}}
      />
      {/* Add more screens here */}
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Implement your custom login logic here
    // For example, navigate to the LoginPage
    navigation.navigate('login');
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => (
          <View style={styles.loginButtonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
    width: '90%',
    height: 50,
    backgroundColor: 'green',
    borderRadius: 25,
    marginTop: 20,
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
});
// Define the root component
function App() {
  return (
    <NavigationContainer>
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
        drawerContent={props => <CustomDrawerContent {...props} />}
        initialRouteName="login">
        {/* <Drawer.Screen
          name="Stack"
          component={StackNavigator}
          options={{headerShown: false}}
        /> */}
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
      <StackNavigator/>
    </NavigationContainer>
  );
}

export default App;

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state
//   const [username, setUsername] = useState('siddappa'); // Track username

//   // Function to handle user login
//   const handleLogin = username => {
//     setIsLoggedIn(true);
//     setUsername(username);
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="login" options={{headerShown: false}}>
//           {props => (
//             <LoginPage
//               {...props}
//               username={username}
//               handleLogin={handleLogin}
//             />
//           )}
//         </Stack.Screen>
//         <Stack.Screen
//           name="ForgotPassword"
//           component={ForgotPasswordScreen}
//           options={{
//             headerShown: true,
//             headerStyle: {
//               backgroundColor: '#52850f',
//             },
//             headerTitleStyle: {
//               color: 'white',
//             },
//             headerTintColor: 'white',
//             headerTitleAlign: 'center',
//             title: 'Forgot Password',
//           }}
//         />
//         <Stack.Screen
//           name="Fill_User_Details"
//           component={FillUserDetails}
//           options={{
//             headerShown: true,
//             headerStyle: {
//               backgroundColor: '#52850f',
//             },
//             headerTitleStyle: {
//               color: 'white',
//             },
//             headerTintColor: 'white',
//             headerTitleAlign: 'center',
//             title: 'Fill User Details',
//           }}
//         />
//         <Stack.Screen
//           name="Otp"
//           component={OtpScreen}
//           options={{
//             headerShown: true,
//             headerStyle: {
//               backgroundColor: '#52850f',
//             },
//             headerTitleStyle: {
//               color: 'white',
//             },
//             headerTintColor: 'white',
//             headerTitleAlign: 'center',
//             title: 'OTP',
//           }}
//         />
//         <Stack.Screen
//           name="SetPassword"
//           component={SetPasswordScreen}
//           options={{
//             headerShown: true,
//             headerStyle: {
//               backgroundColor: '#52850f',
//             },
//             headerTitleStyle: {
//               color: 'white',
//             },
//             headerTintColor: 'white',
//             headerTitleAlign: 'center',
//             title: 'Set Password',
//           }}
//         />
//         <Stack.Screen
//           name="HomeScreen"
//           component={DrawerNavigator}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="Regions"
//           component={Regions}
//           options={{
//             headerShown: false,
//           }}
//         />
//         <Stack.Screen
//           name="NewToOldest"
//           component={NewToOldest}
//           options={{
//             headerShown: false,
//           }}
//         />
//         <Stack.Screen
//           name="Variety"
//           component={Variety}
//           options={{
//             headerShown: false,
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const HomeTabNavigator = ({navigation}) => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home';
//           } else if (route.name === 'Search') {
//             iconName = focused ? 'search' : 'search';
//           } else if (route.name === 'Wishlist') {
//             iconName = focused ? 'heart' : 'heart';
//           } else if (route.name === 'Profile') {
//             iconName = focused ? 'user' : 'user';
//           }

//           return (
//             <TouchableOpacity
//               onPress={() => navigation.navigate(route.name)}
//               style={{alignSelf: 'center', justifyContent: 'center'}}>
//               <Icon
//                 name={iconName}
//                 size={focused ? 25 : 20}
//                 color={focused ? '#9ACD32' : 'gray'}
//               />
//             </TouchableOpacity>
//           );
//         },
//         tabBarLabelStyle: {
//           fontSize: 15, // Default font size
//         },
//         tabBarLabel: ({focused, color}) => {
//           const labelStyle = {
//             fontSize: focused ? 18 : 15, // Custom font size when focused
//             fontWeight: focused ? 'bold' : 'normal', // Custom font weight when focused
//             color: focused ? '#9ACD32' : 'gray', // Custom color when focused
//           };

//           return <Text style={labelStyle}>{route.name}</Text>;
//         },
//         headerShown: false,
//         tabBarStyle: {
//           height: 60,
//           justifyContent: 'center',
//           alignItems: 'center',
//         },
//         tabBarHideOnKeyboard: true,
//       })}>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Search" component={SearchScreen} />
//       <Tab.Screen name="Wishlist" component={WishListScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// };

// const CustomDrawerContent = ({navigation, isLoggedIn, username, ...props}) => {
//   const handleButtonPress = () => {
//     console.log('Button Pressed');
//     navigation.navigate('login');
//   };

//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItem
//         label={() => (
//           <View style={styles.loginButtonContainer}>
//             <TouchableOpacity style={styles.loginButton} onPress={handleButtonPress}>
//               <Text style={styles.loginText}>Login</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//       <View style={styles.line} />
//       <DrawerItemList {...props} />
//       <View style={styles.bottomline} />
//       <Image style={styles.img} source={require('./assets/images/logo1.png')} />
//       <Text style={styles.testversion}>Version Test 4</Text>
//     </DrawerContentScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   greetingContainer: {
//     marginVertical: 10,
//     paddingHorizontal: 20,
//   },
//   greetingText: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   usertext: {
//     fontSize: 16,
//     fontWeight: '400',
//     marginTop: 5,
//   },
//   line: {
//     borderBottomWidth: 1,
//     marginHorizontal: 5,
//     marginVertical: 10,
//   },
//   bottomline: {
//     borderBottomWidth: 1,
//     marginVertical: 5,
//     opacity: 0.2,
//   },
//   img: {
//     width: 150,
//     height: 150,
//     alignSelf: 'center',
//     marginTop: 15,
//     marginBottom: 0,
//   },
//   testversion: {
//     alignSelf: 'center',
//     fontSize: 18,
//     fontWeight: '700',
//     marginTop: -15,
//     color: 'black',
//   },
//   userDetailsContainer: {
//     marginVertical: 10,
//     paddingHorizontal: 20,
//   },
//   userDetailsText: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   loginHandler: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   loginButton: {
//     backgroundColor: '#52850f',
//     width: 160,
//     height: 45,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 20,
//     borderRadius: 20,
//   },
//   text: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// const DrawerNavigator = ({isLoggedIn, username}) => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerLabelStyle: {
//           fontSize: 16,
//           fontWeight: '700',
//           color: 'black',
//         },
//         drawerItemStyle: {
//           backgroundColor: 'skyblue',
//           paddingHorizontal: 10,
//           marginVertical: 8,
//           height: 55,
//         },
//         drawerActiveTintColor: 'lightblue',
//       }}
//       drawerContent={props => (
//         <CustomDrawerContent
//           navigation={props.navigation}
//           isLoggedIn={isLoggedIn}
//           username={username}
//           {...props}
//         />
//       )}>
//       <Drawer.Screen
//         name="HomeDrawer"
//         component={HomeTabNavigator}
//         options={{
//           drawerLabel: 'Home',
//         }}
//       />
//       <Drawer.Screen
//         name="Regions"
//         component={Regions}
//         options={{
//           title: 'Regions/Origins',
//         }}
//       />
//       <Drawer.Screen
//         name="Variety"
//         component={Variety}
//         options={
//           {
//             // Add options if needed
//           }
//         }
//       />
//       <Drawer.Screen
//         name="NewToOldest"
//         component={NewToOldest}
//         options={{
//           title: 'New To Oldest',
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };
