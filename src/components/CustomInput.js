import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function customInput({
  mainContainer,
  containerStyle,
  label, labelStyle,
  secureTextEntry,
  placeholder, placeholderTextColor,
  maxLength,
  inputContainerStyle,
  value,
  onpress,
  leftComponent,
  leftImage, leftImageStyle, onPressleft,
  rightText, rightTextStyle,
  rightTextOnpress,
  rightContainer, rightImage, rightImageStyle, onPressRight,
  barlineLeft, barlineLeftStyle,
  barlineRight, barlineRightStyle,
  onChangeText,
  keyboardType,
  editable,
  multiline,
  onBlur,
  onEndEditing,
  onSubmitEditing,
  countryCode, flag, onPresscode,
  rightComponent,
  error
}) {


  return (
    <View style={[styles.MainView2, mainContainer]}>
      {label ? (
        <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
      ) : null}
      <View style={[styles.MainView, { borderColor: '#C5CDD5' }, containerStyle]}>
        {leftImage ?
          <TouchableOpacity onPress={onPressleft}
            // style={{backgroundColor:'green'}}
            disabled={onPressleft ? false : true}>
            <Image source={leftImage} style={[styles.icon, leftImageStyle]} />
          </TouchableOpacity>
          : null}
        {countryCode ?
          <TouchableOpacity onPress={onPresscode}
            style={{ flexDirection: 'row', alignItems: 'center' }}
            disabled={onPresscode ? false : true}>
            {flag ? <Text style={{ color: '#000000', fontSize: 22, marginRight: 3 }}>{flag}</Text> : null}
            <Text style={{ color: '#000000', fontSize: 16 }}>{countryCode}</Text>
          </TouchableOpacity> : null}
          {leftComponent ? leftComponent() : null}
        {barlineLeft ? (
          <View style={[barlineLeftStyle, styles.linebarstyle]}></View>
        ) : null}
        <TextInput
          onPress={onpress}
          // underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ? placeholderTextColor : 'rgba(0,0,0,.4)'}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          keyboardType={keyboardType}
          editable={editable}
          multiline={multiline}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          onEndEditing={onEndEditing}
          style={[styles.inputContainerStyle, { color: '#000000' }, inputContainerStyle]}
        />
        {barlineRight ? (
          <View style={[styles.linebarstyle, barlineRightStyle,]}></View>
        ) : null}
        {rightImage ?
          <TouchableOpacity onPress={onPressRight}
            style={[rightContainer]}
            disabled={onPressRight ? false : true}>
            <Image source={rightImage} style={[styles.icon, rightImageStyle]} />
          </TouchableOpacity>
          : null}
        {rightText ?
          <TouchableOpacity onPress={rightTextOnpress}>
            <Text style={[rightTextStyle]} >{rightText}</Text>
          </TouchableOpacity> : null}
        {rightComponent ? rightComponent() : null}
      </View>
      
      {error ? (
        <Text style={[styles.errorStyle, labelStyle]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  MainView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    marginVertical: 5,
    // borderWidth: 1,
    // borderColor: 'rgba(000,000,000,.1)',
  },
  MainView2: {

  },
  labelStyle: {
    fontSize: 15,
    // marginBottom: 0,
    left: 5
  },
  errorStyle: {
    fontSize: 15,
    // marginBottom: 0,
    left: 5,
    color:'red'
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginHorizontal: 10,
  },
  inputContainerStyle: {
    flex: 1,
    fontSize: 16,
    // color: 'rgba(000,000,000,1)',
    marginHorizontal: 5,
    paddingVertical: Platform.OS == "ios" ? 15 : 10
  },
  linebarstyle: {
    height: 30,
    width: 1.5,
    backgroundColor: 'rgba(000,000,000,.1)',
    marginLeft: 5
  }
});

