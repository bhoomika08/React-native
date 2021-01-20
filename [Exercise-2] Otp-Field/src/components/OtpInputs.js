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

  focusInput(index, value) {
    const {otp} = this.state;
    const {getOtp} = this.props;

    if (value == '' && index != 0) {
      otp[index - 1].ref.current.focus();
    }

    const isNumericValue = numRegex.test(value);
    if (!isNumericValue) {
      return;
    }
    if (index < otp.length - 1) {
      otp[index + 1].ref.current.focus();
    }
    otp[index]['value'] = value;
    this.setState({otp});

    if (index === otp.length - 1) {
      otp[index].ref.current.blur();
      const otpValue = otp.map(({value}) => value);
      getOtp(otpValue.join(''));
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
          const {value, isActive, ref} = otp[idx];
          const numOtpVal = Number(value);
          const otpValue = numOtpVal || numOtpVal == 0 ? numOtpVal : '';
          return (
            <TextInput
              key={`otp-${idx}`}
              keyboardType="numeric"
              autoFocus={idx == 0 ? true : false}
              style={[
                styles.otpField,
                isActive ? styles.activeOtpField : styles.deactiveOtpField,
              ]}
              onFocus={() => this.activateInput(idx)}
              onBlur={() => this.deactivateInput(idx)}
              maxLength={1}
              value={otpValue}
              onChangeText={(val) => this.focusInput(idx, val)}
              ref={ref}
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
