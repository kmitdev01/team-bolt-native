import * as React from 'react';
import {
    View,
    Text, StyleSheet,
    Image, TextInput
} from 'react-native';
import { Images } from '../Assets';
import { Colors } from '../Constants/Colors/Colors';
import { Fonts } from '../Constants/Fonts';


const ImgHeader = () => {
    return (
        <>
            <View style={styles.container}>
                <View style={{ marginTop: 9 }}>
                    <Image source={Images.logo} style={{ width: 40, height: 40 }} />
                </View>

                <Text style={styles.txt}> Welcome to
                    <Text style={{ fontFamily: Fonts.MetropolisBold, fontSize: 20 }}> team bolt</Text>  </Text>
            </View>
        </>
    )
}
export default ImgHeader

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 90,
        backgroundColor: Colors.maincolor,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingStart: 28,
    },
    txt: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Fonts.MetropolisMedium,
        marginTop: 3
    }
})