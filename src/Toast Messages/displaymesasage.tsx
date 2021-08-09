import React from 'react';
import Snackbar from 'react-native-snackbar';
import { Colors } from '../Constants/Colors/Colors';



const displaySuccessToast = (message) => {
    return Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: Colors.Success,
        textColor: Colors.white,
    });
}


const displayErrorToast = (message,) => {
    return Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: Colors.Danger,
        textColor: Colors.white
    });
};

export {
    displayErrorToast,
    displaySuccessToast
}