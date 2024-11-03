import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BLUE, CSS_STYLES, FONT_STYLES, LIGHT_THEME, THEME_COLOR } from '../../commonconfig/constStyle'
import { CustomButton, CustomCheckBox, CustomHeader, CustomInput, CustomPopUp, TouchableItems } from '../../components'
import { ChatCard2, ListCard } from '../../components/CustomCards'
import images from '../../commonconfig/images'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import OrientationFunction from '../../commonconfig/OrientationFunction'
import { BaseUrl } from '../../commonconfig/config'
import axios from 'axios'
import Loader from '../../components/Loader'
import moment from 'moment'


export default function Search(props) {
    const Orientation = OrientationFunction();
    const [showSortModal, setShowSortModal] = useState(false);
    const [showfilterModal, setShowfilterModal] = useState(false);
    const [selectedsort, setSelectedsort] = useState('');
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [selectedFilterItem, setSelectedFilterItem] = useState([]);

    const [loading, setLoading] = useState(false);
    const [churchList, setChurchList] = useState([]);
    const [searchedList, setSearchedList] = useState([]);
    const typingTimeout = useRef(null);
    const [searchedText, setSearchedText] = useState([]);

    // api callll============================================
    const getChurchlist = () => {

        let data = new FormData();
        // data.append('church_id', ch_id);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + 'churches',
            headers: {
            },
        };

        axios.request(config)
            .then((response) => {
                setLoading(false)
                if (response?.data?.success) {
                    setChurchList(response?.data?.data);
                }
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert('Failed', error?.response?.data?.message)
                console.log(error);
            });
    }

    const applyFilterApi = () => {
        let data = new FormData();
        data.append('church_id', selectedFilter.join(','));
        console.log("params", data);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + 'announcements',
            headers: {
                // Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                setLoading(false)
                if (response?.data?.success) {
                    // setAnnouncement(response?.data?.data);
                    setSearchedList(response?.data?.data)
                    console.log("data---->", response?.data?.data);
                }
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert('Failed', error?.response?.data?.message)
                console.log(error);
            });
    }

    const searchapi = (e) => {
        console.log('this ise', e)
        if (e?.length > 0) {
            let data = new FormData();
            data.append('search', e);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: BaseUrl + 'announcements',
                headers: {
                    // Authorization: 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data',
                },
                data: data
            };
            axios.request(config)
                .then((response) => {
                    setLoading(false)
                    if (response?.data?.success) {
                        // setAnnouncement(response?.data?.data);
                        setSearchedList(response?.data?.data)
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    Alert.alert('Failed', error?.response?.data?.message)
                    console.log(error);
                });
        } else { setSearchedList([]) }
    }
    const searchDebunce = (value) => {
        setSearchedText(value);

        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }
        typingTimeout.current = setTimeout(() => {
            if (value?.length > 0) {
                searchapi(value)
            } else { setSearchedList([]) }
        }, 1000);  // Adjust delay as needed
    }
    useEffect(() => {
        setLoading(true)
        getChurchlist()
        return () => { };
    }, [])

    // ============================================

    const sortPress = (item) => {
        console.log('selected item')
    }

    // ======================filter handling function start====================

    const filterApplyHandeler = () => {

        if (selectedFilter.length <= 0 || selectedFilter == undefined) { Alert.alert('Please select atlease 1 church') }
        else { setShowfilterModal(false), applyFilterApi() }
    }
    const filterSelectHandeler = (item) => {
        if (selectedFilter.includes(item?.id)) {
            const newarr = selectedFilter.filter((e) => e !== item?.id)
            const newItem = selectedFilterItem.filter((i) => i.id !== item?.id);
            setSelectedFilter(newarr);
            setSelectedFilterItem(newItem)
        } else {
            setSelectedFilter([...selectedFilter, item?.id]);
            setSelectedFilterItem([...selectedFilterItem, item]);
        }
    }


    // const filterSelectHandeler = (item) => {
    //     if (selectedFilter.some(e => e.id === item.id)) {
    //         const newItems = selectedFilter.filter(e => e.id !== item.id);
    //         setSelectedFilter(newItems); // remove item if already selected
    //     } else {
    //         setSelectedFilter([...selectedFilter, item]); // add item if not already selected
    //     }
    // };
    const resetHandeler = () => {
        setSelectedFilter([])
        setSelectedFilterItem([])
    }
    // =====================filter handling function end=======================

    return (
        <View style={{ flex: 1, backgroundColor: THEME_COLOR, }}>
            <Loader loading={loading} />
            <CustomHeader title={'Search'} />
            <CustomInput
                placeholder={'Search'}
                onChangeText={(e) => searchDebunce(e)}
                rightImage={images.search}
                rightImageStyle={{ tintColor: 'rgba(0,0,0,.3)' }}
                mainContainer={{ marginHorizontal: 15 }} />
            <ScrollView style={{ paddingHorizontal: 15 }}>
                <View style={[CSS_STYLES.cf2, {}]}>
                    <View style={[CSS_STYLES.cf2, { flex: 1, borderRadius: 10, padding: 10, backgroundColor: LIGHT_THEME }]}>
                        <View>
                            <Text style={[FONT_STYLES.h12, { opacity: .3 }]}>Sort By</Text>
                            <TouchableItems
                                text={'Recent First'}
                                image2={images.Arroo}
                                imageStyle2={[CSS_STYLES.i15, { tintColor: 'red', marginLeft: 10 }]}
                                onPress={() => setShowSortModal(!showSortModal)}
                            />

                        </View>
                        <View style={{ height: '100%', backgroundColor: 'red', width: 1 }} />
                        <View>
                            <Text style={[FONT_STYLES.h12, { opacity: .3 }]}>Sort By</Text>
                            <Text style={[FONT_STYLES.h14, {}]}> {churchList.length} Churches</Text>
                        </View>
                    </View>
                    <TouchableItems
                        image={images.filter}
                        onPress={() => { setShowfilterModal(!showfilterModal) }}
                        imageStyle={[CSS_STYLES.i15, {}]}
                        containerStyle={{ backgroundColor: '#fff', height: 35, width: 35, borderRadius: 20, marginLeft: 15 }}
                    />

                </View>
                {/* horizontal church name list */}
                <FlatList
                    data={selectedFilterItem}
                    keyExtractor={(i) => { 'last' + i }}
                    horizontal={true}
                    contentContainerStyle={{ gap: 10, }}
                    style={{ marginVertical: 10, }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#000', padding: 8, borderRadius: 20, }}>
                                <Text style={{ ...FONT_STYLES.hb14, color: '#fff' }}>{item?.name}</Text>
                                <TouchableItems
                                    image={images.close}
                                    onPress={() => { filterSelectHandeler(item) }}
                                    imageStyle={[{ height: 10, width: 10, resizeMode: 'contain' }]}
                                    containerStyle={{ backgroundColor: '#fff', height: 20, width: 20, borderRadius: 20, marginLeft: 15 }}
                                />
                            </View>
                        )
                    }}
                />
                {/* announcement list */}
                <FlatList
                    data={searchedList}
                    keyExtractor={(i) => { 'search' + i }}
                    contentContainerStyle={{ gap: 10, marginTop: 10 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <ListCard
                                image={{ uri: `https://church.blackbullsolution.com/storage/app/public/${item?.ch?.picture}` }}
                                name={item?.title}
                                subHeading={item?.description}
                                date={moment(item?.created_at).format('DD-MM-YYYY')}
                                description={'this is des'}
                                duration={'1hr 15min 10sec'}
                                playpress={() => { }}
                                onPress={() => { props?.navigation.navigate('AnnouncementDetail', { item: item }) }}
                            // play={false}
                            />

                        )
                    }}
                // ListEmptyComponent={() => {
                //     return (
                //         <View style={{ flex: 1, ...CSS_STYLES.c1 }}>
                //             <Text style={[FONT_STYLES.hb30, { opacity: .3 }]}>No Item Found</Text>
                //         </View>
                //     )
                // }}
                />
            </ScrollView>

            <CustomPopUp
                isVisible={showSortModal}
                cross={true}
                onClose={() => { setShowSortModal(false) }}
                text={'Sort'}
                componentContainer={{ width: Orientation.width * .8 }}
            >
                <CustomCheckBox label={'Recent First'}
                    isChecked={selectedsort == 'recent'}
                    containerStyle={{ width: '100%', paddingVertical: 5, borderRadius: 20, paddingHorizontal: 10, marginTop: 15 }}
                    onPress={() => { setSelectedsort('recent') }}
                />
                <CustomCheckBox label={'Old First'}
                    isChecked={selectedsort == 'old'}
                    containerStyle={{ width: '100%', paddingVertical: 5, borderRadius: 20, paddingHorizontal: 10, marginTop: 10 }}
                    onPress={() => { setSelectedsort('old') }}
                />

            </CustomPopUp>
            <CustomPopUp
                isVisible={showfilterModal}
                cross={true}
                onClose={() => { setShowfilterModal(false) }}
                text={'Filter'}
                componentContainer={{ width: '100%', height: '100%', borderRadius: 0, paddingHorizontal: 0, paddingBottom: 0, }}
            >
                {selectedFilter.length > 0 ? <View style={{ width: '80%', ...CSS_STYLES.cf2, marginHorizontal: 20, backgroundColor: 'rgba(255,255,255,.8)', padding: 10, borderRadius: 20, marginTop: 10 }}>
                    <Text style={[FONT_STYLES.h17]}>{selectedFilter.length} Selected</Text>
                    <Text style={[FONT_STYLES.hb16, { color: BLUE }]} onPress={() => { resetHandeler() }}>Reset</Text>
                </View> : null}
                <FlatList
                    data={churchList}
                    keyExtractor={(i) => { 'filter' + i }}
                    contentContainerStyle={{ marginTop: 10 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (

                            <CustomCheckBox label={item?.name}
                                subText={item?.address}
                                square={true}
                                isChecked={selectedFilter.includes(item?.id)}
                                // isChecked={selectedFilter.some(e => e.id === item.id)}
                                containerStyle={{ paddingVertical: 10, }}
                                onPress={() => { filterSelectHandeler(item) }}
                            />
                        )
                    }
                    }
                />
                <CustomButton title={'Apply'} gradientStyle={{ marginVertical: 10, width: '80%' }}
                    onPress={() => { filterApplyHandeler() }}
                >
                    <View style={{ height: 2, width: 30, backgroundColor: 'red', marginTop: 5 }} />
                </CustomButton>
            </CustomPopUp>

        </View>
    )
}

const styles = StyleSheet.create({})