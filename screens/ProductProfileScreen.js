import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductProfileScreen = ({navigation}) => {
  const FeaturedData = [
    {
      title: 'Java',
      SectionImage: require('../assets/images/coffee_1.png'),
    },
  ];
  const data = [
    {title: 'origins', data: 'ethiopia'},
    {title: 'Formsf', data: 'test form'},
    {title: 'variety', data: 'Java'},
    {title: 'Altitude', data: 'add'},
    {title: 'Notes', data: 'loreum ipsum'},
    {title: 'Process', data: 'test process'},
    {title: 'Dry fruits', data: 'test method'},
    {title: 'Certification', data: 'test certiication'},
    {title: 'Q Grade', data: '79.70'},
  ];
  const [collapsed, setCollapsed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    setCollapsed(!collapsed);
  };

  const handleIconPress = () => {
    setIsLiked(!isLiked);
  };
  const handleAddToCart = () => {
    if (isLoggedIn) {
      // Perform the action for adding to cart
      // ...
    } else {
      Alert.alert('Warning!!', 'Please Login');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="angle-left" size={40} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Profile</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.contentContainer}>
          <ScrollView style={styles.contentScroll}>
            {FeaturedData.map(section => (
              <View key={section.title} style={styles.sectionContainer}>
                <View style={styles.featuredContainer}>
                  <Icon
                    name="star"
                    size={20}
                    color="gold"
                    style={styles.starIcon}
                  />
                  <Text style={styles.featuredText}>FEATURED</Text>
                </View>
                <Image
                  style={styles.sectionImage}
                  source={section.SectionImage}
                />
                <View style={styles.iconsContainer}>
                  <TouchableOpacity
                    onPress={handleIconPress}
                    style={styles.iconContainer}>
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
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <TouchableOpacity onPress={handleClick}>
                    <Icon
                      name={
                        collapsed ? 'chevron-circle-down' : 'chevron-circle-up'
                      }
                      size={28}
                      color={'black'}
                      style={styles.iconUp}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.line} />
              </View>
            ))}
            {collapsed ? (
              <View>
                <View style={styles.selectedFlex}>
                  <Text style={styles.selectLot}>Select A Lot</Text>
                  <View style={styles.selectedIcon}>
                    <Icon
                      name="circle-thin"
                      size={25}
                      color={'black'}
                      style={{marginHorizontal: 5}}
                    />
                    <Text style={styles.nano}>nano</Text>
                  </View>
                  <View style={styles.selectedIcon}>
                    <Icon
                      name="circle-thin"
                      size={25}
                      color={'black'}
                      style={{marginHorizontal: 5}}
                    />
                    <Text style={styles.nano}>micro</Text>
                  </View>
                </View>
              </View>
            ) : (
              <>
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
                    This JavaScript Tutorial is designed to help both beginners
                    and experienced professionals
                  </Text>
                </View>
                <View style={styles.line3} />
              </>
            )}
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
              <TouchableOpacity style={styles.buyNowButton}>
                <Text style={styles.buyingText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
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
  sectionImage: {
    width: '100%',
    height: 150,
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
    top: 85,
    right: 20,
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
    height: 50,
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
    borderColor: '#6B8E23',
    marginLeft: 45,
  },
  addToCartText: {
    color: '#1E90FF',
    fontSize: 15,
  },
  buyNowButton: {
    width: '65%',
    height: 50,
    backgroundColor: '#9ACD32',
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
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 20,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
});
