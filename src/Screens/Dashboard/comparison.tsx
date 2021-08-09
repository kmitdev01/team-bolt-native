import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable, Touchable, TouchableOpacity } from 'react-native';
import { Colors } from '../../Constants/Colors/Colors';
import { Fonts } from '../../Constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const comparison = ({ navigation, route }) => {
    const [selected, setSelected] = useState('');
    const { sub } = route.params
    console.log(sub[1].subCatName, "subcatory==============")

    const renderSubCat = (x, y) => {
        const isDensityGreater = Number(x.density) <= Number(y.density);
        const isPriceGreater = Number(x.price) <= Number(y.price)

        return (
            <View style={{ marginTop: 20 }}>
                <View >
                    <Text style={styles.text} > {x.subCatName} </Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 12,
                }}>
                    <View style={[styles.main,
                    selected === 'density'
                    &&
                    isDensityGreater
                    && styles.selectedCard]}>
                        <Text style={[styles.num,
                        selected === 'density'
                        &&
                        isDensityGreater
                        && { color: Colors.white }
                        ]}> {x.density} </Text>
                        <Text
                            style={[styles.nam,
                            selected === 'density'
                            &&
                            isDensityGreater
                            && { color: Colors.white }
                            ]}> Density {"\n"} g/cm^3  </Text>
                    </View>
                    <View style={[styles.main,
                    selected === 'price'
                    &&
                    isPriceGreater
                    && styles.selectedCard]}>
                        <Text style={[styles.num,
                        selected === 'price'
                        &&
                        isPriceGreater
                        && { color: Colors.white }
                        ]}> {x.price} </Text>
                        <Text style={[styles.nam,
                        selected === 'price'
                        &&
                        isPriceGreater
                        && { color: Colors.white }
                        ]}>Price {"\n"} Rs/Kg  </Text>
                    </View>
                    <View style={styles.main}>
                        <Text style={styles.num}> {x.weight} </Text>
                        <Text style={styles.nam}> Weight {"\n"} Kg  </Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={25}
                            color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={[styles.txt, {
                        marginStart: 95,
                        fontFamily: Fonts.MetropolisSemiBold,
                        fontSize: 18,
                    }]}>
                        COMPARISON </Text>
                </View>
                <Text style={[styles.txt,
                { fontFamily: Fonts.MetropolisMedium }]}>
                    {Array.from(new Set(sub.map(x => x.categoryName))).join(' / ')} </Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{
                    flex: 1,
                    paddingHorizontal: 19,
                }}>
                    {renderSubCat(sub[0], sub[1])}
                    {renderSubCat(sub[1], sub[0])}
                    <View style={{ marginTop: 25 }}>
                        <View style={{
                            alignItems: "center",
                            flexDirection: "row",
                        }}>
                            <Text style={styles.text}> Filters </Text>
                            <FontAwesome5 name="filter" size={16} />
                        </View>
                        <View style={styles.filter}>
                            <TouchableOpacity
                                style={[styles.btn,
                                {
                                    backgroundColor: selected === "density" ?
                                        Colors.maincolor : Colors.lightpink
                                }]}
                                onPress={() => setSelected('density')}>
                                <Text style={[styles.btntxt,
                                {
                                    color: selected === "density" ?
                                        Colors.white : "black",
                                }
                                ]}> DENSITY </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn,
                            {
                                backgroundColor: selected === "price" ?
                                    Colors.maincolor : Colors.lightpink
                            }
                            ]}
                                onPress={() => setSelected('price')}>
                                <Text style={[styles.btntxt,
                                {
                                    color: selected === "price" ?
                                        Colors.white : "black",
                                }]}> PRICE </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {selected ?
                        <View style={{ marginTop: 20, paddingStart: 10 }}>
                            {
                                sub[0][selected] == sub[1][selected] ?
                                    <Text style={{
                                        fontSize: 17,
                                        fontFamily: Fonts.MetropolisMedium
                                    }}>
                                        <Text style={{
                                            color: Colors.maincolor,
                                            fontFamily: Fonts.MetropolisBold
                                        }}>
                                            {sub[0][selected] >= sub[1][selected] ?
                                                sub[0].subCatName :
                                                sub[0].subCatName}
                                        </Text> / <Text style={{
                                            color: Colors.maincolor,
                                            fontFamily: Fonts.MetropolisBold
                                        }}> {sub[0][selected] >= sub[1][selected] ?
                                            sub[1].subCatName : sub[0].subCatName} </Text> both having equal
                                    </Text>
                                    :
                                    <Text style={{
                                        fontSize: 17,
                                        fontFamily: Fonts.MetropolisMedium,
                                    }}>
                                        <Text style={{
                                            color: Colors.maincolor,
                                            fontFamily: Fonts.MetropolisBold
                                        }}>{sub[0][selected] > sub[1][selected] ? sub[1].subCatName : sub[0].subCatName}
                                        </Text> is better than
                                        <Text style={{
                                            color: Colors.maincolor,
                                            fontFamily: Fonts.MetropolisBold
                                        }}> {sub[0][selected] > sub[1][selected] ? sub[0].subCatName : sub[1].subCatName}</Text> {"\n"}
                                        because lower the {selected} better the Fiber.  </Text>
                            }
                        </View> : null
                    }
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.back}
                onPress={() => navigation.navigate("welcome")}>
                <Text style={styles.backtxt}> BACK TO HOME </Text>
            </TouchableOpacity>
        </>
    )
}

export default comparison
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 80,
        backgroundColor: Colors.maincolor,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    txt: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Fonts.MetropolisMedium,
    },
    header: {
        flexDirection: "row",
        width: "100%",
        paddingStart: 25,
        top: 6
    },
    main: {
        backgroundColor: Colors.white,
        width: "30%",
        height: 130,
        alignItems: "center",
        justifyContent: "space-evenly",
        borderRadius: 12,
        borderColor: Colors.maincolor,
        borderWidth: 1
    },
    num: {
        fontSize: 34,
        fontFamily: Fonts.MetropolisSemiBold,
        color: Colors.maincolor,
    },
    nam: {
        fontFamily: Fonts.MetropolisSemiBold,
        textAlign: "center",
        color: "black"
    },
    text: {
        fontSize: 19,
        fontFamily: Fonts.MetropolisBold,
    },
    btn: {
        width: "47%",
        height: 55,
        backgroundColor: Colors.maincolor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    btntxt: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: Fonts.MetropolisSemiBold
    },
    filter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
        //  borderWidth:1
    },
    back: {
        width: "95%",
        height: 50,
        backgroundColor: Colors.maincolor,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
        alignSelf: "center"
    },
    backtxt: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: Fonts.MetropolisMedium
    },
    selectedCard: {
        backgroundColor: Colors.maincolor
    }
})
