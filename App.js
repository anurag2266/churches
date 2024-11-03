import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import AuthStack from './src/navigation/AuthStack'
import { ThemeProvider } from './src/commonconfig/ThemeContext'
import { Login, Splash } from './src/screen'
import { MenuProvider } from 'react-native-popup-menu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message';


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



export default function App() {

  useEffect(() => {
    logAsyncStorageValues(); // Logs AsyncStorage data on component load
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer >
        <MenuProvider>
          <ThemeProvider>
            {/* <Splash /> */}
            <Toast />
            <AuthStack />
          </ThemeProvider>
        </MenuProvider>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})