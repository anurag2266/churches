import { ActivityIndicator, Alert, FlatList, Image, Linking, PermissionsAndroid, Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BLUE, CSS_STYLES, FONT_STYLES, LIGHT_THEME, THEME_COLOR } from '../../commonconfig/constStyle';
import { CustomHeader, CustomInput, TouchableItems } from '../../components';
import { ChatCard2, ListCard } from '../../components/CustomCards';
import images from '../../commonconfig/images';
import OrientationFunction from '../../commonconfig/OrientationFunction';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseUrl } from '../../commonconfig/config';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function Profile({ navigation }) {
  const Orientation = OrientationFunction();
  const [emailtoggle, setemailtoggle] = useState(false);
  const [soundtoggle, setsoundtoggle] = useState(false);
  const [notitoggle, setnotitoggle] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userDatafull, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagelLoading, setImagelLoading] = useState(false);

  const photoUrl = "https://church.blackbullsolution.com/storage/app/public/images/";

  const getUserData = async () => {
    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem('userdata');
      const parsedData = JSON.parse(userData);

      let config = {
        method: 'get',
        url: BaseUrl + 'profile',
        headers: {
          Authorization: `Bearer ${parsedData?.token}`,
        },
      };

      const response = await axios.request(config);
      setUserData(response.data.user);
      setUserProfile(photoUrl + response.data.user.profile_pic);
    } catch (error) {
      console.log("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfilePicture = async (uri) => {
    setImagelLoading(true)
    try {
      const userData = await AsyncStorage.getItem('userdata');
      const parsedData = JSON.parse(userData);

      // Get the file extension from the uri
      const fileExtension = uri.split('.').pop();
      const mimeType = `image/${fileExtension}`; // Set the MIME type dynamically

      const formData = new FormData();
      formData.append('image', {
        uri,
        name: `profile.${fileExtension}`, // Dynamic file name based on extension
        type: mimeType,  // Dynamic MIME type
      });

      console.log("formdatra", formData);

      let config = {
        method: 'post',
        url: `${BaseUrl}update-profile`,
        headers: {
          Authorization: `Bearer ${parsedData?.token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      };

      const response = await axios.request(config);
      if (response.data.success) {
        setUserProfile(uri);
        setImagelLoading(false);
        Alert.alert('Success', 'Profile Picture Updated Successfully');
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      Alert.alert('Error', 'Failed to update profile picture. Please try again.');
    } finally {
      setImagelLoading(false); // Stop loading
    }
  };


  useEffect(() => {
    getUserData();
  }, []);

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Photo Library Permission',
            message: 'App needs access to your photo library to select images.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const openGallery = async () => {
    const grant = await requestGalleryPermission();
    const options = { mediaType: 'photo' };
    if (grant) {
      launchImageLibrary(options, (response) => {
        if (response.assets) {
          const uri = response.assets[0].uri;
          setUserProfile(uri);
          updateProfilePicture(uri);
        }
      });
    } else {
      Alert.alert(
        'Permission Required',
        'Please enable photo library permission from settings to use this feature.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  const onHandleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              navigation.replace('Login');
            } catch (error) {
              console.error("Error clearing async storage:", error);
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: THEME_COLOR }}>
      <CustomHeader title="Profile" />
      <TouchableOpacity onPress={openGallery} style={{ alignItems: 'center' }}>
        <Text style={[FONT_STYLES.hb13, { color: BLUE, marginBottom: 15 }]}>Edit Profile</Text>
        <View style={{ backgroundColor: LIGHT_THEME, borderRadius: 20, alignItems: "center", paddingBottom: 10 }}>
          {
            imagelLoading ? (<ActivityIndicator size="large" color={"#951C35"} style={{ height: Orientation.width * .5, width: Orientation.width * .5, resizeMode: 'contain', borderRadius: 20 }} />) : (
              <Image source={userProfile ? { uri: userProfile } : images.alexavatar} style={{ height: Orientation.width * .5, width: Orientation.width * .5, resizeMode: 'contain', borderRadius: 20 }} />
            )
          }

          <Text style={[FONT_STYLES.hb13, { color: BLUE, marginTop: 10 }]}>Click image to change</Text>
        </View>
      </TouchableOpacity>

      <View style={{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 15, paddingHorizontal: 15, paddingTop: 10 }}>
        <ScrollView>
          <Card heading="Name" value={userDatafull?.name || ""} />
          <Card heading="Email" value={userDatafull?.email || ""} text="Verified" />
          <Card heading="Password last updated" value="15 Days Ago" text="Update" textStyle={{ color: BLUE }} />
          <Card heading="New announcements email alert" value="Active" toggle={emailtoggle} toggleSwitch={() => setemailtoggle(!emailtoggle)} />
          <Card heading="App Sound" value="Inactive" toggle={soundtoggle} toggleSwitch={() => setsoundtoggle(!soundtoggle)} />
          <Card heading="Notifications" value="Active" toggle={notitoggle} toggleSwitch={() => setnotitoggle(!notitoggle)} />
        </ScrollView>

        <TouchableOpacity onPress={onHandleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={"#951C35"} />
        </View>
      )}
      <Toast />
    </View>
  );
}

const Card = ({ containerStyle, heading, headingStyle, value, valueStyle, text, textStyle, toggle, toggleSwitch }) => (
  <View style={[containerStyle]}>
    <View style={{ marginTop: 10, ...CSS_STYLES.cf2 }}>
      <Text style={[FONT_STYLES.h14, { color: 'rgba(0,0,0,.3)' }, headingStyle]}>{heading}</Text>
      {text ? <Text style={[FONT_STYLES.hb13, { color: 'rgba(0,0,0,.3)', marginTop: 10 }, textStyle]}>{text}</Text> : null}
      {toggleSwitch ? (
        <Switch
          trackColor={{ false: '#aaa', true: '#aaa' }}
          thumbColor={toggle ? 'red' : '#000'}
          onValueChange={toggleSwitch}
          value={toggle}
        />
      ) : null}
    </View>
    {value ? <Text style={[FONT_STYLES.hb18, {}, valueStyle]}>{value}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginBottom: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 13,
    backgroundColor: "black",
  },
  logoutText: {
    paddingHorizontal: 60,
    paddingVertical: 8,
    color: "#fff",
    fontWeight: "bold",
  },
});
