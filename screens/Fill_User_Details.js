import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
// import {OTP} from './OTP';

const FillUserDetails = ({navigation}) => {
  const countryData = [
    {
      itemName: '+1 US',
    },
    {
      itemName: '+91 IN',
    },
    {
      itemName: '+1 CA',
    },
  ];

  const [userDetails, setUserDetails] = useState({
    mobileNumber: '',
    fisrtName: '',
    lastName: '',
    email: '',
  });

  const [errorMsg, setErrorMsg] = useState({
    mobileNumber: '',
    fisrtName: '',
    lastName: '',
    email: '',
  });

  const [showError, setShowError] = useState({
    mobileNumber: false,
    fisrtName: false,
    lastName: false,
    email: false,
  });

  const [selectedCountry, setSelectedCountry] = useState('+91 IN');
  const [showDropDown, setshowDropDown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const regexMobile = /^\([6-9][0-9]{2}\) [0-9]{3}-[0-9]{4}$/;
  const nameRegex = /^[A-Z a-z]+$/;
  const emailRegex = /^\S+@\S+\.\S{2,3}$/;

  const closeModal = () => {
    setModalVisible(false);
  };

  const numberFormat = text => {
    // //remove all the unwanted texts
    const removeText = text.replace(/[^0-9]/g, '');
    // // format the number
    let formattedNumber = '';
    const length = removeText.length;
    for (var i = 0; i < length; i++) {
      // while (i < length) {
      if (i === 0) {
        formattedNumber += '(';
      } else if (i === 3) {
        formattedNumber += ') ';
      } else if (i === 6) {
        formattedNumber += '-';
      }
      formattedNumber += removeText.charAt(i);
      // i++
    }
    console.log('format', formattedNumber);
    return formattedNumber;
  };
  // dissmiss keyboard
  const dissmissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleButtonClick = () => {
    if (
      userDetails.email === '' ||
      userDetails.fisrtName === '' ||
      userDetails.lastName === '' ||
      userDetails.mobileNumber === ''
    ) {
      setModalVisible(true);
    } else if (!nameRegex.test(userDetails.fisrtName)) {
      setErrorMsg({
        ...errorMsg,
        fisrtName: 'Enter valid name',
      });
      setShowError({
        ...showError,
        fisrtName: true,
      });
    } else if (!nameRegex.test(userDetails.lastName)) {
      setErrorMsg({
        ...errorMsg,
        lastName: 'Enter valid lastName',
      });
      setShowError({
        ...showError,
        lastName: true,
      });
    } else if (!emailRegex.test(userDetails.email)) {
      setErrorMsg({
        ...errorMsg,
        email: 'Enter valid email',
      });
      setShowError({
        ...showError,
        email: true,
      });
    } else if (!regexMobile.test(userDetails.mobileNumber)) {
      setErrorMsg({
        ...errorMsg,
        mobileNumber: 'Enter valid mobileNumber',
      });
      setShowError({
        ...showError,
        mobileNumber: true,
      });
    } else {
      setShowError({
        ...showError,
        mobileNumber: false,
        email: false,
        fisrtName: false,
        lastName: false,
      });
      navigation.navigate('Otp');
    }
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        onPress={dissmissKeyboard}>
        <Image style={styles.img} source={require('../assets/logo1.png')} />
        <View>
          <Text style={styles.firstname}>
            First Name<Text style={styles.star}>*</Text>
          </Text>
          <TextInput
            style={styles.FirstName}
            placeholder="First Name"
            // value={userDetails.fisrtName}
            onChangeText={e => {
              setUserDetails({
                ...userDetails,
                fisrtName: e,
              });
            }}
            onBlur={() => {
              if (!nameRegex.test(userDetails.fisrtName)) {
                setErrorMsg({
                  ...errorMsg,
                  fisrtName: 'Enter valid first name',
                });
                setShowError({
                  ...showError,
                  fisrtName: true,
                });
              }
            }}
            onPressIn={() => {
              setShowError({
                ...showError,
                fisrtName: false,
              });
            }}
          />
          {showError.fisrtName && (
            <Text style={styles.errorText}>{errorMsg.fisrtName}</Text>
          )}
          <Text style={styles.firstname}>
            Last Name<Text style={styles.star}>*</Text>
          </Text>
          <TextInput
            style={styles.FirstName}
            placeholder="Last Name"
            onChangeText={e => {
              setUserDetails({
                ...userDetails,
                lastName: e,
              });
            }}
            // value={LastValue}
            onBlur={() => {
              if (!nameRegex.test(userDetails.lastName)) {
                setErrorMsg({
                  ...errorMsg,
                  lastName: 'Enter valid last name',
                });
                setShowError({
                  ...showError,
                  lastName: true,
                });
              }
            }}
            onPressIn={() => {
              setShowError({
                ...showError,
                lastName: false,
              });
            }}
          />
          {showError.lastName && (
            <Text style={styles.errorText}>{errorMsg.lastName}</Text>
          )}
          <Text style={styles.firstname}>
            Email-address<Text style={styles.star}>*</Text>
          </Text>
          <TextInput
            style={styles.FirstName}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={e => {
              setUserDetails({
                ...userDetails,
                email: e,
              });
            }}
            onBlur={() => {
              if (!emailRegex.test(userDetails.email)) {
                setErrorMsg({
                  ...errorMsg,
                  email: 'Enter valid email',
                });
                setShowError({
                  ...showError,
                  email: true,
                });
              }
            }}
            onPressIn={() => {
              setShowError({
                ...showError,
                email: false,
              });
            }}
          />
          {showError.email && (
            <Text style={styles.errorText}>{errorMsg.email}</Text>
          )}
          <View>
            <Text style={styles.firstname}>
              Mobile Number<Text style={styles.star}>*</Text>
            </Text>
            <View style={styles.dropdownMenu}>
              <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => {
                  setshowDropDown(!showDropDown);
                }}>
                <Text style={styles.dropdownText}>{selectedCountry}</Text>
              </TouchableOpacity>
              <TextInput
                placeholder="Mobile Number"
                style={styles.mobileNo}
                value={userDetails.mobileNumber}
                keyboardType="phone-pad"
                maxLength={14}
                onChangeText={async e => {
                  const formattedNumber = await numberFormat(e);
                  setUserDetails({
                    ...userDetails,
                    mobileNumber: formattedNumber,
                  });
                }}
                onBlur={() => {
                  if (!regexMobile.test(userDetails.mobileNumber)) {
                    setErrorMsg({
                      ...errorMsg,
                      mobileNumber: 'Enter valid number',
                    });
                    setShowError({
                      ...showError,
                      mobileNumber: true,
                    });
                  }
                }}
                onPressIn={() => {
                  setShowError({
                    ...showError,
                    mobileNumber: false,
                  });
                }}
              />
            </View>

            <View style={styles.dropAndError}>
              {showDropDown && (
                <View style={styles.dropdownArea}>
                  {countryData.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.countryitem,
                        item.itemName == selectedCountry &&
                          styles.selectedCountryItem,
                      ]}
                      onPress={() => {
                        setSelectedCountry(item.itemName);
                        setshowDropDown(false);
                      }}>
                      <Text
                        style={[
                          styles.countryText,
                          item.itemName == selectedCountry &&
                            styles.selectedCountryText,
                        ]}>
                        {item.itemName}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {showError.mobileNumber && (
                <Text
                  style={[
                    styles.errorText,
                    {
                      marginLeft: showDropDown ? 30 : 120,
                    },
                  ]}>
                  {errorMsg.mobileNumber}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
            <Text style={styles.next}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {modalVisible && (
        <Modal visible={true} transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Please Enter All The Reqiured Details
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};
export default FillUserDetails;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
    marginTop: 30,
    marginBottom: 5,
    alignSelf: 'center',
  },
  FirstName: {
    borderWidth: 2,
    width: 350,
    borderRadius: 8,
    borderColor: '#81C0EF',
    fontSize: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  firstname: {
    marginBottom: 11,
    fontSize: 17,
  },
  star: {
    color: 'red',
    fontSize: 22,
  },
  mobileNo: {
    borderColor: '#81C0EF',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: 'white',
    width: 280,
  },
  next: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    margin: 25,
    backgroundColor: '#52850f', //green
    padding: 10,
    borderRadius: 25,
    width: 325,
    height: 50,
  },
  errorText: {
    color: 'red',
  },
  dropdownMenu: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#81C0EF',
    // marginHorizontal: 10,
  },
  dropdownSelector: {
    width: 70,
    height: 50,
    backgroundColor: '#dadbdd',
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 19,
  },
  dropdownArea: {
    // alignItems: 'center',
    width: 70,
    borderLeftWidth: 1,
    // marginLeft: 20,
    borderRightWidth: 1,
    backgroundColor: 'white',
    borderColor: '#81C0EF',
    shadowColor: 'black',
    elevation: 8,
    // right: 40,
  },
  dropAndError: {
    flexDirection: 'row',
  },
  countryText: {
    fontSize: 20,
    padding: 1,
  },
  bottom: {
    // top: 50,
    flex: 1,
    justifyContent: 'flex-end',
  },
  selectedCountryItem: {
    backgroundColor: '#52850f',
    color: 'white',
  },
  selectedCountryText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: 45,
    marginHorizontal: 45,
    paddingVertical: 40,
    borderRadius: 12,
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  modalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#52850f',
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
