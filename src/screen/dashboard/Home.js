import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { CSS_STYLES, FONT_STYLES, THEME_COLOR } from '../../commonconfig/constStyle'
import { CustomHeader, CustomInput, TouchableItems } from '../../components'
import { ChatCard2, ListCard } from '../../components/CustomCards'
import images from '../../commonconfig/images'
import { BaseUrl } from '../../commonconfig/config'
import axios from 'axios'
import Loader from '../../components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default Home = (props) => {

  const logAsyncStorageValues = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys(); // Get all keys in AsyncStorage
      const stores = await AsyncStorage.multiGet(keys); // Get values for each key

      stores.forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    } catch (error) {
      console.error("Failed to retrieve AsyncStorage data:", error);
    }
  };



  const [loading, setLoading] = useState(false);
  const [churchList, setChurchList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);

  // api callll============================================
  const getAnnouncements = () => {

    let data = new FormData();
    // data.append('church_id', ch_id);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://church.blackbullsolution.com/api/churches',
      headers: {
        // Authorization: 'Bearer ' + token,
        // 'Content-Type': 'multipart/form-data',
      },
      // data: ch_id ? data : null
    };

    axios.request(config)
      .then((response) => {
        setLoading(false)
        if (response?.data?.success) {
          setChurchList(response?.data?.data);
          setSearchedList(response?.data?.data);
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
    logAsyncStorageValues()
    return () => { };
  }, [])

  // ============================================

  const searchHandeler = (sea) => {
    if (sea?.length > 0) {
      let arr = churchList.filter(e => {
        if ((e?.name.toLowerCase().includes(sea.trim().toLowerCase())) || (e?.address.toLowerCase().includes(sea.trim().toLowerCase()))) { return e }
        else { return null }
      })
      setSearchedList(arr)
    } else { setSearchedList(churchList) }
  }


  return (
    <View style={{ flex: 1, backgroundColor: THEME_COLOR, }}>
      <Loader loading={loading} />
      <CustomHeader title={'Churches'} />

      <CustomInput
        placeholder={'Search (church name / location)'}
        rightImage={images.search}
        rightImageStyle={{ tintColor: 'rgba(0,0,0,.3)' }}
        onChangeText={(e) => { searchHandeler(e) }}
        mainContainer={{ marginHorizontal: 15 }}
      />

      <FlatList
        data={searchedList}
        keyExtractor={(i) => { 'church_' + i }}
        contentContainerStyle={{ gap: 10, marginHorizontal: 15, marginTop: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <ListCard
              image={{ uri: `https://church.blackbullsolution.com/storage/app/public/${item.picture}` }}
              name={item?.name}
              subHeading={item?.address}
              description={item?.description}
              imageStyle={{ height: 90, width: 90 }}
              noOfLine={2}
              onPress={() => {
                props?.navigation.navigate('ChurchDetail', { church_id: item?.id, item: item, picture: item.picture })
              }}
            />


          )
        }}
      // ListEmptyComponent={() => {
      //   return (
      //     <View style={{ flex: 1, ...CSS_STYLES.c1 }}>
      //       <Text style={[FONT_STYLES.hb30, { opacity: .3 }]}>No Item Found</Text>
      //     </View>
      //   )
      // }}
      />

    </View>
  )
}

const styles = StyleSheet.create({})