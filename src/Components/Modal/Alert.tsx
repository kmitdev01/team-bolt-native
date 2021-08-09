import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native"
import { Colors } from '../../Constants/Colors/Colors';
import { Fonts } from '../../Constants/Fonts';


interface AlertModal {
    visible: boolean;
    heading: string;
    text: string;
    okpress: () => void;
    modalpress: () => void;
}

const AlertModal = ({
    visible,
    heading,
    text,
    okpress,
    modalpress
}: AlertModal) => {
    return (
        <Modal
            visible={visible}
            transparent={true}>
            <TouchableOpacity style={styles.modalcontainer}
                onPress={modalpress}>
                <TouchableOpacity style={styles.modal} activeOpacity={1}>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: Fonts.MetropolisBold
                    }}>
                        {heading} </Text>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: Fonts.MetropolisMedium
                    }}>  {text} </Text>
                    <TouchableOpacity style={styles.okbtn}
                        onPress={okpress} >
                        <Text style={{ color: Colors.white, fontSize: 15, fontFamily: Fonts.MetropolisMedium }}>
                            Okay </Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}
export default AlertModal;

const styles = StyleSheet.create({

    modalcontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(46, 49, 49, 0.5)',
    },
    modal: {
        width: "85%",
        height: "18%",
        backgroundColor: Colors.white,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    okbtn: {
        width: 95,
        height: 42,
        backgroundColor: Colors.maincolor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
})