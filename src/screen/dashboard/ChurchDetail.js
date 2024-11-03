import { Alert, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BLUE, CSS_STYLES, FONT_STYLES, LIGHT_THEME, THEME_COLOR } from '../../commonconfig/constStyle'
import { CustomButton, CustomHeader, CustomInput, CustomPopUp, TouchableItems } from '../../components'
import { ChatCard2, ListCard } from '../../components/CustomCards'
import images from '../../commonconfig/images'
import OrientationFunction from '../../commonconfig/OrientationFunction'
import QRCode from 'react-native-qrcode-svg'
import axios from 'axios'
import { BaseUrl } from '../../commonconfig/config'
import moment from 'moment'
import Sound from 'react-native-sound'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../components/Loader'

export default ChurchDetail = (props) => {
    const Orientation = OrientationFunction();
    const churchid = props?.route?.params?.church_id
    const picture = props?.route?.params?.picture
    const item = props?.route?.params?.item

    const [selectedTab, setSelectedTab] = useState('announce');
    const [qrpopup, setQrpopup] = useState(false);
    const [sound, setSound] = useState(null);
    const [playItem, setPlayItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [announcement, setAnnouncement] = useState(null)
    const [Feedback, setFeedback] = useState({ val: '', err: '' });
    const [allFeedback, setAllFeedback] = useState([])
    const [ChurchNew, setChurchNew] = useState([])



    // api callll============================================
    const getAnnouncements = () => {
        let data = new FormData();
        data.append('church_id', churchid);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + 'announcements',
            headers: {
                // Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
            },
            data: churchid ? data : null
        };
        // console.log('this is config church detail',config,data)
        axios.request(config)
            .then((response) => {
                setLoading(false)
                if (response?.data?.success) {
                    setAnnouncement(response?.data?.data)
                }
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert('Failed', error?.response?.data?.message)
                console.log(error);
            });
    }

    const getChurch = () => {
        let data = new FormData();
        data.append('church_id', churchid);

        console.log("params>>>>", data);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://church.blackbullsolution.com/api/churches',
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
                    setChurchNew(response?.data?.data)
                }
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert('Failed', error?.response?.data?.message)
                console.log(error);
            });
    }

    useEffect(() => {
        setLoading(true)
        getAnnouncements()
        getFeedback()
        getChurch()
    }, [])


    const postReview = async () => {
        const token = await AsyncStorage.getItem('userdata')
        console.log('thsi si token', token)
        let data = JSON.stringify({
            "announcement_id": item?.id,
            "title": item?.title,
            "description": Feedback?.val,
            "user_id": 2
        });
        console.log("post review data-->", data);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + 'post_review',
            headers: {
                Authorization: token?.token,
                'Content-Type': 'application/json',
            },
            data: item ? data : null
        };

        axios.request(config)
            .then((response) => {
                setLoading(false)
                if (response?.data?.success) {
                    setFeedback({ val: '', err: '' })
                    Alert?.alert('Review Saved Successfully');
                    //    getAnnouncementsReview()
                }
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert('Failed', error?.response?.data?.message)
                console.log(error);
            });
    }


    const getFeedback = async () => {
        let data = {
            "church_id": churchid
        };

        console.log("params", data);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + 'church_feedbacks',
            headers: {
                // Authorization: token?.token,
                'Content-Type': 'application/json',
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            setLoading(false);
            if (response?.data?.success) {
                setAllFeedback(response?.data?.data);
                console.log("feedback data----->", allFeedback);
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Failed', error?.response?.data?.message || "An error occurred");
            console.log("Error fetching feedback:", error);
        }
    };

    const feedSubmitHandeler = () => {
        let hasError = false;

        if (!Feedback?.val || Feedback?.val.trim() === '') {
            hasError = true;
            setFeedback({ ...Feedback, err: 'Please enter a feedback' });
            return;
        }

        if (!hasError) {
            setLoading(true)
            postReview();
        }
    }
    // ============================================

    const playHandeler = (item) => {

        setLoading(true);
        // setPlayItem(item);

        const testInfo = {
            id: item?.id,
            title: 'wav remote download',
            url: item?.music_file
            // url: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        };
        const newSound = new Sound(testInfo.url, '', error => {
            if (error) {
                Alert.alert('Error', error);
            } else {
                console.log('new sounddd', newSound)
                setLoading(false);
                pauseHandeler();
                setPlayItem(item);
                setSound(newSound);
                newSound.play(() => {
                    newSound.release();
                });
            }
        })
        return () => {
            if (newSound) {
                newSound.release();
            }
        };
    }
    const pauseHandeler = () => {
        if (sound) {
            sound.pause();
        }
        setLoading(false);
        setSound(null);
        setPlayItem(null)
    }

    return (
        <View style={{ flex: 1, backgroundColor: THEME_COLOR, }}>
            <Loader loading={loading} />
            <CustomHeader title={'Church Details'}
                rightImage={images.back}
                rightImageStyle={CSS_STYLES.i3}
                onPressRight={() => { props?.navigation.goBack() }}
            />

            <ScrollView>
                <View style={{ paddingHorizontal: 15, alignItems: 'center' }}>
                    <ImageBackground
                        source={{
                            uri: picture
                                ? `https://church.blackbullsolution.com/storage/app/public/${picture}`
                                : `https://church.blackbullsolution.com/storage/app/public/${ChurchNew[0]?.picture}`,
                        }}
                        imageStyle={{ borderRadius: 15, resizeMode: 'cover', }}
                        style={{ height: Orientation.width - 30, width: Orientation.width - 30, borderRadius: 15, padding: 15, justifyContent: 'flex-end', }} >
                        <Text style={[FONT_STYLES.hb22, { color: '#fff' }]}>{item?.name || ChurchNew[0]?.name}</Text>
                        <Text style={[FONT_STYLES.h17, { color: '#fff', marginBottom: 10 }]}>{item?.address || ChurchNew[0]?.name}</Text>

                    </ImageBackground>
                    <View style={[CSS_STYLES.cf2, {}]}>
                        <View style={[CSS_STYLES.cf2, { flex: 1, borderRadius: 10, padding: 10, backgroundColor: '#ebebf6', paddingTop: 35, top: -20, zIndex: -1 }]}>
                            <View>
                                <Text style={[FONT_STYLES.h12, { opacity: .3 }]}>Persons</Text>
                                <Text style={[FONT_STYLES.h14, {}]}>154</Text>
                            </View>
                            <View>
                                <Text style={[FONT_STYLES.h12, { opacity: .3 }]}>Announcements</Text>
                                <Text style={[FONT_STYLES.h14, {}]}>20+</Text>
                            </View>
                        </View>
                        <TouchableItems
                            text={'View QR'}
                            onPress={() => { setQrpopup(!qrpopup) }}
                            textStyle={[FONT_STYLES.hb13, { color: BLUE }]}
                            containerStyle={{ marginLeft: 10 }}
                        />

                    </View>
                    <View style={{ width: '100%' }}>
                        <Text style={[FONT_STYLES.hb16, {}]}>Church Description</Text>
                        <Text style={[FONT_STYLES.h13, {}]}>{item?.description || ChurchNew[0]?.description}</Text>
                    </View>

                    <View style={[styles.buttonsContainer]}>
                        <TouchableItems text={'Announcements'} containerStyle={{ flex: 1, flexDirection: 'column' }}
                            textStyle={{ ...FONT_STYLES.hb16 }}
                            onPress={() => { setSelectedTab('announce') }}
                        >
                            {selectedTab == 'announce' ? <View style={{ height: 2, width: 30, backgroundColor: 'red', marginTop: 5 }} /> : null}
                        </TouchableItems>
                        <View style={{ borderLeftWidth: 1.5, borderLeftColor: '#ccc', height: 35 }} />
                        <TouchableItems text={'Feedbacks'} containerStyle={{ flex: 1, flexDirection: 'column' }}
                            textStyle={{ ...FONT_STYLES.hb16 }}
                            onPress={() => { setSelectedTab('feed') }} >
                            {selectedTab == 'feed' ? <View style={{ height: 2, width: 30, backgroundColor: 'red', marginTop: 5 }} /> : null}
                        </TouchableItems>
                    </View>


                </View>

                {selectedTab == 'announce' && <FlatList
                    data={announcement}
                    keyExtractor={(i) => { 'annu' + i }}
                    contentContainerStyle={{ marginTop: 10 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <ListCard
                                image={images.alexavatar}
                                name={item?.title}
                                subHeading={item?.ch?.name}
                                onPress={() => { props?.navigation.navigate('AnnouncementDetail', { item: item }) }}
                                date={moment(item?.created_at).format('DD-MM-YYYY')}
                                description={item?.description}
                                duration={item?.music_file ? '' : null}
                                // playpress={() => { item?.music_file ? playItem?.id == item?.id ? pauseHandeler() : playHandeler(item) : null }}
                                play={item?.music_file ? playItem?.id == item?.id : null}
                            />

                        )
                    }}
                />}
                {selectedTab == 'feed' &&
                    <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#fff', }}>
                        <FlatList
                            data={allFeedback}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#fff', }}>
                                        <ListCard
                                            image={images.alexavatar}
                                            name={item.user?.name || 'Anonymous'}
                                            subHeading={item.description}
                                            date={new Date(item.created_at).toLocaleDateString()}
                                            imageStyle={{ height: 40, width: 40 }}

                                            containerStyle={{ borderWidth: 1, borderColor: LIGHT_THEME, zIndex: 20 }}
                                        // onPress={() => { props?.navigation.navigate('ChurchDetail', { church_id: item }) }}
                                        />
                                        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', }]}>
                                            <View style={[{ flexDirection: 'row', alignItems: 'center', flex: 1, borderRadius: 10, padding: 10, backgroundColor: '#ebebf6', position: 'relative', paddingTop: 35, top: -20, zIndex: -10 }]}>
                                                <Image source={images.comment} style={{ ...CSS_STYLES.i25, marginRight: 5, tintColor: 'red' }} />
                                                <Text style={[FONT_STYLES.h14, {}]}>154 Comments</Text>
                                            </View>
                                            <TouchableItems
                                                text={'Show Details'}
                                                // onPress={() => { setQrpopup(!qrpopup) }}
                                                textStyle={[FONT_STYLES.hb13, { color: BLUE }]}
                                                containerStyle={{ marginLeft: 10, marginBottom: 20 }}
                                            />
                                        </View>
                                    </View>
                                )
                            }}
                        />

                        {/* <CustomInput
                            placeholder={'Enter Your Feedback'}
                            error={Feedback?.err}
                            value={Feedback?.val}
                            onChangeText={(e) => { setFeedback({ val: e, err: '' }) }}
                            containerStyle={{ borderWidth: 1, borderColor: LIGHT_THEME }}
                            inputContainerStyle={{ height: 100, textAlignVertical: 'top', }}
                        />

                        <CustomButton title={'Submit'} gradientStyle={{ marginVertical: 10, }}
                            onPress={() => { postReview() }}
                        >
                            <View style={{ height: 2, width: 30, backgroundColor: 'red', marginTop: 5 }} />
                        </CustomButton> */}
                        {/* <FlatList
                            data={announcement}
                            keyExtractor={(i) => { 'annu' + i }}
                            contentContainerStyle={{ marginTop: 10 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <ListCard
                                        image={images.alexavatar}
                                        name={item?.title}
                                        subHeading={item?.ch?.name}
                                        date={moment(item?.created_at).format('DD-MM-YYYY')}
                                        description={item?.description}
                                        duration={item?.music_file ? '' : null}
                                        // playpress={() => { item?.music_file ? playItem?.id == item?.id ? pauseHandeler() : playHandeler(item) : null }}
                                        play={item?.music_file ? playItem?.id == item?.id : null}
                                    />

                                )
                            }}
                        /> */}
                    </View>}
            </ScrollView>


            <CustomPopUp
                isVisible={qrpopup}
                cross={true}
                onClose={() => { setQrpopup(false) }}
                text={'QR Code'}
                textContainer={{ marginBottom: 15 }}
                componentContainer={{ width: Orientation.width * .8, paddingHorizontal: 10, paddingVertical: 20 }}
            >
                <QRCode
                    value={churchid ? `'${churchid}'` : '1'}
                    // value="Just some string value"
                    // logo={{uri: base64Logo}}
                    size={Orientation.width * .5}
                    backgroundColor='transparent'
                />
            </CustomPopUp>

        </View>
    )
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
})