import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { GET_ORDERS_DETAILS, API_URL } from '../../Apis/FirstApi';
import axios from 'axios';

const Detail = ({ navigation, route }) => {

    const { param } = route.params;
    console.log(param)
    const [state, setstate] = useState('')

    useEffect(() => {
        getOrder();
    }, []);

    async function getOrder() {
        const token = await AsyncStorage.getItem('userToken');
        const current = new Date();
        const prior = new Date().setDate(current.getDate() - 30);
        console.log(current.toISOString().split('T')[0]);
        let headers = {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        };
        axios.get(`${API_URL}/${GET_ORDERS_DETAILS}?ID=${param}`,
            headers).then(async (response) => {

                await setstate(response.data.Data)
                console.log('state' + state);
                return {
                    response: response.data
                };
            }).catch((err) => {
                console.log(err)
            });
    }

    //const result = param2.reduce((total, currentValue) => total = total + currentValue.amount, 0);

    function ListOfItems() {
        return (
            <View style={{ width: SIZES.windowwidth / 1.2, alignSelf: 'center' }}>
                <FlatList style={{ backgroundColor: 'transparent' }}
                    data={state.SalesOrderTrans}
                    horizontal={false}
                    scrollEnabled={true}
                    //ListHeaderComponent={renderHeader}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(item) => {
                        return item.ItemID;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <View style={styles.card}>
                                    <View style={{ width: '80%' }}>
                                        <Text style={styles.textitem}>{item.ItemName}</Text>
                                        <Text style={styles.textitem2}>{item.Qty}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.text5}>Price :{item.MRP}</Text>
                                            <Text style={styles.text5}>Quantity :{item.Qty}</Text>
                                            <Text style={styles.text5}>Amount :{item.GrossAmount}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />

            </View>
        )
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} />
            {/*<KeyboardAwareScrollView behavior={"position"} 
                                contentContainerStyle={{ flexGrow: 1, }} 
                                enableOnAndroid={Platform.OS === 'android'} 
                                enableAutomaticScroll={true} >*/}
            <CustomHeaderTwo
                heading={'Order Details'}
                onpress={() => navigation.goBack()}
            />
            <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
                <Text style={styles.text}>{state.CustomerName}</Text>
                <Text style={styles.text3}>{'Place'}</Text>
                <View style={styles.line} />
                <View style={styles.textrow}>
                    <Text style={styles.text3}>{'No.of Items'}</Text>
                    <Text style={styles.text4}>{state.length === 0 ? '0.00' : state.NoOfItems}</Text>
                </View>
                <View style={styles.textrow}>
                    <Text style={styles.text3}>{'Gross Amount'}</Text>
                    <Text style={styles.text4}>{state.length === 0 ? '0.00' : state.NetAmount}</Text>
                </View>
                <View style={styles.line} />
                <Text style={styles.text1}>{'Items'}</Text>
                <View style={styles.itemcontainer}>
                    {state.length === 0 ?
                        <Text style={styles.text2}>{'No Orders'}</Text>
                        : <ListOfItems />}
                </View>
            </View>
            {/*</KeyboardAwareScrollView>*/}
        </View>

    )
}
export default Detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    card: {
        backgroundColor: COLORS.primary_light,
        width: SIZES.windowwidth / 1.2,
        alignSelf: 'center',
        height: SIZES.windowwidth / 4.5,
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: .6
    },
    elevation: {
        //elevation: 20,
        //shadowColor: 'black',
    },
    text: {
        color: COLORS.black,
        fontSize: SIZES.verylarge,
        fontFamily: Fonts.font_500,
        marginBottom: 3,
        alignSelf: 'center'
    },
    text1: {
        color: COLORS.black,
        fontSize: SIZES.large,
        fontFamily: Fonts.font_500,
        marginVertical: 15,
        //alignSelf:'center'
    },
    textitem: {
        color: COLORS.black,
        fontSize: SIZES.large,
        fontFamily: Fonts.font_500,
        //marginVertical:15,
        //alignSelf:'center'
    },
    textitem2: {
        color: COLORS.black,
        fontSize: SIZES.medium,
        fontFamily: Fonts.font_500,
        //marginVertical:15,
        //alignSelf:'center'
    },
    text2: {
        color: '#b2b8b4',
        fontSize: SIZES.medium,
        fontFamily: Fonts.font_400,
        marginTop: '50%',
        //marginBottom:3,
        alignSelf: 'center'
    },
    text3: {
        color: 'grey',
        fontSize: SIZES.medium,
        fontFamily: Fonts.font_400,
        alignSelf: 'center',
        marginVertical: 5,
    },
    text5: {
        color: 'grey',
        fontSize: SIZES.small,
        fontFamily: Fonts.font_400,
        alignSelf: 'center',
        marginVertical: 5,
    },
    text4: {
        color: COLORS.black,
        fontSize: SIZES.medium,
        fontFamily: Fonts.font_400,
        alignSelf: 'center',
        marginVertical: 5,
    },
    plusbutton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        overflow: 'hidden',
        alignSelf: 'flex-end',
        backgroundColor: 'green',
        marginTop: 80,
        //justifyContent:'center',
        borderColor: 'white',
        borderWidth: .5,
        elevation: 20,
        shadowColor: 'black',
        justifyContent: 'center',
        marginTop: -80
    },
    plus: {
        color: 'white',
        alignSelf: 'center',
        //textAlignVertical:'center',
        fontSize: 35,
    },
    checkboxrow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'space-evenly',
        height: 45,
        width: '100%',
        elevation: 6,
        borderRadius: 5,
        //borderColor:'grey',
        //borderWidth:1,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.black,

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox: {
        alignSelf: "center",
    },
    buttonrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    textrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    line: {
        height: .5,
        width: '100%',
        backgroundColor: '#b2b8b4',
        marginVertical: 5
    },
    itemcontainer: {
        //flex:1,
        width: '100%',
        height: '60%',
        borderRadius: 7,
        backgroundColor: COLORS.background,
        //justifyContent:'center'
        //borderWidth:.5,
        //borderColor:'#b2b8b4'
    },
    logo: {
        height: SIZES.extralarge,
        width: SIZES.extralarge,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    }
});