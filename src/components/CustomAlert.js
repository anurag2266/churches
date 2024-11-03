import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'

const Aler = createContext();

export const CustomAlert = ({ children }) => {
    const [isShow, setIsShow] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (isShow) {
            const intervalId = setInterval(() => {
                setIsShow(false);
            }, 2000);

            return () => clearInterval(intervalId);
        }
    }, [isShow]);

    const Alertmsg = (value) => {
        setMessage(value);
        setIsShow(true)
    }

    return (
        <Aler.Provider value={{ Alertmsg }} >
            {children}
            <Modal visible={isShow}
                animationType="slide"
                onRequestClose={() => setIsShow(false)}
                transparent={true}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.3)', alignItems: 'center', justifyContent: 'center' }} onPress={() => { setIsShow(false) }}>
                    <View style={[styles.containerStyle]}>
                        <Text>{message}</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        </Aler.Provider>
    )
}

// export const useMyAlert = useContext(Aler)
export const useMyAlert = () => {
    return useContext(Aler);
};



// export default function CustomAlert() {
//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             clearInterval(intervalId);
//             alert()
//         }, 5000);

//         return () => clearInterval(intervalId);
//     }, [])
//     const alert = () => {
//         return (
//             <Modal visible={true}
//                 animationType="slide"
//                 transparent={true}>
//                 <View style={{ backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
//                     <Text>CustomAlert</Text>
//                 </View>
//             </Modal>

//         )
//     }
//     // return alert();
// }

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
    }
})