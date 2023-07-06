import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OtpInputs from 'react-native-otp-inputs';

const OtpScreen = ({navigation}) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let intervalId;
    // if timer is active
    if (isTimerActive && timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    if (timer === 0) {
      // if timer isequal to 0 then clear the interval time
      clearInterval(intervalId);
      // set timer to false
      setTimerActive(false);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerActive, timer]);

  const handleSubmit = () => {
    if (enteredValue.length < 4 || !/^[0-9]+$/.test(enteredValue)) {
      setOtpError('Enter Valid Otp');
    } else {
      setOtpError('');
      setTimer(0);
      navigation.navigate('SetPassword');
    }
  };

  const handleOtpChange = text => {
    const otpRegex = /^[0-9]+$/; // Regex pattern to match only digits

    if (otpRegex.test(text)) {
      const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      setEnteredValue(numericText);
      setOtpError('');
    } else {
      setOtpError('Enter Valid OTP');
    }
  };

  // function for handleresend otp
  const handleResendOtp = () => {
    if (!isTimerActive) {
      // setOtp('');
      // setOtpError('');
      setTimer(30);
      setTimerActive(true);
    } else {
      setEnteredValue('');
      setOtpError('');
    }
  };

  const formattedTimer = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`;

  const dissmissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      onPress={dissmissKeyboard}>
      <View>
        <Image style={styles.img} source={require('../assets/images/logo1.png')} />
        {otpError && <Text style={styles.errorText}>{otpError}</Text>}
        <OtpInputs
          handleChange={text => handleOtpChange(text)}
          numberOfInputs={4}
          // value={enteredValue}
          autofillFromClipboard={false}
          style={styles.inputField}
          keyboardType="phone-pad"
          inputStyles={styles.textInput}
        />
        {!isTimerActive ? (
          <TouchableOpacity
            style={styles.ResendButton}
            onPress={handleResendOtp}>
            <View style={styles.timerResend}>
              <Text style={styles.Resend}>Resend OTP</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.ResendButton}>
            <View style={styles.timerResend}>
              <Text style={styles.Resend}>Resend OTP in</Text>
              <Text style={styles.timerText}>{formattedTimer}</Text>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
          <Text style={styles.next}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default OtpScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  img: {
    width: 220,
    height: 220,
    marginTop: 30,
    marginBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1.5,
    fontSize: 25,
    borderColor: 'skyblue',
    paddingHorizontal: 20,
  },
  inputField: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  Resend: {
    fontSize: 20,
    color: '#20688F',
  },
  ResendButton: {
    alignItems: 'flex-end',
    marginHorizontal: 35,
    marginVertical: 15,
  },
  next: {
    padding: 10,
    backgroundColor: '#52850f',
    color: 'white',
    width: 340,
    textAlign: 'center',
    borderRadius: 25,
    marginVertical: 25,
    fontSize: 20,
  },
  nextButton: {
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1.5,
    width: 60,
    borderColor: '#57BAEF',
    textAlign: 'center',
    fontSize: 20,
    color: '#20688F',
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  activeResendButton: {
    opacity: 1,
  },
  timerResend: {
    flexDirection: 'row',
  },
  timerText: {
    marginHorizontal: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    color: '#20688F',
    fontSize: 19,
  },
});
