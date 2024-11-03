import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform
} from 'react-native';
import { CSS_STYLES, FONT_STYLES, LIGHT_THEME, THEME_COLOR, } from '../commonconfig/constStyle';
import { CustomButton, CustomInput } from './index';
import images from '../commonconfig/images';
// import Lottie from 'lottie-react-native';

const CustomPopUp = ({
  mainContainer,
  popPress,
  image,
  imageStyle,
  onClose,
  componentContainer,
  isVisible,
  text,textContainer,
  textStyle,
  input,
  subText,
  subTextStyle,
  // when 2 button in popup
  buttonContainer,
  border,
  buttontitle1, buttonTextStyle1,
  buttontitle2, buttonTextStyle2,
  onPressButton1, onPressButton2,

  touchableStyle2,


  // when 1 btn in popup
  title,
  titleStyle,
  touchableStyle,
  onPress,
  children,

  cross, crossContainer,

  //lottie file
  lottie, lotteStyle,
  ...rest
}) => {
  // const { colors } = useTheme();
  // console.log('pop up ' ,lottie)
  return (
    <Modal animationType="none" transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(000,000,000,.9)',
          opacity: 1,
          alignItems: 'center',
          justifyContent: 'center',
          ...mainContainer
        }}>
        {/* top background */}
        <TouchableWithoutFeedback
          onPress={() => { onClose() }}>
          <View
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        </TouchableWithoutFeedback>

        {/* <View
          style={[
            {
              // width: Orientation.width - 40,
              alignItems: 'center',
              // alignSelf: 'center',
              // top: Orientation.height * 0.2,
              //backgroundColor:'yellow',
              padding:20
            },
            mainContainer,
          ]}> */}
        <TouchableOpacity
          onPress={popPress}
          disabled={popPress ? false : true}
          style={[styles.container, {}, componentContainer]}>

          <View style={[{ ...CSS_STYLES.cf2,width:'100%',paddingHorizontal:15 },textContainer]}>
            {text ? <Text
              style={[{
                fontSize: 18,
                color: '#000',
                fontWeight: '600',
                textAlign: 'center',
              }, textStyle,]}
            >{text}</Text>
              : null}
            {cross ? <TouchableOpacity onPress={() => onClose()} style={[{ alignSelf: 'flex-end', }, crossContainer]}>
              <Image source={images.close} style={{ height: 20, width: 20, resizeMode: 'contain', }} />
            </TouchableOpacity> : null}

          </View>
          {subText ? (
            <Text style={[{
              fontSize: 12,
              color: 'rgba(1,1,1,.4)',
              textAlign: 'center', fontWeight: '600', marginTop: 5
            }, subTextStyle,]}>
              {subText}
            </Text>
          ) : null}

          {input ? <CustomInput
            // underlineColorAndroid="transparent"
            {...rest}
          // style={[styles.inputContainerStyle, { color: '#000000' }, inputContainerStyle]}
          /> : null}

          {/* other components in children  */}
          {children}

          {/* button  */}
          {buttontitle1 || buttontitle2 ?
            <View style={{
              flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 10, marginBottom: 0, ...buttonContainer,
            }}>
              <CustomButton
                onPress={onPressButton1}
                title={buttontitle1 ? buttontitle1 : 'Cancel'}
                titleStyle={[{ color: LIGHT_THEME }, buttonTextStyle1]}
                colors={border ? ['transparent', 'transparent'] : ['#E8EBEE', '#E8EBEE']}
                border={border}
                containerStyle={[{}, touchableStyle2]}
                style={{ width: '45%', paddingVertical: 8, }}
                gradientStyle={{ borderRadius: 5, borderColor: 'rgba(0,0,0,.3)' }}
              />
              <CustomButton
                onPress={onPressButton2}
                title={buttontitle2 ? buttontitle2 : 'Confirm'}
                titleStyle={[buttonTextStyle2]}
                containerStyle={[{}, touchableStyle2]}
                style={{ paddingVertical: 8, width: '45%' }}
                gradientStyle={{ borderRadius: 5, }}
              />
            </View>
            : null}
          {title ?
            <CustomButton
              title={title}
              titleStyle={titleStyle}
              // containerStyle={[{ }, containerStyle]}
              onPress={onPress}
              style={[{ width: '100%', marginTop: 20 }, touchableStyle]}
              gradientStyle={[{ width: '80%', alignSelf: 'center' }, touchableStyle]}
            /> : null}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    // paddingVertical: 20,
    // paddingHorizontal: 20,
    //borderWidth: 0.5,
    //borderColor: '#C64B201A',
  },
  button: {
    borderWidth: 1,
    borderColor: THEME_COLOR,
    borderRadius: 10,
  },
  inputContainerStyle: {
    flex: 1,
    fontSize: 16,
    // color: 'rgba(000,000,000,1)',
    marginHorizontal: 5,
    paddingVertical: Platform.OS == "ios" ? 15 : 10
  },
});

export default CustomPopUp;