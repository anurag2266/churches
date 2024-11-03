import * as React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Platform,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Announcement, Home, Qr, Search } from '../screen/index';
import images from '../commonconfig/images';
import { THEME_COLOR } from '../commonconfig/constStyle';
import Profile from '../screen/dashboard/Profile';

// import OriantationFunction from '../components/OriantationFunction';


const Tab = createBottomTabNavigator();

export default BottomStack = () => {
    // const Orientation = OriantationFunction();
    // const c = useTheme().colors;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabel: false,
                // tabBarActiveTintColor: THEME_COLOR,
                // tabBarInactiveTintColor: 'blue',
                // backgroundColor: 'red',
                // position: 'absolute',

                tabBarStyle: {
                    height: 60,
                    elevation: 0,
                    borderRadius: 30,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    paddingHorizontal: 15,
                    paddingVertical: 0,
                    backgroundColor: '#fff'

                },
            }}
            initialRouteName="Announcement">
            <Tab.Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarLabel: () => {
                        return null;
                    },

                    tabBarIcon: ({ color, size, focused }) =>

                        <View
                            style={[focused && styles.backVIew]}
                        >
                            <Image
                                source={images.profile}
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: 'contain',
                                    tintColor: focused ? '#fff' : '#000',
                                }}
                            />
                            {/* <Text style={{ ...FONT_STYLES.h13, color:focused ? THEME_COLOR :'#000',}}>Quote</Text> */}

                        </View>


                }}
            />
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarLabel: () => {
                        return null;
                    },
                    tabBarIcon: ({ color, size, focused }) =>

                        <View
                            style={[focused && styles.backVIew,]}
                        >
                            <Image
                                source={images.church}
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: 'contain',
                                    tintColor: focused ? '#fff' : '#000',
                                }}
                            />
                            {/* <Text style={{ ...FONT_STYLES.h13, color:focused ?THEME_COLOR :'#000', }}>Trade</Text> */}
                        </View>

                }}
            />
            <Tab.Screen
                name="Announcement"
                component={Announcement}
                options={{
                    tabBarLabel: () => {
                        return null;
                    },
                    tabBarIcon: ({ color, size, focused }) =>
                        <View
                            style={[focused && styles.backVIew,]}
                        >
                            <Image
                                source={images.annou}
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: 'contain',
                                    tintColor: focused ? '#fff' : '#000',
                                }}
                            />
                            {/* <Text style={{ ...FONT_STYLES.h13, color: focused ?THEME_COLOR :'#000', }}>Position</Text> */}
                        </View>

                }}
            />

            <Tab.Screen
                name="qr"
                component={Qr}
                options={{
                    tabBarLabel: () => {
                        return null;
                    },
                    tabBarIcon: ({ color, size, focused }) =>

                        <View
                            style={[focused && styles.backVIew,]}
                        >
                            <Image
                                source={images.scanner}
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: 'contain',
                                    tintColor: focused ? '#fff' : '#000',
                                }}
                            />
                            {/* <Text style={{ ...FONT_STYLES.h13, color: focused ?THEME_COLOR :'#000',}}>Profile</Text> */}
                        </View>

                }}
            />
            <Tab.Screen
                name="search"
                component={Search}
                options={{
                    tabBarLabel: () => {
                        return null;
                    },
                    tabBarIcon: ({ color, size, focused }) =>

                        <View
                            style={[focused && styles.backVIew,]}
                        >
                            <Image
                                source={images.search}
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: 'contain',
                                    tintColor: focused ? '#fff' : '#000',
                                }}
                            />
                            {/* <Text style={{ ...FONT_STYLES.h13, color: focused ?THEME_COLOR :'#000',}}>Profile</Text> */}
                        </View>

                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    backVIew: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        // borderRadius:10,
        backgroundColor: 'red',
        borderRadius: 50,
        // elevation: 20,
        // shadowColor: THEME_LIGHT,
    },
});
