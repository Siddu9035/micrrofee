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

const HomeScreen = ({navigation}) => {
  const FeaturedData = [
    {
      title: 'java',
      data: ['Central America', 'BalckCoffee'],
      SectionImage: require('../assets/images/coffee_1.png'),
    },
    {
      title: 'javaScript',
      data: ['America', 'BrownCoffee'],
      SectionImage: require('../assets/images/coffee_2.png'),
    },
    {
      title: 'python',
      data: ['North America', 'YellowCoffee'],
      SectionImage: require('../assets/images/coffee_3.png'),
    },
    {
      title: 'Swift',
      data: ['india', 'KesarCoffee'],
      SectionImage: require('../assets/images/coffee_3.png'),
    },
    {
      title: 'AngularJs',
      data: ['Europe', 'RedCoffee'],
      SectionImage: require('../assets/images/coffee_3.png'),
    },
  ];
  const latestData = [
    {
      title: 'Orange',
      data: ['Mumbai',],
      Sectionimage: require('../assets/images/latcoffee1.png'),
    },
    {
      title: 'Red',
      data: ['Karnataka',],
      Sectionimage: require('../assets/images/latcoffee2.png'),
    },
    {
      title: 'Brown',
      data: ['Kerala',],
      Sectionimage: require('../assets/images/latcoffee3.png'),
    },
    {
      title: 'Black',
      data: ['Goa',],
      Sectionimage: require('../assets/images/latcoffee1.png'),
    },
    {
      title: 'White',
      data: ['uttarPradesh',],
      Sectionimage: require('../assets/images/latcoffee2.png'),
    },
  ];
  const originsData = [
    {
      title: 'Orange',
      sectionimage: require('../assets/images/latcoffee1.png'),
    },
    {
      title: 'Red',
      sectionimage: require('../assets/images/latcoffee2.png'),
    },
    {
      title: 'Brown',
      sectionimage: require('../assets/images/latcoffee3.png'),
    },
    {
      title: 'Black',
      sectionimage: require('../assets/images/latcoffee1.png'),
    },
    {
      title: 'White',
      sectionimage: require('../assets/images/latcoffee2.png'),
    },
  ];
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
          style={styles.icon}
        />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.contentContainer}>
          <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.SubHeader}>
              <Text style={styles.Home}>Featured Coffees</Text>
              <TouchableOpacity>
                <Text style={styles.Viewall}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.itemscontainer}>
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
                    <View style={styles.textItems}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      {section.data.map(item => (
                        <Text key={item} style={styles.item}>
                          {item}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={styles.SubHeader}>
              <Text style={styles.Home}> Latest Products</Text>
              <TouchableOpacity>
                <Text style={styles.Viewall}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.itemscontainer}>
                {latestData.map(section => (
                  <View key={section.title} style={styles.sectionContainer}>
                    <Image
                      style={styles.Sectionimage}
                      source={section.Sectionimage}
                    />
                    <View style={styles.textItems}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      {section.data.map(item => (
                        <Text key={item} style={styles.item}>
                          {item}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={styles.SubHeader}>
              <Text style={styles.Home}>Origins/Regions</Text>
              <TouchableOpacity>
                <Text style={styles.Viewall}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.itemscontainer}>
                {originsData.map(section => (
                  <View key={section.title} style={styles.SectionContainer}>
                    <Image
                      style={styles.sectionimage}
                      source={section.sectionimage}
                    />
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
  },
  sectionContainer: {
    marginHorizontal: 8,
    elevation: 10,
    shadowColor: '#000',
    borderRadius: 15,
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 10,
    },
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
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
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
});
