import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { View } from 'react-native';

import { Small, Original } from './style';

const OriginalAnimated = Animated.createAnimatedComponent(Original);


export default function LazyImage({
    shouldLoad,
    aspectRatio,
    smallSource,
    source,
}) {
    const opacity = new Animated.Value(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (shouldLoad) {
            setTimeout(() => {
                setLoaded(true);
            }, 500)
        }
    }, [shouldLoad]);

    function handleAnimate() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Small
            source={smallSource}
            ratio={aspectRatio}
            resizeMode='contain'
            blurRadius={1}
        >
            {loaded &&
                <OriginalAnimated
                    style={{ opacity }}
                    source={source}
                    ratio={aspectRatio}
                    resizeMode='contain'
                    onLoadEnd={handleAnimate}
                />
            }
        </Small>
    );
}