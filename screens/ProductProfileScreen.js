import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {CartContext} from './CartContext';
const ProductProfileScreen = ({route, navigation}) => {
  // Get the section data passed as a route parameter
  const {sectionData, isFeatured} = route.params;
  const imageSource = sectionData.SectionImage || sectionData.Sectionimage;
  const [collapsed, setCollapsed] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [count, setCount] = useState(1);
  const [selectitem, setSelectItem] = useState('0');
  const [isClicked, setIsClicked] = useState(false);
  const [selectData, setSelectData] = useState([
    {
      itemName: '1',
      price: '25',
    },
    {
      itemName: '2',
      price: '50',
    },
    {
      itemName: '3',
      price: '75',
    },
  ]);
  const [isIcon1Clicked, setIsIcon1Clicked] = useState(false);
  const [isIcon2Clicked, setIsIcon2Clicked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(25);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const data = [
    {title: 'Altitude', data: 'add'},
    {title: 'Notes', data: 'loreum ipsum'},
    {title: 'Process', data: 'test process'},
    {title: 'Dry fruits', data: 'test method'},
    {title: 'Certification', data: 'test certiication'},
    {title: 'Q Grade', data: '79.70'},
  ];
  const [isLotSelected, setLotSelected] = useState(false);
  const [lotError, setLotError] = useState('');
  const [unitError, setUnitError] = useState('');
  const isLoggedInRef = useRef(isLoggedIn);
  const {width, height} = Dimensions.get('window');
  // const [cartItems, setCartItems] = useState([]);
  const {cartItems, setCartItems} = useContext(CartContext);

  const handleClick = () => {
    setCollapsed(!collapsed);
  };

  const handleIconPress = () => {
    setIsLiked(!isLiked);
  };
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setIsModalVisible(true);
    } else if (!isLotSelected) {
      setLotError('Please select a lot before adding to cart.');
    } else if (!selectedUnit) {
      setUnitError('Please select a unit before adding to cart.');
    } else {
      setLotError('');
      setUnitError('');
      setIsModalVisible(false);
      const newItem = {
        itemName: sectionData.title,
        // lot: isIcon1Clicked ? 'nano' : 'micro',
        // quantity: count,
        price: selectedPrice * count,
        image:
          (sectionData.SectionImage && sectionData.SectionImage[0]) ||
          (sectionData.Sectionimage && sectionData.Sectionimage[0]) ||
          'default_image_url', // Replace 'default_image_url' with a default image URL if needed
        description: [
          sectionData.description[0],
          sectionData.description[2], // Accessing the second element of the description array
        ],
      };
      setCartItems([newItem]);
      console.log('items added succesfully');
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setIsModalVisible(true);
    } else if (!isLotSelected) {
      setLotError('Please select a lot before buying.');
    } else if (selectedUnit === '') {
      setUnitError('Please select a unit before buying.');
    } else {
      setLotError('');
      setUnitError('');
      setIsModalVisible(false);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handleNanoLot = () => {
    setIsIcon1Clicked(!isIcon1Clicked);
    setIsIcon2Clicked(false); // Deselect the other icon
    setIsExpanded(true);
    setLotSelected(true);
    setLotError('');
  };

  const handleMicroLot = () => {
    setIsIcon2Clicked(!isIcon2Clicked);
    setIsIcon1Clicked(false); // Deselect the other icon
    setIsExpanded(true);
    setLotSelected(true);
    setLotError('');
  };
  const closeModal = async () => {
    // navigation.navigate('login');
    setIsModalVisible(false);

    try {
      // Store the login status as 'true' in AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.log('Error storing login status:', error);
    }
  };
  //Check if the user is logged in from AsyncStorage
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

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={40} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Profile</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.contentContainer}>
          {isFeatured && (
            <View style={styles.featuredContainer}>
              <Icon
                name="star"
                size={20}
                color="gold"
                style={styles.starIcon}
              />
              <Text style={styles.featuredText}>FEATURED</Text>
            </View>
          )}
          <View>
            <SwiperFlatList
              horizontal
              data={imageSource}
              renderItem={({item, index}) => (
                <View style={{width: width}}>
                  <Image key={index} source={item} style={styles.img} />
                </View>
              )}
              index={0} // Initial index to show
            />
            <TouchableOpacity
              onPress={handleIconPress}
              style={styles.iconsContainer}>
              <View style={styles.circularBackground}>
                <Icon
                  name={isLiked ? 'heart' : 'heart-o'}
                  size={25}
                  color={isLiked ? 'red' : 'black'}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.textItems}>
            <Text style={styles.sectionTitle}>{sectionData.title}</Text>
            <TouchableOpacity onPress={handleClick}>
              <Icon
                name={collapsed ? 'chevron-circle-up' : 'chevron-circle-down'}
                size={28}
                color={'black'}
                style={styles.iconUp}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <ScrollView style={styles.contentScroll}>
            {collapsed && (
              <>
                <View>
                  {sectionData.description.map((item, index) => (
                    <View key={item.title} style={styles.dataContainer}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.data}>{item.des}</Text>
                    </View>
                  ))}
                </View>
                <View>
                  {data.map(item => (
                    <View key={item.title} style={styles.dataContainer}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.data}>{item.data}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.line2} />
                <View style={styles.aboutCoffee}>
                  <Text style={styles.paragraph}>
                    <Text style={styles.textBold}>About coffee: </Text>
                    React Native UI Kitten is one of the most popular UI
                    frameworks available in the React Native world. They provide
                    so many tools and a drop-down component is one of them. They
                    have named the component Select.
                  </Text>
                </View>
                <View style={styles.line3} />
              </>
            )}
            <View style={{flex: 1}}>
              {isLoggedIn && (
                <View style={styles.selectedFlex}>
                  <Text style={styles.selectLot}>Select A Lot</Text>
                  <View style={styles.selectedIcon}>
                    <TouchableOpacity onPress={handleNanoLot}>
                      <Icon
                        name={isIcon1Clicked ? 'circle' : 'circle-thin'}
                        size={25}
                        color={isIcon1Clicked ? 'green' : 'black'}
                        style={{marginHorizontal: 5}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.nano}>nano</Text>
                  </View>
                  <View style={styles.selectedIcon}>
                    <TouchableOpacity onPress={handleMicroLot}>
                      <Icon
                        name={isIcon2Clicked ? 'circle' : 'circle-thin'}
                        size={25}
                        color={isIcon2Clicked ? 'green' : 'black'}
                        style={{marginHorizontal: 5}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.nano}>micro</Text>
                  </View>
                </View>
              )}
              {lotError !== '' && <Text style={styles.error}>{lotError}</Text>}
              <View style={styles.chooseItem}>
                {isExpanded && (
                  <>
                    <View style={styles.choosingItem}>
                      <Text style={styles.chooseUnit}>Choose unit by lbs</Text>
                    </View>
                    <View style={styles.dropDownContainer}>
                      <TouchableOpacity
                        style={styles.dropdownSelector}
                        onPress={() => {
                          setIsClicked(!isClicked);
                          setUnitError('');
                        }}>
                        <Text style={styles.dropdownText}>{selectitem}</Text>
                        <Icon
                          name={isClicked ? 'chevron-up' : 'chevron-down'}
                          size={25}
                          color="green"
                          style={{marginLeft: 45}}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
              <View>
                {isClicked && (
                  <View style={styles.dropdownArea}>
                    <View>
                      {selectData.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.countryitem,
                            item.itemName == selectitem && styles.selectedItem,
                          ]}
                          onPress={() => {
                            setSelectItem(item.itemName);
                            setIsClicked(false);
                            setSelectedUnit(item.itemName);
                            setSelectedPrice(item.price);
                          }}>
                          <Text
                            style={[
                              styles.countryText,
                              item.itemName == selectitem &&
                                styles.selectItemText,
                            ]}>
                            {item.itemName}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>
              {unitError !== '' && (
                <Text style={styles.lotErrorText}>{unitError}</Text>
              )}
              <View style={styles.quantityFlex}>
                {selectedUnit !== '' && (
                  <>
                    <Text style={styles.quantityText}>Quantity</Text>
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
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceText}>
                        ${selectedPrice * count}
                      </Text>
                    </View>
                  </>
                )}
              </View>
              <View style={styles.line4}></View>
            </View>
          </ScrollView>
          <View style={styles.buttons}>
            <View style={styles.addButton}>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={handleAddToCart}>
                <Text style={styles.addToCartText}>Add To Cart</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buyButton}>
              <TouchableOpacity
                style={styles.buyNowButton}
                onPress={handleBuyNow}>
                <Text style={styles.buyingText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
            {!isLoggedIn && (
              <Modal visible={isModalVisible} transparent={true}>
                <TouchableWithoutFeedback onPress={closeModal}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={closeModal}>
                          <Icon name="close" size={24} color="black" />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.loginText}>Please Login!!</Text>
                      <View style={styles.loginSpace}>
                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={() => navigation.navigate('login')}>
                          <Text style={styles.closeButtonText}>Login</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
export default ProductProfileScreen;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'green',
  },
  Header: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: 'green',
  },
  iconContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  headerText: {
    color: 'white',
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginVertical: 15,
    fontSize: 18,
  },
  subContainer: {
    backgroundColor: '#F5F5F5',
    flexGrow: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  contentContainer: {
    flexGrow: 1,
  },
  featuredContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 1,
  },
  starIcon: {
    marginRight: 10,
  },
  featuredText: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 10,
  },
  iconsContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 100,
    right: 5,
    paddingRight: 10,
  },
  contentScroll: {
    flex: 1,
  },
  sectionTitle: {
    color: 'black',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textItems: {
    flexDirection: 'row',
    backgroundColor: '#DCDCDC',
    justifyContent: 'space-between',
    // marginTop: -200,
  },
  line: {
    borderBottomWidth: 0.8,
  },
  iconUp: {
    paddingVertical: 10,
    justifyContent: 'center',
    marginHorizontal: 25,
  },
  title: {
    color: 'black',
    textAlign: 'justify',
    flex: 1,
    marginLeft: 15,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  data: {
    color: 'black',
    flex: 1,
    marginHorizontal: 15,
    textAlign: 'justify',
    marginRight: 65,
    marginVertical: 5,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line2: {
    borderBottomWidth: 0.8,
    marginVertical: 5,
  },
  aboutCoffee: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  textBold: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  paragraph: {
    color: 'black',
    textAlign: 'justify',
  },
  buttons: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  addToCartButton: {
    height: 50,
    borderWidth: 1,
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: 'green',
    marginLeft: 45,
  },
  addToCartText: {
    color: '#1E90FF',
    fontSize: 15,
  },
  buyNowButton: {
    width: '65%',
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginLeft: 30,
  },
  buyingText: {
    color: 'white',
    fontSize: 15,
  },
  addButton: {
    width: '65%',
  },
  buyButton: {
    width: '65%',
  },
  line3: {
    borderBottomWidth: 1.6,
    marginVertical: 5,
  },
  circularBackground: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collapsedText: {
    color: 'black',
  },
  selectedFlex: {
    flexDirection: 'row',
    // flexGrow: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 14,
    marginBottom: 10,
    marginTop: 15,
    elevation: 10,
    shadowColor: 'black',
    borderRadius: 3,
  },
  selectedIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nano: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13,
  },
  selectLot: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dropDownContainer: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    elevation: 10,
    width: '40%',
    height: 40,
    color: 'black',
    alignItems: 'center',
    marginLeft: 20,
    justifyContent: 'space-evenly',
    zIndex: 1,
    borderRadius: 3,
  },
  dropdownSelector: {
    flexDirection: 'row',
  },
  dropdownText: {
    fontSize: 19,
    color: 'black',
    marginHorizontal: 15,
  },
  dropdownArea: {
    left: '59%',
    bottom: 13,
    width: '37%',
    backgroundColor: 'white',
    borderColor: '#81C0EF',
    shadowColor: 'black',
    elevation: 8,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    zIndex: 1,
  },
  countryText: {
    fontSize: 20,
    padding: 1,
    color: 'black',
    fontWeight: 'bold',
  },
  countryitem: {
    color: 'black',
    fontWeight: 'bold',
  },
  selectedItem: {
    backgroundColor: '#52850f',
    color: 'white',
  },
  selectItemText: {
    color: 'white',
  },
  chooseItem: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 14,
    marginVertical: 15,
  },
  chooseUnit: {
    color: 'black',
    fontSize: 15,
    height: 40,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  choosingItem: {
    backgroundColor: 'white',
    borderRadius: 3,
    width: '50%',
    alignItems: 'center',
    elevation: 10,
    shadowColor: 'black',
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
    width: '30%',
    marginVertical: 20,
    borderRadius: 3,
  },
  plusButton: {},
  quantityText: {
    color: 'black',
    backgroundColor: 'white',
    textAlignVertical: 'center',
    marginLeft: 14,
    marginVertical: 20,
    height: 40,
    width: '30%',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    elevation: 10,
    shadowColor: 'black',
    borderRadius: 3,
  },
  priceContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '23%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    elevation: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'green',
    zIndex: 1,
  },
  priceText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  circleIconSelected: {
    borderColor: 'green',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 5,
    borderRadius: 8,
    height: 150,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 25,
    backgroundColor: 'green',
    borderRadius: 25,
    height: 50,
  },
  item: {
    color: 'black',
    paddingLeft: 10,
    paddingVertical: 5,
  },
  modalHeader: {
    alignSelf: 'flex-end',
    bottom: 20,
  },
  loginText: {
    textAlignVertical: 'top',
    bottom: 25,
    right: 5,
    color: 'black',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 15,
  },
  loginSpace: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    // marginBottom: 10,
  },
  lotErrorText: {
    color: 'red',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  img: {
    width: 360,
    height: 170,
  },
  line4: {
    borderBottomWidth: 1,
  },
});
