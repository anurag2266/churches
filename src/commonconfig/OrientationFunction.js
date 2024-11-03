import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';

export default useOrientation = () => {

    const [screenInfo, setscreenInfo] = useState(Dimensions.get('screen'));

    useEffect(() => {
        const onChange = (result) => {
            // console.log("-----screenInfo----------------", result)
            setscreenInfo(result.screen);
        }

        const GETDETAILS = Dimensions.addEventListener('change', onChange);

        return () => GETDETAILS.remove()

    }, [])

    return {
        ...screenInfo,
        isPortrait: screenInfo.height > screenInfo.width
    }

}
