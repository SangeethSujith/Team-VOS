import React from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet
} from 'react-native';

import { COLORS } from '../Styles/theme';

import Spinner from 'react-native-loading-spinner-overlay';


export { LoaderTwo, LoaderOne }



const LoaderOne = (props) => {
    const { style, loader } = props;
    return (
        <Spinner
            visible={loader}
            // textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            cancelable={true}
            color={'blue'}
            size={'large'}
        />
    )
}



const LoaderTwo = (props) => {

    const { style, loader } = props;

    return (
        <ActivityIndicator size="small"
            color={COLORS.primary}
            style={{ flex: 1, alignSelf: "center" }}
            animating={loader}
        />
    )
}






const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#0000001f',
        minHeight: '50%'
    },
    spinnerTextStyle: {
        color: '#2D96F8'
    },

})
