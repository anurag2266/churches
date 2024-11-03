import React, { Children, useState } from 'react';
// import Images from '../commonconfig/images';
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CSS_STYLES, FONT_STYLES, LIGHT_THEME, c } from '../commonconfig/constStyle';
import images from '../commonconfig/images';
import TouchableItems from './TouchableItems';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { download } from '../commonconfig/dummyData';
import { FlatList } from 'react-native';
import CustomPopUp from './CustomPopUp';
import OrientationFunction from '../commonconfig/OrientationFunction';
import { CustomInput } from '.';

export default Header2 = ({
    leftContainer,
    leftImage, leftImageStyle, onPressLeft,
    renderLeft,
    titleContainer,
    title,
    titleStyle,
    titleImage,
    titleImageStyle,
    style,
    rightContainer,
    rightImage, rightImageStyle, onPressRight,
    renderRight,

    hidefilter,
    searchPress, searchStyle, handleSearch,

    sortPress, sortData, sortStyle,
    filterPress, filterData, filterStyle,
    children
}) => {
    const Orientation = OrientationFunction();
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    let debounceTimeout;

    const debounce = (func, delay) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            func();
        }, delay);
    };
    // const handleSearch = (text) => {
    //     // Your search logic here
    //     console.log('Searching for:', text);
    // };

    const handleInputChange = (text) => {
        setSearchTerm(text);
        debounce(() => {
          handleSearch(text) // Call your search function after a delay
        }, 2000); // Adjust the delay time (in milliseconds) as needed
    };
    return (
        <View
            style={[
                {
                    ...CSS_STYLES.cf2,
                    padding: 10,
                    paddingHorizontal: 15,
                    backgroundColor: '#fff',
                }, titleImage && { marginTop: 20 },
                style,
            ]}>
            <TouchableOpacity
                style={[{ marginRight: '5%', }, leftContainer]}
                onPress={onPressLeft}>
                {leftImage ? (
                    <Image
                        style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            ...leftImageStyle,
                        }}
                        source={leftImage}
                    />
                ) : null}
            </TouchableOpacity>
            {renderLeft ? renderLeft() : null}

            <View style={[{ flex: 1 }, titleContainer]}>
                {titleImage ? (
                    <Image style={{ position: 'absolute', top: -25, alignSelf: 'center', height: 25, width: 25, resizeMode: 'contain', ...titleImageStyle, }}
                        source={titleImage}
                    />
                ) : null}
                {title ? <Text
                    style={[FONT_STYLES.hb20, { fontWeight: 'bold', textAlign: 'center' }, titleStyle,]}>
                    {title}
                </Text> : null}
            </View>
            {rightImage ? <TouchableOpacity style={[{ alignItems: 'center', justifyContent: 'center', marginLeft: '5%', height: 40, width: 40, borderRadius: 15 }, rightContainer]} onPress={onPressRight}>
                <Image style={{ height: 20, width: 20, resizeMode: 'contain', ...rightImageStyle, }}
                    source={rightImage} />


            </TouchableOpacity> : null}
            {hidefilter == true ?
                null :
                <View style={{ flexDirection: 'row' }}>
                    {searchPress ?
                        <TouchableItems image={images.search}
                            onPress={() => { setShowSearchModal(!showSearchModal) }}
                            containerStyle={{ marginLeft: 5 }}
                            imageStyle={[{ height: 25, width: 25, resizeMode: 'contain', tintColor: LIGHT_THEME }, searchStyle]} />
                        : null}
                    {sortPress ?
                        <Menu>
                            <MenuTrigger
                                children={
                                    <TouchableItems
                                        image={images.sort}
                                        // onPress={() => { }}
                                        containerStyle={{ marginLeft: 5, height: 30, width: 30 }}
                                        imageStyle={[CSS_STYLES.i25, { tintColor: LIGHT_THEME }]}
                                        disabled={true}
                                    />
                                }
                                style={{}}
                            />
                            <MenuOptions
                                optionsContainerStyle={{
                                    shadowColor: '#111',
                                    elevation: 10,
                                    width: 100,
                                    borderRadius: 10,
                                    paddingVertical: 10,
                                    paddingLeft: 10,
                                    marginTop: 20,
                                    // marginRight:20
                                }}>
                                {
                                    <FlatList
                                        data={sortData}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <MenuOption
                                                    text={item?.type}
                                                    customStyles={{
                                                        optionText: {
                                                            ...CSS_STYLES.h11,
                                                            color: '#333',
                                                            fontWeight: '700',
                                                        },
                                                    }}
                                                    onSelect={() => { sortPress(item) }}
                                                />
                                            );
                                        }}
                                    />
                                }
                            </MenuOptions>
                        </Menu>
                        : null}
                    {filterPress ?
                        <Menu>
                            <MenuTrigger
                                children={
                                    <TouchableItems
                                        image={images.filter}
                                        // onPress={() => { }}
                                        containerStyle={{ marginLeft: 5, height: 30, width: 30 }}
                                        imageStyle={[CSS_STYLES.i25, { tintColor: LIGHT_THEME }]}
                                        disabled={true}
                                    />
                                }
                                style={{}}
                            />
                            <MenuOptions
                                optionsContainerStyle={{
                                    shadowColor: '#111',
                                    elevation: 10,
                                    width: 100,
                                    borderRadius: 10,
                                    paddingVertical: 10,
                                    paddingLeft: 10,
                                    marginTop: 20,
                                    // marginRight:20
                                }}>
                                {
                                    <FlatList
                                        data={filterData}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <MenuOption
                                                    text={item?.type}
                                                    customStyles={{
                                                        optionText: {
                                                            ...CSS_STYLES.h11,
                                                            color: '#333',
                                                            fontWeight: '700',
                                                        },
                                                    }}
                                                    onSelect={() => { filterPress(item) }}
                                                />
                                            );
                                        }}
                                    />
                                }
                            </MenuOptions>
                        </Menu>
                        : null}
                    {children}
                </View>
            }

            {renderRight ? renderRight() : null}

            <CustomPopUp
                isVisible={showSearchModal}
                onClose={() => setShowSearchModal(false)}
                componentContainer={{
                    width: Orientation.width * 0.9, backgroundColor: 'transparent',
                    marginBottom: 15, paddingHorizontal: 0,
                }}
                mainContainer={{ justifyContent: 'flex-start', backgroundColor: 'rgba(000,000,000,.9)', }}
            >
                <CustomInput
                    placeholder={'Search'}
                    leftImage={images.search}
                    onChangeText={(e) => { handleInputChange(e) }}
                    // onPress={() => { setShowCameraModal('false') }}
                    containerStyle={{
                        width: '100%',
                        marginTop: 8,
                        // padding: 10,
                        borderRadius: 15,
                        borderWidth: 0,
                        backgroundColor: 'rgba(255,255,255,.9)',
                    }}

                />
                <View style={styles.modalView}>
                    <TouchableOpacity style={{ borderBottomWidth: .5, borderBottomColor: c.border }}>
                        <View style={[CSS_STYLES.cf2]}>
                            <Text style={[{ ...FONT_STYLES.hb13, }]}>Martha smith
                                <Text style={[{ ...FONT_STYLES.h13, color: LIGHT_THEME }]}> Chat</Text>
                            </Text>
                            <Image source={images.back2} style={{ height: 15, width: 15, transform: [{ rotate: '135deg' }] }} />
                        </View>
                        <Text style={[{ ...FONT_STYLES.h13, }]}>Lorem ipsumm </Text>
                    </TouchableOpacity>
                </View>

            </CustomPopUp>
        </View>
    )
}

const styles = StyleSheet.create({
    modalView: {
        width: '100%',
        padding: 10,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,.7)',
    },
    modalbtn: {
        width: '100%',
        justifyContent: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,.05)'
    },
})