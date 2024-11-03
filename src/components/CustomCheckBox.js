import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import images from '../commonconfig/images';
import { BLUE, CSS_STYLES, FONT_STYLES } from '../commonconfig/constStyle';

export default function CustomCheckBox({
    containerStyle,
    onPress,
    square,
    isChecked,
    touchableStyle,
    imageStyle,
    // lable1container,
    // label1, subText1,
    disabled,
    label,
    label2,
    textStyle,
    subText, subTextStyle
}) {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: isChecked ? BLUE : 'transparent', borderBottomColor: isChecked ? '#fff' : 'transparent' }, containerStyle]}>
            {/* {label1 ? <View style={[{ flex: 1 }, lable1container]}>
                <Text style={[{ color: '#090909', flex: 1 }, textStyle]}>{label1}</Text>
                {subText1 ? <Text style={[{ color: '#090909', opacity: .5, fontSize: 11, flex: 1 }, subTextStyle]}>{subText1}</Text> : null}
            </View> : null} */}
            <TouchableOpacity onPress={onPress}
                disabled={disabled}
                style={[{ marginRight: 5, ...CSS_STYLES.cf2 }, touchableStyle]}>
                {label2 ? <Text style={[{ fontSize: 14, color: '#414141', flex: 1 }, textStyle]}>{label2}</Text> : null}

                {square ? <Image source={isChecked ? images.checked : images.checkbox} style={[{ height: 20, width: 20, resizeMode: 'contain', }, imageStyle]} />
                    : <Image source={isChecked ? images.radiofill : images.radio} style={[{ height: 20, width: 20, resizeMode: 'contain', tintColor: isChecked ? '#fff' : '#000' }, imageStyle]} />}
                {label ?
                    <View style={{ flex: 1 }}>
                        <Text style={[{ fontSize: 16, color: isChecked ? '#fff' : '#414141', fontWeight: 'bold', marginLeft: 5 }, textStyle]}>{label}</Text>
                        {subText ?
                            <View style={{ flexDirection: 'row', marginLeft: 5, flexWrap: 'wrap' }}>
                                <View style={{ height: 5, width: 3, backgroundColor: 'red', alignSelf: 'flex-end', marginBottom: 5 }} />
                                <Text style={[{ color: isChecked ? '#fff' : '#090909', opacity: .5, fontSize: 13, marginLeft: 5 }, subTextStyle]}>{subText}</Text>
                            </View> : null}
                    </View> : null}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: .5,
        paddingHorizontal: 10
    }
})