import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CartContext} from './CartContext';

const CartScreen = ({navigation, route}) => {
  const {width, height} = Dimensions.get('window');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedInRef = useRef(isLoggedIn);
  const {cartItems} = useContext(CartContext);
  const [count, setCount] = useState(1);

  const [shippingAddress, setShippingAddress] = useState({
    name: 'Siddappa',
    addressLine1: '123 Main Street',
    addressLine2: 'Apt 4',
    city: 'Vijayapura',
    state: 'Karnataka',
    zipCode: '586103',
    phoneNumber: '(555) 123-4567',
  });

  const checkLoginStatus = async () => {
    try {
      const isLoggedInString = await AsyncStorage.getItem('isLoggedIn');
      const isLoggedInValue = isLoggedInString === 'true'; // Convert string to boolean
      setIsLoggedIn(isLoggedInValue);
      isLoggedInRef.current = isLoggedInValue; // Update the ref with the current value
    } catch (error) {
      console.log('Error retrieving login status:', error);
    }
  };
  // This effect will be called when the component is mounted
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={40} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart</Text>
      </View>
      <View style={styles.subContainer}>
        {isLoggedIn ? (
          <>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={styles.itemContainer}>
                {cartItems.map((item, index) => (
                  <View key={index} style={styles.itemContainer}>
                    {/* Render other cart item details (name, quantity, price, etc.) */}
                    <View style={styles.itemDetails}>
                      <Text style={styles.title}>{item.itemName}</Text>
                      {item.description.map((item, index) => (
                        <View key={index} style={styles.dataContainer}>
                          <Text style={styles.data}>{item.des}</Text>
                        </View>
                      ))}
                      <View style={styles.quantityFlex}>
                        <Text style={styles.quantityText}>Qty</Text>
                        <View style={styles.counter}>
                          <TouchableOpacity
                            style={styles.plusButton}
                            onPress={incrementCount}>
                            <Icon name="plus" size={20} color={'black'} />
                          </TouchableOpacity>

                          <Text style={{color: 'black'}}>{count}</Text>

                          <TouchableOpacity onPress={decrementCount}>
                            <Icon name="minus" size={20} color={'black'} />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text style={styles.unitprice}>
                        Unit Price: ${item.price}
                      </Text>
                      {/* Add more details as needed */}
                    </View>
                    <Image source={item.image} style={styles.itemImage} />
                  </View>
                ))}
              </View>
              <View style={styles.pricetext}>
                <Text style={styles.priceText}>$600.00</Text>
                <TouchableOpacity style={styles.removeButton}>
                  <Text style={{color: 'blue'}}>Remove Item</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shippingAddressContainer}>
                <View>
                  <Text style={styles.shippingAddressTitle}>
                    Shipping Address
                  </Text>
                  <Text style={styles.shippingAddressText}>
                    {shippingAddress.name}
                  </Text>
                  <Text style={styles.shippingAddressText}>
                    {shippingAddress.addressLine1}
                    {shippingAddress.addressLine2
                      ? ', ' + shippingAddress.addressLine2
                      : ''}
                  </Text>
                  <Text style={styles.shippingAddressText}>
                    {shippingAddress.city}, {shippingAddress.state},{' '}
                    {shippingAddress.zipCode}
                  </Text>
                  <Text style={styles.shippingAddressText}>
                    Contact Number : {shippingAddress.phoneNumber}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Update Address</Text>
                </TouchableOpacity>
              </View>
              {cartItems.length === 0 && (
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
              )}
            </ScrollView>
            <View style={styles.line} />
            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.totalPrice}>$600.00</Text>
                <Text style={styles.totalPrice}>Current Total</Text>
              </View>
              <TouchableOpacity style={styles.placeOrderButton}>
                <Text style={styles.placeOrderButtonText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.withoutLogin}>
            <Text style={styles.loginText}>Please Login To See Your Cart</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('login')}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  Header: {
    flexDirection: 'row',
    height: 60,
  },
  iconContainer: {
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  headerText: {
    color: 'white',
    alignSelf: 'center',
    paddingLeft: 50,
    marginLeft: 50,
    fontSize: 18,
  },
  subContainer: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
  },
  withoutLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'black',
    fontWeight: '500',
    marginBottom: 15,
  },
  loginButton: {
    height: 50,
    width: 150,
    alignItems: 'center',
    backgroundColor: 'green',
    justifyContent: 'center',
    borderRadius: 13,
    marginTop: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 15,
  },
  quantityFlex: {
    flexDirection: 'row',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: 40,
    padding: 10,
    shadowColor: 'black',
    elevation: 10,
    marginLeft: 15,
    marginRight: 15,
    width: '55%',
    marginVertical: 20,
    borderRadius: 3,
  },
  quantityText: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingLeft: 10,
    fontSize: 17,
  },
  //   itemConatiner: {
  //     // flexDirection: 'row',
  //     width: '46.5%',
  //     backgroundColor: 'white',
  //     height: 200,
  //     marginLeft: 10,
  //     marginTop: 15,
  //     elevation: 10,
  //     borderRadius: 4,
  //   },
  dataContainer: {
    paddingLeft: 10,
  },
  title: {
    paddingLeft: 10,
    color: 'black',
    fontWeight: 'bold',
    paddingTop: 8,
  },
  unitprice: {
    color: 'black',
    paddingLeft: 10,
    marginTop: 10,
  },
  data: {
    color: 'black',
    marginVertical: 2,
  },
  pricetext: {
    flexDirection: 'row',
    marginTop: 3,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  priceText: {
    color: 'black',
    elevation: 10,
    backgroundColor: 'white',
    width: '49.5%',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  removeButton: {
    height: 50,
    width: '49.5%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  shippingAddressContainer: {
    width: '94%',
    height: 170,
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 10,
    elevation: 10,
    borderRadius: 4,
    flexDirection: 'row',
  },
  shippingAddressTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 8,
    paddingBottom: 10,
    paddingTop: 8,
  },
  shippingAddressText: {
    color: 'black',
    padding: 2,
    paddingLeft: 8,
  },
  editButtonText: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '29%',
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'green',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  placeOrderButton: {
    width: '50%',
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  placeOrderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    borderBottomWidth: 1,
  },
  itemImage: {
    width: '47%',
    height: 200,
    marginRight: 9,
    marginLeft: 2,
    // resizeMode: 'stretch',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemDetails: {
    width: '47%',
    backgroundColor: 'white',
    height: 200,
    marginLeft: 10,
    elevation: 10,
    borderRadius: 4,
  },
});
