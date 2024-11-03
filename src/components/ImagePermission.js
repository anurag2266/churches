import { Linking, Platform } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";


const openAppSettings = () => {
    Linking.openSettings();
};
// camera picker
const openCamera = (selectedImage,id) => {
    const Options = {
        storageOptions: {
            mediaType: 'photo',
            saveToPhotos: true,
        },
        // includeBase64: true,
    };
    launchCamera(Options, response => {
        if (response.didCancel) {
            console.log('user cancalled image picker');
        } else if (response.error) {
            console.log('image Picker Error :', response.error);
        } else if (response.customButton) {
            console.log('user tapped custom button : ', response.customButton);
        } else {
            const source = response.assets[0];
            selectedImage(response.assets[0])
            return (source)
            // setImageUri(source);
            //setprofile(source.uri);
            //saveData(source.uri);
            // setProfileSelector('camera');
        }
    });
};
const openGallery = (selectedImage, id) => {
    const Options = {
        storageOptions: {
            path: 'images',
            mediaType: 'photo',
            saveToPhotos: true,
        },
        // includeBase64: true,
    };
    launchImageLibrary(Options, response => {
        // console.log('ressss', Options, response)
        if (response.didCancel) {
            console.log('user cancalled image picker');
        } else if (response.error) {
            console.log('image Picker Error :', response.error);
        } else if (response.customButton) {
            console.log('user tapped custom button : ', response.customButton);
        } else {
            selectedImage(response.assets[0],  id ? id : 0 )
        
            // return (response.assets[0])
            // const source = response.assets[0];
            // const newArray = [...imageUri];
            // newArray.splice(id, 0, { id: id, ...source });
            // setImageUri(newArray);
            // setImageUri([...imageUri, { id: id, ...source }])
        }
    });
};
export async function requestCameraPermission(type, selectedImage, id) {
    // console.log("value of seelect image function",typeof selectedImage, type)
    try {
        const permissionType =
            Platform.OS === 'android'
                ? PERMISSIONS.ANDROID.CAMERA
                : PERMISSIONS.IOS.CAMERA;

        const result = await request(permissionType);
        console.log('result', result)
        if (result === RESULTS.GRANTED) {
      
            type == 'camera' ? openCamera(selectedImage, id)
                : openGallery(selectedImage, id);
            // You can now use the camera
        } else if (result === RESULTS.DENIED) {
            console.log('Camera permission denied');
            openAppSettings();
        }
    } catch (error) {
        console.error('Error requesting camera permission:', error);
    }
};