import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, ActivityIndicator } from 'react-native';
import { Images } from '../../Assets';
import { Colors } from '../../Constants/Colors/Colors';
import { Fonts } from '../../Constants/Fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Button from '../../Components/Button';
import { useState } from 'react';
import { LoginApi } from '../../API/Api';
import { displayErrorToast, displaySuccessToast } from '../../Toast Messages/displaymesasage';
import { getData, storeData } from '../../API/AsyncStorage';


const Login = ({ navigation }) => {
    const [userdata, setuserdata] = useState({ email: "", password: "" })
    const [loading, setloading] = useState(false)


    const userlogin = async () => {
        setloading(true)
        LoginApi(userdata)
            .then(res => {
                setloading(false)
                if (res.data.user.role === "user") {
                    storeData("token", res.data.token)
                    displaySuccessToast("login Success")
                    navigation.navigate("welcome")
                }
                else {
                    displayErrorToast("invalid user")
                }
            })
            .catch(err => {
                setloading(false)
                displayErrorToast(err.response.data.message)
            })
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.img}>
                    <Image source={Images.logo} />
                </View>
                <View style={{
                    // borderWidth: 1,
                    alignItems: "center",
                }}>
                    <Text style={styles.login}> Login</Text>
                    <View style={styles.view}>
                        <View style={styles.inputview}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Username"}
                                onChangeText=
                                {(text) => setuserdata({ ...userdata, email: text })} />
                            <FontAwesome5 name="user-alt"
                                style={{
                                    fontSize: 20,
                                    color: Colors.maincolor,
                                    paddingEnd: 15
                                }} />
                        </View>
                        <View style={styles.inputview}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Password"}
                                onChangeText=
                                {(text) => setuserdata({ ...userdata, password: text })} />
                            <FontAwesome5 name="key"
                                style={{
                                    fontSize: 20,
                                    color: Colors.maincolor,
                                    paddingEnd: 15
                                }} />
                        </View>
                        {loading ?
                            <ActivityIndicator
                                size="large"
                                color={Colors.maincolor} />
                            :
                            <Button
                                text={"Login"}
                                onpress={() => userlogin()} />
                        }
                    </View>
                </View>
            </View>
        </>
    )
}
export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        alignItems: "center",
        height: "40%",
        justifyContent: "center",
    },
    login: {
        fontSize: 30,
        fontFamily: Fonts.MetropolisBold,
    },
    inputview: {
        width: "100%",
        height: 50,
        backgroundColor: Colors.white,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        paddingHorizontal: 20,
        fontSize: 16,
        fontFamily: Fonts.MetropolisRegular
    },
    view: {
        height: 240,
        paddingHorizontal: 20,
        width: "100%",
        justifyContent: "space-around",
        marginTop: 20
    }
})