import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet, Keyboard, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SearchScreen = () => {
  const navigation = useNavigation();

  const handleSearch = text => {
    // Handle the search functionality here
    console.log('Searching for:', text);
  };

  const DissmissKeyboard = () => {
   Keyboard.dismiss();
  };

  return (
    <KeyboardAwareScrollView style={styles.container} onPress={DissmissKeyboard}>
    <View style={styles.body}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconContainer}>
        <Icon name="angle-left" size={30} color={'black'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="search" size={22} color={'gray'} />
      </TouchableOpacity>
      <TextInput
        placeholder="Search..."
        onChangeText={handleSearch}
        keyboardType="default"
        onSubmitEditing={() => navigation.navigate('Search')}
        style={styles.input}
      />
    </View>
    <View>
      <Text style={styles.text}>
        Search for an item!
      </Text>
    </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    width: 325,
    borderBottomWidth: 1,
    marginRight: 20,
    marginLeft: 4,
    fontSize: 15,
  },
  iconContainer: {
    marginLeft: 10,
    marginTop: 10,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 25,
    fontWeight: '700',
  },
});

export default SearchScreen;
