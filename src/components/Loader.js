import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

const Loader = props => {
    const {
        loading,
        setloading,
    } = props;
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {
                setTimeout(() => {
                    setloading(!loading);
                }, 2000);
            }}
            >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" color='#951C35' animating={loading} />
                </View>
            </View>
        </Modal>
    )
};

export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})