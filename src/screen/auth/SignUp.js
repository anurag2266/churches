import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { CSS_STYLES, FONT_STYLES, BaseUrl } from '../../commonconfig/constStyle';
import { CustomButton, CustomInput } from '../../components';
import images from '../../commonconfig/images';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import Toast from 'react-native-toast-message'; // Import Toast

export default function SignUp({ navigation }) {
  const [Fname, setFname] = useState({ name: '', err: '' });
  const [Lname, setLname] = useState({ name: '', err: '' });
  const [email, setEmail] = useState({ mail: '', err: '' });
  const [password, setPassword] = useState({ pass: '', err: '' });
  const [cpassword, setcPassword] = useState({ pass: '', err: '' });
  const [secureText, setSecureText] = useState(true);
  const [secureText2, setSecureText2] = useState(true);
  const [loading, setLoading] = useState(false);

  const signuphandeler = async () => {
    let data = new FormData();
    data.append('name', Fname?.name + ' ' + Lname?.name);
    data.append('email', email?.mail);
    data.append('password', password?.pass);
    data.append('c_password', cpassword?.pass);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: BaseUrl + 'register',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      setLoading(false);
      if (response?.data?.success) {
        await AsyncStorage.setItem('userdata', JSON.stringify(response?.data?.data));
        Toast.show({ text1: 'Registration Successful', position: 'top', type: 'success' });
        navigation.replace('MyStack');
      }
    } catch (error) {
      setLoading(false);
      Toast.show({ text1: 'Registration Failed', text2: error?.response?.data?.message || "Something went wrong", position: 'top', type: 'error' });
      console.log(error);
    }
  };

  const validationHandeler = () => {
    let hasError = false;
    const nameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!Fname?.name || Fname?.name.trim() === '' || !nameRegex.test(Fname?.name.trim())) {
      hasError = true;
      setFname({ ...Fname, err: 'Invalid First Name' });
      return;
    }
    if (!Lname?.name || Lname?.name.trim() === '' || !nameRegex.test(Lname?.name.trim())) {
      hasError = true;
      setLname({ ...Lname, err: 'Invalid Last Name' });
      return;
    }
    if (!email?.mail || email?.mail.trim() === '' || !emailRegex.test(email?.mail.trim())) {
      hasError = true;
      setEmail({ ...email, err: 'Invalid Email' });
      return;
    }
    if (!password?.pass || password?.pass.trim() === '' || !passwordRegex.test(password?.pass.trim())) {
      hasError = true;
      setPassword({ ...password, err: 'Invalid Password' });
      return;
    }
    if (cpassword?.pass !== password?.pass) {
      hasError = true;
      setcPassword({ ...cpassword, err: 'Password does not match' });
      return;
    }
    if (!hasError) {
      setLoading(true);
      signuphandeler();
    }
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      <Loader loading={loading} />
      <View style={{ flexDirection: 'row', gap: 15 }}>
        <CustomInput
          placeholder="First Name"
          onChangeText={(e) => { setFname({ name: e, err: '' }) }}
          value={Fname?.name}
          error={Fname?.err}
          mainContainer={{ flex: 1 }}
          containerStyle={{ marginVertical: 10 }}
        />
        <CustomInput
          placeholder="Last Name"
          onChangeText={(e) => { setLname({ name: e, err: '' }) }}
          value={Lname?.name}
          error={Lname?.err}
          mainContainer={{ flex: 1 }}
          containerStyle={{ marginVertical: 10 }}
        />
      </View>
      <CustomInput
        placeholder="Email Address"
        onChangeText={(e) => { setEmail({ mail: e, err: '' }) }}
        value={email?.mail}
        error={email?.err}
        containerStyle={{ marginVertical: 10 }}
      />
      <CustomInput
        placeholder="Password"
        secureTextEntry={secureText}
        onChangeText={(e) => { setPassword({ pass: e, err: '' }) }}
        value={password?.pass}
        error={password?.err}
        rightImage={secureText ? images.eyeopen : images.eyeclose}
        onPressRight={() => { setSecureText(!secureText) }}
        containerStyle={{ marginVertical: 10 }}
      />
      <CustomInput
        placeholder="Confirm Password"
        secureTextEntry={secureText2}
        onChangeText={(e) => { setcPassword({ pass: e, err: '' }) }}
        value={cpassword?.pass}
        error={cpassword?.err}
        rightImage={secureText2 ? images.eyeopen : images.eyeclose}
        onPressRight={() => { setSecureText2(!secureText2) }}
        containerStyle={{ marginVertical: 10 }}
      />
      <CustomButton
        title={'Signup'}
        gradientStyle={{ marginVertical: 10 }}
        onPress={() => { validationHandeler() }}
      />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({});
