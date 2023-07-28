import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppContext} from './AppContext';

const CartScreen = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedInRef = useRef(isLoggedIn);
  const {cartItems, setCartItems} = useAppContext();
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(25);
  const [itemQuantities, setItemQuantities] = useState(
    cartItems.map(item => item.quantity),
  );

  const [grandTotal, setGrandTotal] = useState(0);

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
  const updateGrandTotal = () => {
    const total = cartItems.reduce((accumulator, item, index) => {
      return accumulator + item.selectedPrice * itemQuantities[index];
    }, 0);

    setGrandTotal(total);
  };
  // This effect will be called when the component is mounted
  useEffect(() => {
    checkLoginStatus();
    updateGrandTotal();
  }, [itemQuantities, cartItems]);

  const incrementCount = index => {
    setItemQuantities(prevQuantities =>
      prevQuantities.map((quantity, idx) =>
        idx === index ? quantity + 1 : quantity,
      ),
    );
    setCartItems(prevCartItems =>
      prevCartItems.map((item, idx) =>
        idx === index ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const decrementCount = index => {
    if (itemQuantities[index] > 1) {
      setItemQuantities(prevQuantities =>
        prevQuantities.map((quantity, idx) =>
          idx === index ? quantity - 1 : quantity,
        ),
      );
      setCartItems(prevCartItems =>
        prevCartItems.map((item, idx) =>
          idx === index ? {...item, quantity: item.quantity - 1} : item,
        ),
      );
    }
  };
  const removeItem = itemToRemove => {
    // Create a new copy of the cartItems array without the item to be removed
    const updatedCartItems = cartItems.filter(
      (_, index) => index !== itemToRemove,
    );
    // Update the cartItems state with the updated array
    setCartItems(updatedCartItems);
  };

  const renderShippingAddress = () => {
    return (
      <>
        <View style={styles.shippingAddressContainer}>
          <View>
            <Text style={styles.shippingAddressTitle}>Shipping Address</Text>
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
              Contact Number: {shippingAddress.phoneNumber}
            </Text>
          </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Update Address</Text>
            </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={40} color={'white'} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>Cart</Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        {isLoggedIn ? (
          <>
            {cartItems.length > 0 ? (
              <>
                <FlatList
                  data={cartItems}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <>
                      <View style={styles.itemContainer}>
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
                                onPress={() => incrementCount(index)}>
                                <Icon name="plus" size={20} color={'black'} />
                              </TouchableOpacity>
                              <Text style={{color: 'black'}}>
                                {itemQuantities[index]}
                              </Text>
                              <TouchableOpacity
                                onPress={() => decrementCount(index)}>
                                <Icon name="minus" size={20} color={'black'} />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <Text style={styles.selectedUnit}>
                            Unit:{item.selectedUnit}lb
                          </Text>
                          <Text style={styles.unitprice}>
                            Unit Price: ${selectedUnitPrice}
                          </Text>
                          {/* Add more details as needed */}
                        </View>
                        <Image source={item.image} style={styles.itemImage} />
                      </View>
                      <View style={styles.line1} />
                      <View style={styles.pricetext}>
                        <Text style={styles.priceText}>
                          ${(item.selectedPrice * itemQuantities[index]).toFixed(2)}
                        </Text>
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => removeItem(index)}>
                          <Text style={{color: 'blue'}}>Remove Item</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={styles.contentContainer}
                  ListFooterComponent={renderShippingAddress}
                />
                <View style={styles.line} />
                <View style={styles.bottomContainer}>
                  <View>
                    <Text style={styles.totalPrice}>
                      ${grandTotal.toFixed(2)}
                    </Text>
                    <Text style={styles.totalPrice}>Current Total</Text>
                  </View>
                  <TouchableOpacity style={styles.placeOrderButton}>
                    <Text style={styles.placeOrderButtonText}>Place Order</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.emptyCartContainer}>
                <Image
                  source={require('../assets/images/emptyCart.png')}
                  style={styles.emptyCartImage}
                />
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
              </View>
            )}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  iconContainer: {
    marginLeft: 25,
    alignSelf: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40,
  },
  headerText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
  },
  subContainer: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 20,
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
    height: 35,
    padding: 5,
    shadowColor: 'black',
    elevation: 10,
    marginLeft: 15,
    marginRight: 15,
    width: '55%',
    marginVertical: 5,
    borderRadius: 3,
  },
  quantityText: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingLeft: 10,
    fontSize: 17,
  },
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
    marginTop: 5,
  },
  selectedUnit: {
    color: 'black',
    paddingLeft: 10,
    marginTop: 5,
  },
  data: {
    color: 'black',
  },
  pricetext: {
    flexDirection: 'row',
    // marginTop: 3,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
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
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 10,
    elevation: 10,
    borderRadius: 4,
    flexDirection: 'row',
    marginBottom: 70,
    textAlignVertical: 'center',
    // flex: 1,
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
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'green',
    marginRight: 15,
    marginLeft: -25,
    // flex: 1,
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
  line1: {
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  itemImage: {
    width: '47%',
    height: 170,
    marginRight: 10,
    marginLeft: -5,
    borderTopRightRadius: 4,
    resizeMode: 'stretch',
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
    height: 170,
    marginLeft: 10,
    elevation: 10,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartImage: {
    width: '60%',
    height: 190,
    resizeMode: 'stretch',
  },
  emptyCartText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    margin: 15,
  },
});
