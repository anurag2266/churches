import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient';
import { CSS_STYLES } from '../commonconfig/constStyle';

export default function TouchableItems({
    containerStyle,
    gradientStyle, colors,
    onPress, disabled,
    image, imageStyle,
    text, textStyle,
    image2, imageStyle2,
    children
}) {

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }, containerStyle]}>
            {image ? <Image source={image} style={[{ ...CSS_STYLES.i4}, imageStyle]} /> : null}
            {text ? <Text style={[{ fontSize: 14, color:'#000' }, textStyle]} >{text}</Text> : null}
            {image2 ? <Image source={image2} style={[{ ...CSS_STYLES.i3 }, imageStyle2]} /> : null}
            {children}
        </TouchableOpacity>
      
    )

}
 // <LinearGradient
        //     start={{ x: 0, y: 0 }}
        //     end={{ x: 0, y: .8 }}
        //     colors={colors ? colors : ['transparent', 'transparent']}
        // style={[{ alignItems: 'center', justifyContent: 'center', }, gradientStyle]}>
       
        // </LinearGradient>