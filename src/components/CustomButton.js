import React from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { LIGHT_THEME, THEME_COLOR } from '../commonconfig/constStyle';
import LinearGradient from 'react-native-linear-gradient';
export default function CustomButton({
    gradientStyle, colors,
    onPress,
    title,
    titleStyle,
    style,
    loadding,
    disabled,
    border,
    children
}) {

    return (
        <TouchableOpacity
            disabled={disabled == true ? true : false}
            // style={[{},style]}
            style={[styles.navBtn, {
                borderWidth: border ? 1 : 0, backgroundColor: border ? 'transparent' : '#000',
                borderColor: border ? LIGHT_THEME : 'transparent',
            }, gradientStyle]}
            onPress={onPress}>
            {/* <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={colors ? colors : border ? ['transparent', 'transparent'] : [LIGHT_THEME, THEME_COLOR]}
                style={[styles.navBtn, {
                    borderWidth: border ? 1 : 0, backgroundColor: border ? 'transparent' : 'transparent',
                    borderColor: border ? LIGHT_THEME:'transparent' ,
                }, gradientStyle]}> */}
            {loadding ?
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.titleStylePrime, titleStyle]}>{title}</Text>
                    <ActivityIndicator size='small' color="#fff" />
                </View>
                : <Text style={[styles.titleStylePrime, { color: border ? LIGHT_THEME : '#fff', fontWeight: border ? 500 : 'bold' }, titleStyle]}>{title}</Text>}
            {/* </LinearGradient> */}
            {children}
        </TouchableOpacity>
        // </View>

    );
}

const styles = StyleSheet.create({
    titleStylePrime: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '800',
    },
    navBtn: {
        backgroundColor: THEME_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 25,

        // marginHorizontal: '5%',
        // borderRadius: 10,
        // marginVertical: '2%'
    },
})
