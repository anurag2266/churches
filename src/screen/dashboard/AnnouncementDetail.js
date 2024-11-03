import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BLUE, CSS_STYLES, FONT_STYLES, THEME_COLOR } from '../../commonconfig/constStyle'
import { CustomButton, CustomHeader, CustomInput, CustomPopUp, TouchableItems } from '../../components'
import { ChatCard2, ListCard, ListCard2, OrderManage } from '../../components/CustomCards'
import images from '../../commonconfig/images'
import OrientationFunction from '../../commonconfig/OrientationFunction'
import Loader from '../../components/Loader'
import moment from 'moment'
import axios from 'axios'
import { BaseUrl } from '../../commonconfig/config'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default AnnouncementDetail = (props) => {
    const item = props?.route?.params?.item;
    const [loading, setLoading] = useState(false);
    const [reviewList, setReviewList] = useState([]);
    const [Feedback, setFeedback] = useState({ val: '', err: '' });
    const [title, setTitle] = useState({ val: '', err: '' });
    const [user_Id, setUser_Id] = useState(null)
    const [churchList, setChurchList] = useState([]);


    const logUserIdFromAsyncStorage = async () => {
        try {
            // Retrieve 'userdata' from AsyncStorage
            const userdata = await AsyncStorage.getItem('userdata');

            if (userdata) {
                // Parse the JSON string into an object
                const parsedData = JSON.parse(userdata);

                // Access and log the user_id from the parsed object
                const userId = parsedData?.user_id;
                setUser_Id(userId)
                console.log("user_id:", userId);
            } else {
                console.log("No userdata found in AsyncStorage.");
            }
        } catch (error) {
            console.error("Failed to retrieve user_id from AsyncStorage:", error);
        }
    };


    // api callll============================================
    const getAnnouncementsReview = () => {
        let data = new FormData();
        data.append('announcement_id', item?.id);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + 'announcements_reviews',
            headers: {
                // Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
            },
            data: item ? data : null
        };

        axios.request(config)
            .then((response) => {
                setLoading(false)
                if (response?.data?.success) {
                    setReviewList(response?.data?.data?.[0])
                }
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert('Failed', error?.response?.data?.message)
                console.log(error);
            });
    }

    const postReview = async () => {
        const token = await AsyncStorage.getItem('userdata')
        console.log('thsi si token', token)
        let data = JSON.stringify({
            "announcement_id": item?.id,
            "title": title?.val,
            "description": Feedback?.val,
            "user_id": user_Id
        });
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
                console.log('==', error);
            });
    }

    useEffect(() => {
        // setLoading(true)
        console.log("------>", item.church_id);
        logUserIdFromAsyncStorage()
        getAnnouncementsReview()
        getChurchPage()
    }, [])

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

    const getChurchPage = () => {

        let data = new FormData();
        data.append('church_id', item.church_id);

        console.log("params", data);

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
                    setChurchList(response.data.data);
                    console.log("announce church", response.data.data);
                }
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert('Failed', error?.response?.data?.message)
                console.log(error);
            });
    }


    return (
        <View style={{ flex: 1, backgroundColor: THEME_COLOR, }}>
            <Loader loading={loading} />
            <CustomHeader title={'Announcement Details'}
                rightImage={images.back}
                rightImageStyle={CSS_STYLES.i3}
                onPressRight={() => { props?.navigation.goBack() }}
            />
            <ScrollView style={{}}>
                <View style={{ paddingHorizontal: 15 }}>
                    <ListCard
                        image={{ uri: `https://church.blackbullsolution.com/storage/app/public/${item.ch.picture}` }}
                        name={item?.title}
                        subHeading={item?.ch?.name}
                        date={moment(item?.created_at).format('DD-MM-YYYY')}
                        description={item?.description}
                        imageStyle={{ height: 90, width: 90 }}
                        onPress={() => { props?.navigation.navigate('ChurchDetail', { church_id: item }) }}
                    />
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', }]}>
                        <View style={[{ flexDirection: 'row', alignItems: 'center', flex: 1, borderRadius: 10, padding: 10, backgroundColor: '#ebebf6', paddingTop: 35, top: -20, zIndex: -10 }]}>
                            <Image source={images.comment} style={{ ...CSS_STYLES.i25, marginRight: 5, tintColor: 'red' }} />
                            <Text style={[FONT_STYLES.h14, {}]}>{reviewList?.reviews_count} Comments</Text>
                        </View>
                        <TouchableItems
                            text={'View Church'}
                            // onPress={() => { props?.navigation.navigate('ChurchDetail', { church_id: item?.church_id }) }}
                            onPress={() => { props?.navigation.navigate('home') }}
                            textStyle={[FONT_STYLES.hb13, { color: BLUE }]}
                            containerStyle={{ marginLeft: 10, marginBottom: 20 }}
                        />
                    </View>

                    <Text style={[FONT_STYLES.hb18, {}]}>Announcement Detail</Text>
                    <Text style={[FONT_STYLES.h14, { marginBottom: 10 },]}>{item?.description}</Text>

                    <CustomInput
                        placeholder={'Enter Your Title'}
                        error={title?.err}
                        value={title?.val}
                        onChangeText={(e) => { setTitle({ val: e, err: '' }) }}
                        inputContainerStyle={{ height: 60, textAlignVertical: 'top' }}
                    />


                    <CustomInput
                        placeholder={'Enter Your Feedback'}
                        error={Feedback?.err}
                        value={Feedback?.val}
                        onChangeText={(e) => { setFeedback({ val: e, err: '' }) }}
                        inputContainerStyle={{ height: 100, textAlignVertical: 'top' }}
                    />

                    <CustomButton title={'Submit'} gradientStyle={{ marginVertical: 10, }}
                        onPress={() => { feedSubmitHandeler() }}
                    >
                        <View style={{ height: 2, width: 30, backgroundColor: 'red', marginTop: 5 }} />
                    </CustomButton>
                </View>
                <FlatList
                    data={reviewList?.reviews}
                    keyExtractor={(i) => { 'feed' + i }}
                    contentContainerStyle={{ marginTop: 10 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <ListCard2
                                image={images.alexavatar}
                                name={item?.title}
                                date={moment(item?.updated_at).format('DD/MM/YYYY')}
                                description={item?.description}
                            />
                        )
                    }
                    }
                />


            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})