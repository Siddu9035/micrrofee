import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const SetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePass, setHidePassword] = useState(false);
  const [hidePassConfirm, setHidePassConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const validatePassword = () => {
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    if (password == '') {
      setPasswordError('please enter password');
    } else if (!passwordPattern.test(password)) {
      setPasswordError(
        'Password must be 8 characters long, maximum 20 characters, containing at least one uppercase letter, one lowercase letter, one special character, and one numeric digit.',
      );
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    if (password === text) {
      setPasswordConfirmError('');
    }
  };

  const dissmissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onPress={dissmissKeyboard}>
      <Image source={require('../assets/logo1.png')} style={styles.img}></Image>
      <View style={styles.textInput}>
        <TextInput
          style={styles.Password}
          placeholder="Enter your Password"
          maxLength={20}
          secureTextEntry={!hidePass}
          onChangeText={e => handlePasswordChange(e)}
          onFocus={() => setPasswordError('')}
          onBlur={validatePassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setHidePassword(!hidePass)}>
          <Icon name={hidePass ? 'eye' : 'eye-slash'} size={25} color="black" />
        </TouchableOpacity>
      </View>
      {passwordError !== '' && (
        <Text style={styles.errortext}>{passwordError}</Text>
      )}
      <View style={styles.textInput}>
        <TextInput
          style={styles.Password}
          placeholder="Confirm your Password"
          maxLength={20}
          secureTextEntry={!hidePassConfirm}
          onChangeText={e => handleConfirmPasswordChange(e)}
          onFocus={() => setPasswordConfirmError('')}
          onBlur={() => {
            if (confirmPassword == '') {
              setPasswordConfirmError('please enter confirm password');
            } else if (password !== confirmPassword) {
              setPasswordConfirmError('password do not match');
            } else {
              setPasswordConfirmError('');
            }
          }}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setHidePassConfirm(!hidePassConfirm)}>
          <Icon
            name={hidePassConfirm ? 'eye' : 'eye-slash'}
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {passwordConfirmError !== '' && (
        <Text style={styles.errortext}>{passwordConfirmError}</Text>
      )}
      <View>
        <TouchableOpacity style={styles.resetbutton} onPress={validatePassword}>
          <Text style={styles.resetpass}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default SetPasswordScreen;
const styles = StyleSheet.create({
  container: {
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
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    paddingRight: 50,
    marginHorizontal: 25,
  },
  textInput: {
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
    alignSelf: 'flex-start',
    marginHorizontal: 30,
  },
});
