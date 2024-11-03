import React, { useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    PanResponder,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import images from '../commonconfig/images';
import OriantationFunction from './OriantationFunction';


const { width } = Dimensions.get('window');
export const CustomSwiper2 = ({ data }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    const renderItem = ({ item, index }) => {
        const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
        ];

        const imageScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[styles.itemContainer, { transform: [{ scale: imageScale }] }]}>
                <TouchableOpacity>
                    <Animated.Image
                        source={item}
                        style={{ width: width * 0.6, height: width * 0.6, transform: [{ scale: imageScale }], resizeMode: 'contain' }}
                    />
                    <Text>Focused Image</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={flatListRef}
                data={[images.logo2, images.alexavatar, images.logo2]}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                style={{ width: width * .6, }}
                contentContainerStyle={{ justifyContent: 'center' }}
            />

            <View style={styles.indicatorContainer}>
                {[images.logo2, images.alexavatar, images.logo2].map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 1.2, 0.8],
                        extrapolate: 'clamp',
                    });
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.1, 1, 0.3],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={i}
                            style={[styles.indicator, { opacity, transform: [{ scale }] }]}
                        />
                    );
                })}
            </View>
        </View>
    );
};



export const CustomSwiper = ({ data }) => {
    const Orientation = OriantationFunction();
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.floor(scrollPosition / Orientation.width + 0.5); // Calculate the closest index
        console.log('this is indexxx', index)
        setCurrentIndex(index);
    };

    const handleNext = () => {
        if (currentIndex < data?.length - 1) {
            scrollViewRef.current.scrollTo({ x: (currentIndex + 1) * Orientation.width, animated: true });
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            scrollViewRef.current.scrollTo({ x: (currentIndex - 1) * Orientation.width, animated: true });
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false, listener: handleScroll }
                )}
                scrollEventThrottle={16}
            >
                {data?.map((item, index) => (
                    <View key={index} style={[styles.swipeItem, { width: Orientation.width, }]}>
                        <Animated.Image
                            source={item}
                            style={{ width: width * 0.6, height: width * 0.6,  resizeMode: 'contain' }}
                        />
                        {/* <Text style={styles.itemText}>{item}</Text> */}
                    </View>
                ))}
            </ScrollView>

            <View style={styles.pagination}>
                {data?.map((_, index) => {
                    const inputRange = [(index - 1) * Orientation.width, index * Orientation.width, (index + 1) * Orientation.width]
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [.1, 1, .6],
                        extrapolate: 'clamp'
                    })
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 1.2, 0.8],
                        extrapolate: 'clamp'
                    })

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.dot,
                                { opacity, transform: [{ scale }] }
                            ]}
                        />
                    )
                }
                )}
            </View>

            <View style={[styles.controls, { width: Orientation.width * 0.8, }]}>
                <TouchableOpacity onPress={handlePrevious} disabled={currentIndex === 0}>
                    <Text style={styles.controlText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext} disabled={currentIndex === data?.length - 1}>
                    <Text style={styles.controlText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({

    // 2nd style
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeItem: {

        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    itemText: {
        fontSize: 24,
        color: '#333',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
    },
    dot: {
        height: 8,
        width: 8,
        backgroundColor: '#333',
        margin: 8,
        borderRadius: 4,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 10,

    },
    controlText: {
        fontSize: 18,
        color: '#007BFF',
    },

    // 1st style
    itemContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 10,
        // margin: 10,
    },

    indicatorContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
    },
    indicator: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
        margin: 5,
    },
});