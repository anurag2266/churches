import React from 'react';
// import Images from '../commonconfig/images';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { FONT_STYLES } from '../commonconfig/constStyle';
import TouchableItems from './TouchableItems';
import images from '../commonconfig/images';

export default function CustomHeader({
    leftImage, leftContainer, leftImageStyle, onPressLeft,
    renderLeft,
    titleContainer,
    renderTitle,
    title, titleStyle,
    titleImage, titleImageStyle,
    titlewithImage, titlePress,
    subtitle, subtitleStyle,
    style,
    rightImage, rightContainer, rightImageStyle, onPressRight, rightText, onPressRightText,
    renderRight,
}) {
    // const Orientation = useOrientation();

    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                    // backgroundColor: '#000',
                }, titleImage && { marginTop: 20 },
                style,
            ]}>
            <TouchableOpacity
                style={[{}, leftContainer]}
                onPress={onPressLeft}>
                {leftImage ? (
                    <Image
                        style={{
                            height: 30,
                            width: 30,
                            resizeMode: 'contain',
                            tintColor: '#fff',
                            ...leftImageStyle,
                        }}
                        // source={require(home)}
                        source={leftImage}
                    />
                ) : null}
            </TouchableOpacity>
            {renderLeft ? renderLeft() : null}

            <View style={[{ flex: 1 }, titleContainer]}>
                {titleImage ? (
                    <Image style={{ position: 'absolute', top: -25, height: 25, width: 25, resizeMode: 'contain', ...titleImageStyle, }}
                        source={titleImage}
                    />
                ) : null}
                {title ? <Text
                    style={[FONT_STYLES.hb18, { color: '#000', fontWeight: 'bold', }, titleStyle,]}>
                    {title}
                </Text> : null}
                {titlewithImage ? <TouchableOpacity
                    onPress={titlePress}
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[FONT_STYLES.hb20, { fontWeight: 'bold', textAlign: 'center' }, titleStyle,]}>
                        {titlewithImage}
                    </Text>
                    <Image source={images.edit} style={{ height: 15, width: 15, resizeMode: 'contain', marginLeft: 5 }} />
                </TouchableOpacity> : null}
                {renderTitle ? renderTitle() : null}
                {subtitle ? <Text
                    style={[FONT_STYLES.h11, { fontWeight: 'bold', textAlign: 'center' }, subtitleStyle,]}>
                    {subtitle}
                </Text> : null}
            </View>
            {rightImage ? (<TouchableOpacity style={[{ marginLeft: '5%', }, rightContainer]} onPress={onPressRight}>

                <Image style={{ height: 40, width: 40, resizeMode: 'contain', ...rightImageStyle, }}
                    source={rightImage} />

            </TouchableOpacity>) : null}
            {rightText ? (<TouchableOpacity style={[{ marginLeft: '5%', }, rightContainer]} onPress={onPressRightText}>

                <Text style={[FONT_STYLES.h13, { fontWeight: 'bold', textAlign: 'center' },]} >{rightText}</Text>

            </TouchableOpacity>) : null}
            {renderRight ? renderRight() : null}
        </View>
    )
}