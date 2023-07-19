import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet } from 'react-native';

const TestScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },

  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="0"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        dropDownStyle={styles.dropdownStyle}
        labelStyle={styles.dropdownLabel}
        selectedLabelStyle={styles.dropdownSelectedLabel}
        showTickIcon={false}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  dropdown: {
    width: '40%',
    height: 40,
    marginBottom: 20,
    alignSelf: 'center',
    borderWidth: 0,
    elevation: 10,
    borderRadius: 0,
  },
  dropdownContainer: {
    width: '40%',
    maxHeight: 200,
    alignSelf: 'center',
    borderColor: 'black',
  },
  dropdownStyle: {
    backgroundColor: '#CD5C5C',
    borderColor: 'green'
  },
  dropdownLabel: {
    color: 'blue',
  },
  dropdownSelectedLabel: {
    color: 'gold',
  },
});

export default TestScreen;
