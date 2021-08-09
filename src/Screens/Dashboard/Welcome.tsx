import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    TouchableOpacityBase,
    TouchableHighlightBase
} from 'react-native';
import { Colors } from '../../Constants/Colors/Colors';
import ImgHeader from '../../Components/Imgheader';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Fonts } from '../../Constants/Fonts';
import { Images } from '../../Assets';
import { useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Getcategory, imgurl } from '../../API/Api';
import { useEffect } from 'react';
import AlertModal from '../../Components/Modal/Alert';
import { TouchableOpacityComponent } from 'react-native';


const DATA = [
    {
        id: 1,
        header: "Fibers and Polymers",
        items: "9 Items",
        childlist: [
            {
                id: 4,
                color: "#FFF8E7",
                img: Images.first,
                text: "Zylon Fiber"
            },
            {
                id: 5,
                color: "#EFDFE7",
                img: Images.second,
                text: "Carbon Fiber"
            },
            {
                id: 6,
                color: "#E9E0D2",
                img: Images.th,
                text: "Nylon Fiber"
            },
            {
                id: 7,
                color: "#F0DED5",
                img: Images.fth,
                text: "Leather"
            },
            {
                id: 8,
                color: "#E0E5FD",
                img: Images.fif,
                text: "Polyester"
            },
            {
                id: 9,
                color: "#FDF9DF",
                img: Images.six,
                text: "Rayon"
            },
            {
                id: 10,
                color: "#DFECEF",
                img: Images.sev,
                text: "High density Polyethylene"
            },
            {
                id: 11,
                color: "#E6EEF3",
                img: Images.eth,
                text: "Low density polyethylene"
            },
            {
                id: 12,
                color: "#E8E8F0",
                img: Images.nin,
                text: "Polystyrene"
            },

        ]
    },
    {
        id: 2,
        header: "Metals",
        items: "6 Items",
        childlist: [

            {
                id: 13,
                color: "#E0E5FD",
                img: Images.fif,
                text: "Polyester"
            },
            {
                id: 14,
                color: "#FDF9DF",
                img: Images.six,
                text: "Rayon"
            },
            {
                id: 15,
                color: "#DFECEF",
                img: Images.sev,
                text: "High density Polyethylene"
            },
        ]
    },
    {
        id: 3,
        header: "Plastics",
        items: "4 Items",
        childlist: [
            {
                id: 16,
                color: "#E6EEF3",
                img: Images.eth,
                text: "Low density polyethylene"
            },
            {
                id: 17,
                color: "#E8E8F0",
                img: Images.nin,
                text: "Polystyrene"
            },
        ]
    },
]

const Welcome = ({ navigation }) => {
    const [indices, setIndices] = useState([]);
    const [modal, setmodal] = useState(false)
    const [select, setselect] = useState(false)
    const [list, setList] = useState([]);
    const [alert, setalert] = useState("")

    const onSelect = idx => {
        let newValues = [...indices];
        const index = newValues.indexOf(idx);
        if (index === -1) {
            if (newValues.length === 2) {
                return onlytwo();
            }
            newValues.push(idx)

        } else {
            newValues.splice(index, 1)
        }
        console.log(newValues)
        setIndices(newValues);
    }

    const getSelectedItems = () => {
        const selectedItems = [];
        list.forEach(x => {
            x.subCategoryData.forEach(y => {
                if (indices.includes(y._id)) {
                    selectedItems.push({ ...y, categoryName: x.catName })
                }
            })
        })
        return selectedItems;
    }

    const cancel = (item) => {
        setIndices(indices.filter(x => x !== item))
    }

    const onlytwo = () => {
        setalert("Cannot select more than 2 elements")
        setmodal(!modal)
    }

    const alertchange = () => {
        setalert("please select two elements")
        setmodal(!modal)
    }

    useEffect(() => {
        Getcategory()
            .then(Response => {
                console.log(Response.data.data, " get category")
                setList(Response?.data?.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <>
            <ImgHeader />
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                <FlatList
                    data={list}
                    renderItem={({ item }) => {
                        return <ListItem item={item} indices={indices} onSelect={onSelect} />
                    }}
                    keyExtractor={(item) => item._id}
                />
                <AlertModal
                    visible={modal}
                    modalpress={() => setmodal(!modal)}
                    heading={"Alert"}
                    text={alert}
                    okpress={() => setmodal(!modal)}
                />
            </View>
            {indices.length > 0 ?
                <View style={styles.bottomview}>
                    <TouchableOpacity
                        style={[styles.round,
                        { backgroundColor: !select ? Colors.maincolor : Colors.gray }]}
                        onPress={() => setselect(!select)}>
                        <Octicons
                            name={!select ? "chevron-up" : "chevron-down"}
                            size={25}
                            color={!select ? Colors.white : Colors.maincolor} />
                        <Octicons
                            name={!select ? "chevron-up" : "chevron-down"}
                            size={25}
                            color={!select ? Colors.white : Colors.maincolor}
                            style={{ position: "absolute", top: 20, left: 40, }} />
                    </TouchableOpacity>
                    <View style={styles.compareview}>
                        {select ?
                            <View style={{ backgroundColor: Colors.white }}>
                                <View style={styles.sub}>
                                    <Text style={styles.category}> Category</Text>
                                    <Text style={styles.category}> Sub Category </Text>
                                </View>
                                <FlatList
                                    data={getSelectedItems()}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.selectview}>
                                                <ExpandableText text={item.categoryName} />
                                                <ExpandableText text={item.subCatName} />
                                                {/* <View style={{ flex: 1, alignItems: "flex-end" }}> */}
                                                <Entypo name="squared-cross"
                                                    size={20}
                                                    color={Colors.maincolor}
                                                    onPress={() => cancel(item._id)} />
                                                {/* </View> */}
                                            </View>
                                        )
                                    }}
                                    keyExtractor={(item) => item._id}
                                />
                            </View> : null
                        }
                        <TouchableOpacity style={[styles.compare,
                        { backgroundColor: indices.length == 2 ? Colors.maincolor : Colors.gray }]}
                            onPress={() =>
                                indices.length < 2 ? alertchange() :
                                    navigation.navigate('comparison', { sub: getSelectedItems() })} >
                            <Text style={[styles.txt,
                            { color: indices.length == 2 ? Colors.white : "black" }]}> COMPARE </Text>
                        </TouchableOpacity>
                    </View>
                </View> : null}
        </>
    )
}

const ExpandableText = ({ text, style }) => {
    const [numLines, setNumLines] = useState(1);
    return (
        <Text
            style={[
                styles.expand, style
            ]}
            numberOfLines={numLines}
            onPress={() =>
                setNumLines(numLines === 1000 ? 1 : 1000)}>{text}
        </Text>
    )
}

const ListItem = ({ item, onSelect, indices }) => {
    const [expand, setexpand] = useState(false)

    const List = ({ item, checked, id, onSelect }) => {
        const img = `${imgurl}/${item.catImg}`
        return (
            <>
                {expand ?
                    <TouchableOpacity style={{
                        backgroundColor: !checked ? Colors.white : "#EFDFE7",
                        alignItems: "center",
                        borderRadius: 10,
                        margin: 8,
                        elevation: 3
                    }}
                        onPress={() => {
                            onSelect(id)
                        }}>
                        <View style={{ padding: 10 }}>
                            <Image source={{ uri: img }}
                                style={{
                                    width: 155,
                                    height: 110,
                                    borderRadius: 10
                                }}
                                resizeMode="cover" />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            flex: 1,
                            paddingHorizontal: 7
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontFamily: Fonts.MetropolisBold,
                                textAlign: "left",
                                flex: 1,
                                padding: 3
                            }}> {item.subCatName}
                            </Text>
                            {checked ?
                                <View style={{ marginStart: 10 }}>
                                    <Ionicons name={"ios-checkmark-circle"}
                                        size={25} color={Colors.maincolor} />
                                </View> : null}
                        </View>
                    </TouchableOpacity> : null
                }
            </>
        )
    }

    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.renderitem}
                onPress={() => setexpand(!expand)}>
                <ExpandableText
                    text={item.catName}
                    style={{ fontSize: 17 }} />
                {/* <Text style={{
                    fontSize: 17,
                    fontFamily: Fonts.MetropolisBold
                }}> {item.catName}</Text> */}
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Text style={{
                        marginEnd: 20,
                        fontFamily: Fonts.MetropolisSemiBold,
                        fontSize: 15
                    }}> {item.subCategoryData.length} items</Text>
                    <View style={styles.arrow}>
                        <Ionicons
                            name="caret-down-outline"
                            color={Colors.white}
                            size={16} />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 10 }}>
                <FlatList
                    data={item.subCategoryData}
                    renderItem={({ item, }) => {
                        const checked = indices.indexOf(item._id) !== -1;
                        const id = item._id
                        return <List item={item} {
                            ...{
                                onSelect, checked, id
                            }
                        }
                        />
                    }}
                    keyExtractor={(item) => String(item._id)}
                    numColumns={2}
                />
            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    renderitem: {
        // height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 18,
        paddingHorizontal: 12
    },
    main: {
        backgroundColor: Colors.white,
        marginTop: 18,
        borderRadius: 10,

    },
    arrow: {
        backgroundColor: Colors.maincolor,
        borderRadius: 4,
        width: 19,
        height: 19,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomview: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center"
    },
    round: {
        height: 50,
        width: 100,
        borderTopLeftRadius: 60,
        borderTopEndRadius: 60,
        borderWidth: 2,
        borderColor: Colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    compare: {
        backgroundColor: Colors.maincolor,
        height: 50,
        width: "100%",
        borderWidth: 3,
        borderColor: Colors.white,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    compareview: {
        width: "100%",
        paddingHorizontal: 10
    },
    txt: {
        fontSize: 18,
        fontFamily: Fonts.MetropolisMedium,
        color: Colors.white
    },
    category: {
        fontSize: 18,
        fontFamily: Fonts.MetropolisBold,
        flex: 1,
    },
    sub: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        height: 45,
        width: "100%",
        alignItems: "center",
    },
    selectview: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: Colors.lightpink,
        borderRadius: 20,
        marginTop: 10,
        paddingHorizontal: 15,
        alignItems: "center"
    },
    expand: {
        fontSize: 15,
        flex: 1,
        marginEnd: 15,
        fontFamily: Fonts.MetropolisBold,
    }
})