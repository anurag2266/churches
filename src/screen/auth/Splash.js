import { ImageBackground, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import images from '../../commonconfig/images';
import { CSS_STYLES } from '../../commonconfig/constStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Splash = ({ navigation }) => {
    useEffect(() => {
        const getAsyncdata = async () => {
            try {
                const userdata = await AsyncStorage.getItem("userdata");
                const parsedUserData = userdata ? JSON.parse(userdata) : null;

                console.log('User Data:', parsedUserData);

                if (parsedUserData?.token) {
                    console.log('Token found, navigating to MyStack.');
                    navigation.replace("MyStack");
                } else {
                    console.log('No token found, navigating to Login.');
                    navigation.replace("Login");
                }
            } catch (error) {
                console.error('Error retrieving user data from AsyncStorage:', error);
                navigation.replace("Login"); // Navigate to Login on error
            }
        };

        const timer = setTimeout(getAsyncdata, 3000);
        return () => clearTimeout(timer); // Clear timer if component unmounts
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={images.Splash} resizeMode='cover' style={{ flex: 1 }}>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1, ...CSS_STYLES.c1 }} />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({});
