import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppContext} from './AppContext';

const HomeScreen = ({navigation}) => {
  const {isLoggedIn, cartItems} = useAppContext();

  const FeaturedData = [
    {
      title: 'Java',
      data: ['Central America', 'BalckCoffee'],
      SectionImage: [
        require('../assets/images/coffee_1.png'),
        require('../assets/images/coffee_2.png'),
        require('../assets/images/coffee_3.png'),
      ],
      description: [
        {
          title: 'origins',
          des: 'america',
        },
        {
          title: 'variety',
          des: 'Java',
        },
        {
          title: 'Forms',
          des: 'Blackcoffee',
        },
      ],
    },
    {
      title: 'javaScript',
      data: ['America', 'BrownCoffee'],
      SectionImage: [
        require('../assets/images/coffee_2.png'),
        require('../assets/images/coffee_1.png'),
        require('../assets/images/coffee_3.png'),
      ],
      description: [
        {
          title: 'origins',
          des: 'America',
        },
        {
          title: 'variety',
          des: 'javascript',
        },
        {
          title: 'Forms',
          des: 'browncoffee',
        },
      ],
    },
    {
      title: 'python',
      data: ['North America', 'YellowCoffee'],
      SectionImage: [
        require('../assets/images/coffee_3.png'),
        require('../assets/images/coffee_2.png'),
        require('../assets/images/coffee_1.png'),
      ],
      description: [
        {
          title: 'origins',
          des: 'NorthAmerica',
        },
        {
          title: 'variety',
          des: 'Python',
        },
        {
          title: 'Forms',
          des: 'Yellowcoffee',
        },
      ],
    },
    {
      title: 'Swift',
      data: ['india', 'KesarCoffee'],
      SectionImage: [
        require('../assets/images/coffee_3.png'),
        require('../assets/images/coffee_2.png'),
        require('../assets/images/coffee_1.png'),
      ],
      description: [
        {
          title: 'origins',
          des: 'India',
        },
        {
          title: 'variety',
          des: 'Swift',
        },
        {
          title: 'Forms',
          des: 'KesarCoffee',
        },
      ],
    },
    {
      title: 'AngularJs',
      data: ['Europe', 'RedCoffee'],
      SectionImage: [
        require('../assets/images/coffee_1.png'),
        require('../assets/images/coffee_2.png'),
        require('../assets/images/coffee_3.png'),
      ],
      description: [
        {
          title: 'origins',
          des: 'Europe',
        },
        {
          title: 'variety',
          des: 'Angularjs',
        },
        {
          title: 'Forms',
          des: 'Redcoffee',
        },
      ],
    },
  ];
  const latestData = [
    {
      title: 'Orange',
      data: ['Mumbai'],
      Sectionimage: [
        require('../assets/images/latcoffee1.png'),
        require('../assets/images/latcoffee2.png'),
        require('../assets/images/latcoffee3.png'),
      ],
      description: [
        {
          title: 'origins',
          des: 'Mumbai',
        },
        {
          title: 'variety',
          des: 'Orange',
        },
        {
          title: 'Forms',
          des: 'Redcoffee',
        },
      ],
    },
    {
      title: 'Red',
      data: ['Karnataka'],
      Sectionimage: [
        require('../assets/images/latcoffee2.png'),
        require('../assets/images/latcoffee1.png'),
        require('../assets/images/latcoffee3.png'),
      ],
      description: [
        {
          title: 'origins',
          des: 'Karnataka',
        },
        {
          title: 'variety',
          des: 'Red',
        },
        {
          title: 'Forms',
          des: 'reddishcoffee',
        },
      ],
    },
    {
      title: 'Brown',
      data: ['Kerala'],
      Sectionimage: [
        require('../assets/images/latcoffee3.png'),
        require('../assets/images/latcoffee2.png'),
        require('../assets/images/latcoffee1.png'),
      ],
      description: [
        {
          title: 'origins',
          des: 'kerala',
        },
        {
          title: 'variety',
          des: 'Brown',
        },
        {
          title: 'Forms',
          des: 'Brownish',
        },
      ],
    },
    {
      title: 'Black',
      data: ['Goa'],
      Sectionimage: [
        require('../assets/images/latcoffee1.png'),
        require('../assets/images/latcoffee2.png'),
        require('../assets/images/latcoffee3.png'),
      ],
      description: [
        {
          title: 'origins',
          des: 'goa',
        },
        {
          title: 'variety',
          des: 'Black',
        },
        {
          title: 'Forms',
          des: 'Blackish',
        },
      ],
    },
    {
      title: 'White',
      data: ['uttarPradesh'],
      Sectionimage: [
        require('../assets/images/latcoffee2.png'),
        require('../assets/images/latcoffee1.png'),
        require('../assets/images/latcoffee3.png'),
      ],
      description: [
        {
          title: 'origins',
          des: 'uttarpradesh',
        },
        {
          title: 'variety',
          des: 'white',
        },
        {
          title: 'Forms',
          des: 'Whiteish',
        },
      ],
    },
  ];
  const originsData = [
    {
      title: 'Orange',
      data: ['karnataka'],
      sectionimage: require('../assets/images/latcoffee2.png'),
    },
    {
      title: 'Red',
      data: ['karnataka'],
      sectionimage: require('../assets/images/latcoffee3.png'),
    },
    {
      title: 'Brown',
      data: ['karnataka'],
      sectionimage: require('../assets/images/latcoffee1.png'),
    },
    {
      title: 'Black',
      data: ['karnataka'],
      sectionimage: require('../assets/images/latcoffee2.png'),
    },
    {
      title: 'White',
      data: ['karnataka'],
      sectionimage: require('../assets/images/latcoffee3.png'),
    },
  ];
  const handleSectionPress = (section, isFeatured) => {
    navigation.navigate('ProductProfile', {
      sectionData: section,
      isFeatured: isFeatured,
      isLoggedIn: isLoggedIn, // Pass the isLoggedIn status as a parameter
    });
  };
  const handleCart = () => {
    navigation.navigate('Cart', {cartItems});
  };
  return (
    // <ScrollView>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="bars" size={25} color="white" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.subText}>Microffee</Text>
        <Icon
          name="shopping-cart"
          size={25}
          color="white"
          onPress={handleCart}
          style={styles.icon}
        />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.contentScroll}
            showsVerticalScrollIndicator={false}>
            <View style={styles.SubHeader}>
              <Text style={styles.Home}>Featured Coffees</Text>
              <TouchableOpacity>
                <Text style={styles.Viewall}>Viewall</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.itemscontainer}>
                {FeaturedData.map(section => (
                  <TouchableOpacity
                    key={section.title}
                    style={styles.sectionContainer}
                    onPress={() => handleSectionPress(section, true)}>
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
                      source={section.SectionImage[0]}
                      style={styles.sectionImage}
                    />
                    <View style={styles.textItems}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      {section.data.map(item => (
                        <Text key={item} style={styles.item}>
                          {item}
                        </Text>
                      ))}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View style={styles.SubHeader}>
              <Text style={styles.Home}> Latest Products</Text>
              <TouchableOpacity>
                <Text style={styles.Viewall}>Viewall</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.itemscontainer}>
                {latestData.map(section => (
                  <TouchableOpacity
                    key={section.title}
                    style={styles.sectionContainer}
                    onPress={() => handleSectionPress(section, false)}>
                    <Image
                      source={section.Sectionimage[0]}
                      style={styles.sectionImage}
                    />
                    <View style={styles.textItems}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      {section.data.map(item => (
                        <Text key={item} style={styles.item}>
                          {item}
                        </Text>
                      ))}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View style={styles.SubHeader}>
              <Text style={styles.Home}>Origins/Regions</Text>
              <TouchableOpacity>
                <Text style={styles.Viewall}>Viewall</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.itemscontainer}>
                {originsData.map(section => (
                  <View key={section.title} style={styles.SectionContainer}>
                    <View style={styles.imaging}>
                      <Image
                        style={styles.sectionimage}
                        source={section.sectionimage}
                      />
                    </View>
                    <View style={styles.textItem}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'green',
  },
  Header: {
    // flex: 1,
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'green',
  },
  subText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  SubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 2,
  },
  subContainer: {
    flexGrow: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
  },
  contentContainer: {
    flexGrow: 1,
  },
  contentScroll: {
    flex: 1,
  },
  Viewall: {
    marginHorizontal: 13,
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  icon: {
    paddingRight: 25,
  },
  menuIcon: {
    paddingLeft: 20,
  },
  Home: {
    marginHorizontal: 13,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
    color: 'black',
  },
  line: {
    borderBottomWidth: 0.9,
    marginHorizontal: 13,
  },
  itemscontainer: {
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: 8,
    elevation: 5,
  },
  sectionContainer: {
    marginHorizontal: 8,
    elevation: 10,
  },
  SectionContainer: {
    marginHorizontal: 8,
    elevation: 10,
    shadowColor: '#000',
  },
  sectionImage: {
    width: 250,
    height: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  Sectionimage: {
    width: 200,
    height: 80,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  sectionimage: {
    marginHorizontal: 5,
    width: 200,
    height: 85,
    borderRadius: 15,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 18,
    // paddingBottom: 10,
    color: 'black',
  },
  item: {
    fontSize: 14,
    color: 'black',
  },
  textItems: {
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingBottom: 6,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  textItem: {
    paddingLeft: 15,
    marginBottom: 8,
    marginTop: 5,
  },
  featuredContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 2,
    paddingHorizontal: 10,
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
    marginHorizontal: 5,
  },
  itemcontainer: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  imaging: {
    elevation: 10,
  },
});
