


import React, { Children, useRef, useState } from "react";
import { View, Text, Image, SafeAreaView, Dimensions, ScrollView, ImageBackground } from "react-native";
// import Crousel from "../Dashboard/Carousel";
import images from "../commonconfig/images";;
// import Carousel from "pinar";
import { TouchableOpacity } from "react-native";
import OrientationFunction from "../commonconfig/OrientationFunction";
import { THEME_COLOR, CSS_STYLES } from "../commonconfig/constStyle";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { swiperData } from "../commonconfig/dummyData";

// const DATA = [
//     {
//         id: 1,
//         coverImageUri: images.carwash, // Update with your image path
//         cornerLabelColor: '#FFD300',
//         cornerLabelText: 'GOTY',
//         screen: 'BakeryAndSnacks'
//     },
//     {
//         id: 2,
//         coverImageUri: images.taj, // Update with your image path
//         cornerLabelColor: '#0080ff',
//         cornerLabelText: 'NEW',
//         screen: 'Beverages'
//     },
//     {
//         id: 3,
//         coverImageUri: images.carwash, // Update with your image path
//         cornerLabelColor: '#2ECC40',
//         cornerLabelText: '-75%',
//         screen: 'DiaryAndEgg'
//     },
//     {
//         id: 4,
//         coverImageUri: images.taj, // Update with your image path
//         cornerLabelColor: '#2ECC40',
//         cornerLabelText: '-20%',
//         screen: 'FruitsAndVeg'
//     },
// ];
export default CustomCarousal = ({
    data, //mandatory
    carousalStyle, onPress,
    imageStyle
}) => {
    const Orientation = OrientationFunction();
    return (
        <SwiperFlatList
            style={[{
                height: Orientation?.height * .25,
                width: Orientation?.width,

            }, carousalStyle]}
            // activeDotStyle={{ height: 12, width: 12, borderRadius: 15 }}
            // dotColor={'#cbcbcb'}
            // activeDotColor={THEME_COLOR}
            // scrollEnabled={true}
            // autoplay={true}
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={2}
            showPagination
            data={data}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={onPress} disabled={!onPress}>
                    <ImageBackground
                        //  resizeMode='cover'
                        style={[{ height: Orientation?.height * .25, width: Orientation?.width, }, imageStyle]}
                        imageStyle={[{ height: Orientation?.height * .25, width: Orientation?.width, }, imageStyle]}
                        source={images.backgroundImg}
                    //  source={item.coverImageUri}
                    >
                    </ImageBackground>
                    {/* <Image source={images.backgroundImg} style={{width:Orientation.width, height:120}}/> */}
                </TouchableOpacity>
            )}
        />

    )

}
