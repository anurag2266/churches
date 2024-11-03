import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { CSS_STYLES, FONT_STYLES, LIGHT_THEME, THEME_COLOR } from '../../commonconfig/constStyle';
import { CustomButton, CustomInput, TouchableItems } from '../../components';
import images from '../../commonconfig/images';
import SignUp from './SignUp';
import Loader from '../../components/Loader';
import { BaseUrl } from '../../commonconfig/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function Login({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState('login');
    const [email, setEmail] = useState({ mail: '', err: '' });
    const [password, setPassword] = useState({ pass: '', err: '' });
    const [secureText, setSecureText] = useState(true);

    const Loginhandeler = async () => {
        setLoading(true);
        try {
            let data = new FormData();
            data.append('email', email?.mail);
            data.append('password', password?.pass);

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: BaseUrl + 'login',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: data,
            };

            const response = await axios.request(config);

            if (response?.data?.success) {
                await AsyncStorage.setItem('userdata', JSON.stringify(response?.data?.data));
                Toast.show({
                    text1: 'Login Successful',
                    text2: 'Welcome back!',
                    type: 'success',
                });
                navigation.replace('MyStack');
            } else {
                Toast.show({
                    text1: 'Login Failed',
                    text2: 'Invalid credentials',
                    type: 'error',
                });
            }
        } catch (error) {
            console.error("Login Error:", error);
            Toast.show({
                text1: 'Login Failed',
                text2: error?.response?.data?.message || "Something went wrong",
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const validationHandeler = () => {
        let hasError = false;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        // Check email validity
        if (!email?.mail || email?.mail.trim() === '' || !emailRegex.test(email?.mail.trim())) {
            hasError = true;
            setEmail({ ...email, err: 'Invalid Email' });
            // Toast.show({
            //     text1: 'Validation Error',
            //     text2: 'Invalid Email',
            //     type: 'error',
            // });
        } else {
            setEmail({ ...email, err: '' });
        }

        // Check password validity
        if (!password?.pass || password?.pass.trim() === '' || !passwordRegex.test(password?.pass.trim())) {
            hasError = true;
            setPassword({ ...password, err: 'Invalid Password' });
            // Toast.show({
            //     text1: 'Validation Error',
            //     text2: 'Invalid Password',
            //     type: 'error',
            // });
        } else {
            setPassword({ ...password, err: '' });
        }

        Loginhandeler();

        // If no errors, proceed to login
        // if (!hasError) {

        // }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Loader loading={loading} />
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <Text style={{ ...FONT_STYLES.h15, letterSpacing: 2, textAlign: 'center', marginTop: 20 }}>FRIDAY NIGHT</Text>
            <Text style={{ ...FONT_STYLES.h15, letterSpacing: 2, textAlign: 'center', }}>CHURCHES</Text>
            <View style={[styles.buttonsContainer]}>
                <TouchableItems text={'Login'} containerStyle={{ flex: 1, flexDirection: 'column' }}
                    textStyle={{ ...FONT_STYLES.hb16 }}
                    onPress={() => { setSelectedTab('login') }}
                >
                    {selectedTab == 'login' ? <View style={{ height: 2, width: 30, backgroundColor: 'red', marginTop: 5 }} /> : null}
                </TouchableItems>
                <View style={{ borderLeftWidth: 2.5, borderLeftColor: '#ccc', height: 35 }} />
                <TouchableItems text={'SignUp'} containerStyle={{ flex: 1, flexDirection: 'column' }}
                    textStyle={{ ...FONT_STYLES.hb16 }}
                    onPress={() => { setSelectedTab('signup') }} >
                    {selectedTab == 'signup' ? <View style={{ height: 2, width: 30, backgroundColor: 'red', marginTop: 5 }} /> : null}
                </TouchableItems>
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: '#f6f5f7', paddingHorizontal: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                {selectedTab == 'login' ?
                    <View style={{ paddingVertical: 10, }}>
                        <CustomInput
                            placeholder="Email Address"
                            onChangeText={(e) => { setEmail({ mail: e, err: '' }) }}
                            value={email?.mail}
                            containerStyle={{ marginVertical: 10, }}
                        />

                        <CustomInput
                            placeholder="Password"
                            secureTextEntry={secureText}
                            onChangeText={(e) => { setPassword({ pass: e, err: '' }) }}
                            value={password?.pass}
                            rightImage={secureText ? images.eyeopen : images.eyeclose}
                            onPressRight={() => { setSecureText(!secureText) }}
                            containerStyle={{ marginVertical: 10, }}
                        />
                        <CustomButton title={'Login'} gradientStyle={{ marginVertical: 10, }}
                            onPress={() => { validationHandeler() }}
                        />
                        <Text style={{ ...FONT_STYLES.hb16, color: THEME_COLOR, textAlign: 'center', marginVertical: 10, color: 'blue' }}>Forgot Password?</Text>
                    </View>
                    : <SignUp navigation={navigation} />}
                <View style={{}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
                        <View style={[styles.orContainer, {}]}>
                            <Text style={{ textAlign: 'center', flex: 1, }}>OR</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
                    </View>
                    <TouchableItems text={'Google'}
                        image={images.google} imageStyle={{ ...CSS_STYLES.i2, marginRight: 5 }}
                        containerStyle={styles.googleBtn}
                    />
                    <TouchableItems text={'Facebook'}
                        image={images.facebook} imageStyle={{ ...CSS_STYLES.i2, marginRight: 5 }}
                        containerStyle={styles.googleBtn}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#ccc',
        ...CSS_STYLES.cf2,
        padding: 5,
        marginTop: 20,
        marginHorizontal: 15,
        marginBottom: 15,
        marginTop: 30
    },
    orContainer: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    googleBtn: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 25,
        marginTop: 20
    }
});
