import React, { useState } from 'react';
import Animated, { Easing } from 'react-native-reanimated';

export default function ImageLoader(){
    const Icon = require('../assets/icon.png');
    const [opacity, setOpacity] = useState(new Animated.Value(0));

    const onLoad = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear
        }).start();
    }

    return(
        <Animated.Image 
            onLoad={onLoad}
            source={Icon} 
            style={[
                {
                    opacity: opacity,
                    transform: [{
                        scale: opacity.interpolate({
                            inputRange: [0,1],
                            outputRange: [0.85, 1],
                        }) 
                    }]
                }
            ]}
        />
    );
}