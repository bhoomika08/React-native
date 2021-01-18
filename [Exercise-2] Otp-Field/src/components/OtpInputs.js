import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Global, Colors, Spacing} from '../styles';

const numRegex = /[0-9]/;

const createRef = (inputs) => inputs.map(() => ({ref: React.createRef()}));

class OtpInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: createRef(props.inputs),
    };
  }

  focusPrevious(key, index) {
    const {otp} = this.state;
    if (key === 'Backspace' && index !== 0) {
      otp[index - 1].ref.current.focus();
    }
  }

  focusNext(index, value) {
    const {otp} = this.state;
    const {getOtp} = this.props;
    const isNumericValue = numRegex.test(value);
    if (isNumericValue) {
      if (index < otp.length - 1 && value) {
        otp[index + 1].ref.current.focus();
      }
      otp[index]['value'] = value;
      this.setState({otp});

      if (index === otp.length - 1 && value) {
        otp[index].ref.current.blur();
        const otpValue = otp.map(({value}) => value);
        getOtp(otpValue.join(''));
      }
    }
  }

  activateInput(index) {
    const {otp} = this.state;
    otp[index]['isActive'] = true;
    this.setOtp(otp);
  }

  deactivateInput(index) {
    const {otp} = this.state;
    otp[index]['isActive'] = false;
    this.setOtp(otp);
  }

  setOtp(otp) {
    this.setState({
      otp,
    });
  }

  render() {
    const {inputs} = this.props;
    const {otp} = this.state;
    return (
      <View style={styles.otpView}>
        {inputs.map((input, idx) => {
          const numOtpVal = Number(otp[idx]?.value);
          const otpValue = numOtpVal || numOtpVal == 0 ? numOtpVal : '';
          return (
            <TextInput
              key={`otp-${idx}`}
              keyboardType="numeric"
              autoFocus={idx == 0 ? true : false}
              style={[
                styles.otpField,
                otp[idx]?.isActive
                  ? styles.activeOtpField
                  : styles.deactiveOtpField,
              ]}
              onFocus={() => this.activateInput(idx)}
              onBlur={() => this.deactivateInput(idx)}
              maxLength={1}
              value={otpValue}
              onChangeText={(val) => this.focusNext(idx, val)}
              onKeyPress={(event) =>
                this.focusPrevious(event.nativeEvent.key, idx)
              }
              ref={otp[idx].ref}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  otpView: {
    ...Global.rowFlex,
  },
  otpField: {
    height: 50,
    width: 50,
    borderWidth: 1,
    ...Spacing.m5,
    ...Global.textCenter,
  },
  activeOtpField: {
    borderColor: Colors.blue,
  },
  deactiveOtpField: {
    borderColor: Colors.grey,
  },
});

export default OtpInputs;
