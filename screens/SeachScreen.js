import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const SearchScreen = ({ navigation }) => {
  const handleSearch = (text) => {
    // Handle the search functionality here
    console.log('Searching for:', text);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TextInput
        placeholder="Search..."
        onChangeText={handleSearch}
        onSubmitEditing={() => navigation.navigate('Search')} // Navigate to the same screen to trigger the search functionality
        style={{ borderWidth: 1, padding: 10, width: '80%' }}
      />
    </View>
  );
};

export default SearchScreen;