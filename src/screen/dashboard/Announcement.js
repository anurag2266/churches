import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CSS_STYLES, FONT_STYLES, THEME_COLOR } from '../../commonconfig/constStyle'
import { CustomButton, CustomHeader, CustomInput, TouchableItems } from '../../components'
import { ChatCard2, ListCard } from '../../components/CustomCards'
import images from '../../commonconfig/images'
import TrackPlayer, { Capability } from 'react-native-track-player'
import axios from 'axios'
import Sound from 'react-native-sound'
import Loader from '../../components/Loader'
import { BaseUrl } from '../../commonconfig/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

export default Announcement = (props) => {
    const ch_id = props?.route?.params?.churchId;


    const [sound, setSound] = useState(null);
    const [playItem, setPlayItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [announcement, setAnnouncement] = useState(null)
    const [searchedList, setSearchedList] = useState([]);

    const tracks = [
        {
            id: '1',
            url: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3', // Example track from FMA
            title: 'Track Title 1',
            artist: 'Artist Name 1',
            duration: 257
        },
        {
            id: '2',
            url: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg', // Example track from FMA
            title: 'Track Title 2',
            artist: 'Artist Name 2',
            duration: 298
        },
    ];



    // api callll============================================
    const getAnnouncements = () => {

        let data = new FormData();
        data.append('church_id', ch_id);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + 'announcements',
            headers: {
                // Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
            },
            data: ch_id ? data : null
        };

        axios.request(config)
            .then((response) => {
                setLoading(false)
                if (response?.data?.success) {
                    setAnnouncement(response?.data?.data);
                    setSearchedList(response?.data?.data)
                }
            })
            .catch((error) => {
                setLoading(false)
                // Alert.alert('Failed', error?.response?.data?.message)
                console.log(error);
            });
    }

    useEffect(() => {
        setLoading(true)
        getAnnouncements()
    }, [])


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
    const stopHandeler = () => {
        if (sound) {
            sound.stop()
            setPlayItem(null)
        }
    }


    const searchHandeler = (sea) => {
        if (sea?.length > 0) {
            let arr = announcement.filter(e => {
                if ((e?.ch?.name.toLowerCase().includes(sea.trim().toLowerCase())) || (e?.title.toLowerCase().includes(sea.trim().toLowerCase()))) { return e }
                else { return null }
            })
            setSearchedList(arr)
        } else { setSearchedList(announcement) }
    }
    return (
        <View style={{ flex: 1, backgroundColor: THEME_COLOR, }}>
            <Loader loading={loading} />
            <CustomHeader title={'Announcement'} />

            <CustomInput
                placeholder={'Search'}
                rightImage={images.search}
                rightImageStyle={{ tintColor: 'rgba(0,0,0,.3)' }}
                mainContainer={{ marginHorizontal: 15 }}
                onChangeText={(e) => { searchHandeler(e) }}
            />
            <FlatList
                data={searchedList}
                keyExtractor={(i) => { 'anno' + i }}
                contentContainerStyle={{ gap: 10, marginHorizontal: 15, marginTop: 10 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <ListCard
                            // image={item?.ch?.picture}
                            image={{ uri: `https://church.blackbullsolution.com/storage/app/public/${item.ch.picture}` }}
                            name={item?.title}
                            subHeading={item?.ch?.name}
                            date={moment(item?.created_at).format('DD-MM-YYYY')}
                            description={item?.description}
                            duration={item?.music_file ? '' : null}
                            playpress={() => { item?.music_file ? playItem?.id == item?.id ? pauseHandeler() : playHandeler(item) : null }}
                            play={item?.music_file ? playItem?.id == item?.id : null}
                            onPress={() => { props?.navigation.navigate('AnnouncementDetail', { item: item }) }}
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
            {/* <CustomButton onPress={() => { AsyncStorage.clear() }} title={'pause'} /> */}

        </View>
    )
}

const styles = StyleSheet.create({})