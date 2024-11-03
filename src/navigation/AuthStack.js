import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { createStackNavigator } from '@react-navigation/stack';
import { Login, SignUp, Splash } from '../screen/index';
import MyStack from './MyStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName='Splash'
      // initialRouteName='Splash'
      screenOptions={{ headerShown: false, }}
    >
      <Stack.Screen name='Splash' component={Splash} />

      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />

      <Stack.Screen name='MyStack' component={MyStack} />


    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})