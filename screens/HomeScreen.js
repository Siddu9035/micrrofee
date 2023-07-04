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
const HomeScreen = () => {
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
      data: ['Mumbai', 'redCoffee'],
      Sectionimage: require('../assets/images/latcoffee1.png'),
    },
    {
      title: 'Red',
      data: ['Karnataka', 'blackcoffee'],
      Sectionimage: require('../assets/images/latcoffee2.png'),
    },
    {
      title: 'Brown',
      data: ['Kerala', 'bluecoffee'],
      Sectionimage: require('../assets/images/latcoffee3.png'),
    },
    {
      title: 'Black',
      data: ['Goa', 'pistacoffee'],
      Sectionimage: require('../assets/images/latcoffee1.png'),
    },
    {
      title: 'White',
      data: ['uttarPradesh', 'reddishcoffee'],
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
    <ScrollView style={styles.contentcontainer}>
      <View style={styles.container}>
        <View style={styles.header}>
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
        <View style={styles.header}>
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
        <View style={styles.header}>
          <Text style={styles.Home}>Origins/Regions</Text>
          <TouchableOpacity>
            <Text style={styles.Viewall}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.itemscontainer}>
            {originsData.map(section => (
              <View key={section.title} style={styles.sectionContainer}>
                <Image
                  style={styles.sectionimage}
                  source={section.sectionimage}
                />
                <View style={styles.textItems}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {/* {section.data.map(item => (
                    <Text key={item} style={styles.item}>
                      {item}
                    </Text>
                  ))} */}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
     </ScrollView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  contentcontainer: {
    flex: 1,
    backgroundColor:'#52850f',
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#f6f6f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  Viewall: {
    marginHorizontal: 13,
    fontSize: 18,
    fontWeight: '700',
  },
  Home: {
    marginHorizontal: 13,
    fontSize: 18,
    fontWeight: '700',
  },
  line: {
    borderWidth: 0.9,
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
    width: 200,
    height: 80,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 18,
    // paddingBottom: 10,
  },
  item: {
    fontSize: 16,
  },
  textItems: {
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingBottom: 6,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  featuredContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
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
