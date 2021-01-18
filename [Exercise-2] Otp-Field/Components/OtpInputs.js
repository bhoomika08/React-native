import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

class OtpInputs extends React.Component {
  constructor() {
    super();
    this.state = {
      otp: [],
    };
    this.otpTextInput = [];
  }

  componentDidMount() {
    this.otpTextInput[0].focus();
  }

  focusPrevious(key, index) {
    if (key === 'Backspace' && index !== 0)
      this.otpTextInput[index - 1].focus();
  }

  focusNext(index, value) {
    const {otp} = this.state;
    const {getOtp} = this.props;
    const isNumericValue = /[0-9]/.test(value);
    if (isNumericValue) {
      if (index < this.otpTextInput.length - 1 && value) {
        this.otpTextInput[index + 1].focus();
      }
      otp[index] = value;
      this.setState({otp});

      if (index === this.otpTextInput.length - 1 && value) {
        this.otpTextInput[index].blur();
        getOtp(otp.join(''));
      }
    }
  }

  render() {
    const {inputs} = this.props;
    const {otp} = this.state;
    return (
      <View style={styles.otpView}>
        {inputs.map((input, idx) => {
          const numOtpVal = Number(otp[idx]);
          const otpValue = numOtpVal || numOtpVal == 0 ? numOtpVal : ''
          return (
            <TextInput
              key={idx}
              keyboardType="numeric"
              textAlign="center"
              style={styles.otpField}
              maxLength={1}
              value={otpValue}
              onChangeText={(val) => this.focusNext(idx, val)}
              onKeyPress={(event) =>
                this.focusPrevious(event.nativeEvent.key, idx)
              }
              ref={(ref) => (this.otpTextInput[idx] = ref)}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  otpView: {
    flexDirection: 'row',
  },
  otpField: {
    height: 50,
    width: 50,
    borderColor: 'grey',
    borderWidth: 1,
    margin: 5,
  },
});

export default OtpInputs;
