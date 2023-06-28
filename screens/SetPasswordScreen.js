import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const SetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePass, setHidePassword] = useState(false);
  const [hidePassConform, setHidePassConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const validatePassword = () => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError('Password must be 8 characters long, max20Characters one upperCase, oneLowerCase, oneSpecialCharacter, oneNumeric');
    } else {
      setPasswordError('');
    }
  
    if (password !== confirmPassword) {
      if (confirmPassword === '') {
        setPasswordConfirmError('enter confirm password');
      } else {
        setPasswordConfirmError('Passwords do not match');
      }
    } else {
      setPasswordConfirmError('');
    }
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (password === text) {
      setPasswordConfirmError('');
    }
  };
  return (
    <View style={styles.body}>
      <Image source={require('../assets/logo1.png')} style={styles.img}></Image>
      <View style={styles.container}>
        <TextInput
          style={styles.Password}
          placeholder="Enter your Password"
          maxLength={20}
          secureTextEntry={!hidePass}
          onChangeText={e => handlePasswordChange(e)}
          onFocus={() => setPasswordError('')}
          onBlur={() => {
            if (password.trim() === '') {
              setPasswordError('Password cannot be empty');
            } else {
              setPasswordError('');
            }
          }}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setHidePassword(!hidePass)}>
          <Icon name={hidePass ? 'eye' : 'eye-slash'} size={25} color="black" />
        </TouchableOpacity>
      </View>
      {passwordError !== '' && <Text style={styles.errortext}>{passwordError}</Text>}
      <View style={styles.container}>
        <TextInput
          style={styles.Password}
          placeholder="Confirm your Password"
          maxLength={20}
          secureTextEntry={!hidePassConform}
          onChangeText={e => handleConfirmPasswordChange(e)}
          onFocus={() => setPasswordConfirmError('')}
          onBlur={() => {
            if (confirmPassword.trim() === '') {
              setPasswordConfirmError('Confirm password cannot be empty');
            } else {
              setPasswordConfirmError('');
            }
          }}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setHidePassConfirm(!hidePassConform)}>
          <Icon
            name={hidePassConform ? 'eye' : 'eye-slash'}
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {passwordConfirmError !== '' && <Text style={styles.errortext}>{passwordConfirmError}</Text>}
      <View>
        <TouchableOpacity style={styles.resetbutton} onPress={validatePassword}>
          <Text style={styles.resetpass}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SetPasswordScreen;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    width: 150,
    height: 150,
    marginTop: 50,
  },
  Password: {
    flex: 1,
    height: 55,
    fontSize: 18,
    borderWidth: 2,
    borderColor: 'lightblue',
    borderRadius: 7,
    width: 350,
    // marginLeft: 40,
    alignItems: 'center',
    marginTop: 10,
    marginBottom : 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    paddingRight: 50,
    marginHorizontal: 25,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 25,
    right: 50,
  },
  resetpass: {
    color: 'white',
  },
  resetbutton: {
    backgroundColor: '#52850f',
    width: 345,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
    borderRadius: 20,
  },
  errortext: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 15,
  },
});
