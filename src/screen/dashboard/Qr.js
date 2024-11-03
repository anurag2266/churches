import { StyleSheet, Text, TouchableOpacity, View, Image, Linking, Dimensions } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { CSS_STYLES, FONT_STYLES } from '../../commonconfig/constStyle';
import images from '../../commonconfig/images';
import OrientationFunction from '../../commonconfig/OrientationFunction';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
const { width, height } = Dimensions.get('window');
export default function Qr(props) {
  const Orientation = OrientationFunction()

  const onSuccess = e => {
    // Remove all non-numeric characters (if any)
    let data = e?.data?.trim().replace(/\D/g, '');
  
    // Convert the cleaned data to a number
    let id = Number(data);
    console.log("Message:", id, "Type:", typeof id); // Debugging output
  
    // Ensure id is a valid number before navigating
    if (!isNaN(id) && id > 0) { 
      props?.navigation?.navigate('ChurchDetail', { church_id: id });
      console.log('Navigating to ChurchDetail with id:', id);
    } else {
      console.error('Invalid ID:', data);
    }
  };
  
  

  return (
    <View style={{ flex: 1, ...CSS_STYLES.c1 }}>

      <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
        {/* <View style={[CSS_STYLES.cf2, { marginBottom: 15 }]}>
          <Text style={{ ...FONT_STYLES.hb18 }}>Qr code</Text>
          <TouchableOpacity style={[{},]}>
            <Image source={images.close} style={{ height: 20, width: 20, resizeMode: 'contain', }} />
          </TouchableOpacity>
        </View> */}

        <QRCodeScanner
          onRead={onSuccess}
          reactivate={true}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          topContent={
            <Text style={styles.centerText}>
              Scan the QR code.
              {/* <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on */}

            </Text>
          }

        // bottomContent={
        //   <TouchableOpacity 
        //   // onPress={(e)=>{console.log('this is btn pres',e)}}
        //   style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
        />

<View style={styles.overlay}>
        <View style={styles.sideOverlay} />
        <View style={styles.centerBox}>
          {/* {/ L-shaped corners /} */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
        <View style={styles.sideOverlay} />
      </View>




      </View>

    </View>
  )
}

const styles = StyleSheet.create({


  centerText: {
    ...FONT_STYLES.h18,
    marginBottom: 15,
    textAlign: 'center'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },

  // mishra
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centerBox: {
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#00E676',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },

})


// import React from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';

// const { width, height } = Dimensions.get('window');

// export default function QRScanner() {
//   const onSuccess = (e) => {
//     console.log('QR Code Scanned:', e.data);
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
//       <QRCodeScanner
//         onRead={onSuccess}
//         reactivate={true}
//         cameraStyle={{ height: height }}
//         topContent={
//           <Text style={styles.centerText}>Scan the QR code</Text>
//         }
//       />
//       {/* {/ Overlay with L-shaped corners around the transparent scanning box /} */}
//       <View style={styles.overlay}>
//         <View style={styles.sideOverlay} />
//         <View style={styles.centerBox}>
//           {/* {/ L-shaped corners /} */}
//           <View style={[styles.corner, styles.topLeft]} />
//           <View style={[styles.corner, styles.topRight]} />
//           <View style={[styles.corner, styles.bottomLeft]} />
//           <View style={[styles.corner, styles.bottomRight]} />
//         </View>
//         <View style={styles.sideOverlay} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
 
  
// });

