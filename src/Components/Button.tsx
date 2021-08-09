import * as React from 'react';
import { Touchable, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Colors } from '../Constants/Colors/Colors';
import { Fonts } from '../Constants/Fonts';




const Button = ({
    style,
    text,
    onpress
}) => {
    return (
        <TouchableOpacity style={[styles.inputview, style]}
            onPress={onpress} >
            <Text style={styles.txt}>   {text}</Text>
        </TouchableOpacity>
    )
}
export default Button
const styles = StyleSheet.create({
    inputview: {
        width: "100%",
        height: 50,
        backgroundColor: Colors.maincolor,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    txt: {
        color: Colors.white,
        fontSize: 20,
        fontFamily: Fonts.MetropolisRegular

    }
})