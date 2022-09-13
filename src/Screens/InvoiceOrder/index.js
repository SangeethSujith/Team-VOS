import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { CustomFilter } from '../../Components/CustomFilter';
import axios from 'axios';
import { SIZES, COLORS, Fonts } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, GET_ORDERS } from '../../Apis/FirstApi';
import { LoaderOne, LoaderTwo } from '../../Components/Loader';
import moment from 'moment'

const InvoiceOrder = ({ navigation, route }) => {
    const { param } = route.params;
    const [loader, setloader] = useState(false);
    const [state, setstate] = useState('');
    const [data, setdata] = useState('')
    const [value1, setvalue1] = useState(moment().format('DD-MM-YYYY'));
    const [value2, setvalue2] = useState(moment().subtract(30, 'days').format('DD-MM-YYYY'));
    const [date1, setDate1] = useState(new Date(Date.now()))
    const [date2, setDate2] = useState(new Date(Date.now()))
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [isPickerShow2, setIsPickerShow2] = useState(false);
    const [PickerVisible, setPickerVisible] = useState(false);
    const onDateSelected1 = (event, value) => {
        setDate1(value);
        setvalue2(moment(date1).format('DD-MM-YYYY'))
        setIsPickerShow(false)
    };
    function onDateSelected2(event, value) {
        setDate2(value);
        setvalue1(moment(date2).format('DD-MM-YYYY'))
        setIsPickerShow2(false)
    };
    function datefilter() {
        setstate('')
        getOrder();
        //console.log("30 days before" + date)
        setPickerVisible(false)
        //setData
    }
    useEffect(() => {
        getOrder();
    }, []);

    async function getOrder() {
        setloader(true);
        const token = await AsyncStorage.getItem('userToken');
        const current = new Date();
        const prior = new Date().setDate(current.getDate() - 30);
        console.log(current.toISOString().split('T')[0]);
        let headers = {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        };
        axios.get(`${API_URL}/${GET_ORDERS}?Offset=0&Limit=0&FromDate=${value2}&ToDate=${value1}&CustomerCode=${param}`,
            headers).then(async (response) => {

                await setstate(response.data.Data)
                setloader(false);
                console.log(response.data.Data);
                return {
                    response: response.data
                };
            }).catch((err) => {
                console.log(err)
            });
    }


    // if (state.length === 0) {
    //     return (
    //         <View style={{ flex: 1 }} >
    //             <CustomHeaderTwo
    //                 heading={'Orders'}
    //                 onpress={() => navigation.goBack()}
    //             />
    //             <View style={styles.containerone}>
    //                 <Image
    //                     style={styles.tinyLogo}
    //                     source={require('../../Assets/Images/noorder.jpg')}
    //                 />
    //                 <Text style={{ alignSelf: 'center' }}>No Confirmed orders </Text>
    //             </View>
    //         </View>
    //     )
    // }
    // else {
    return (
        <View style={styles.container}>
            <CustomHeaderTwo
                heading={'Orders'}
                onpress={() => navigation.goBack()}
            />
            <CustomFilter
                value1={date1}
                value2={date2}
                onPressdate1={() => setIsPickerShow(true)}
                condition1={isPickerShow}
                text1={moment(date1).format("YYYY-MM-DD")}
                onChangevalue1={onDateSelected1}
                onPressdate2={() => setIsPickerShow2(true)}
                condition2={isPickerShow2}
                text2={moment(date2).format("YYYY-MM-DD")}
                onChangevalue2={onDateSelected2}
                onPress={() => datefilter()}
                PickerVisible={PickerVisible}
                PickerVisibletrue={() => setPickerVisible(true)}
                PickerVisiblefalse={() => setPickerVisible(false)}
            />
            {state !== '' && state.length > 0 ?
                <View>
                    <FlatList style={{ backgroundColor: 'transparent', marginBottom: 100 }}
                        data={state}
                        horizontal={false}
                        scrollEnabled={true}
                        //ListHeaderComponent={renderHeader}
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                        keyExtractor={(item) => {
                            return item.ID;
                        }}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ marginVertical: 5, marginHorizontal: 15 }}>
                                    <TouchableOpacity style={styles.card}
                                        onPress={() => navigation.navigate('Detail', {
                                            param: item.ID
                                        })}>
                                        <View style={{ margin: 10 }}>
                                            <Text style={styles.text}>{item.CustomerName}</Text>
                                            <Text style={styles.textitem}>Order No : {item.SONo}</Text>
                                            <View style={styles.raw}>
                                                <Text style={styles.text5}>No.of Items :{item.NoOfItems}</Text>
                                                <Text style={styles.text5}>Amount :{item.NetAmount}</Text>
                                            </View>
                                            <View style={styles.raw}>
                                                <Text style={styles.text5}>Date :{item.SODate}</Text>
                                                <Text style={styles.text5}>{item.Status}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>
                :
                <View>
                    <LoaderTwo loader={loader} />
                    {/* <Text>Loading...............</Text> */}
                </View>}
            {state.length == 0 && loader == false &&
                <View style={{ marginTop: '90%', alignSelf: 'center' }}>
                    <Text>No Orders</Text>
                </View>
            }
        </View>
    )
    // }
}
export default InvoiceOrder;
const styles = StyleSheet.create({
    tinyLogo: {
        width: SIZES.image120,
        height: SIZES.image120,
        //marginTop:200,
        alignSelf: 'center',
        opacity: .7
    },
    containerone: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    card: {
        width: '100%',
        height: 'auto',
        backgroundColor: COLORS.primary_light,
        alignSelf: 'center',
        borderColor: COLORS.primary,
        borderWidth: .5,
        borderRadius: 7
        //shadowColor:COLORS.primary,
        //elevation:20
    },
    text: {
        color: COLORS.black,
        fontSize: SIZES.small,
        fontFamily: Fonts.font_600,
        marginBottom: 3,
        //alignSelf:'center'
    },
    text1: {
        color: COLORS.black,
        fontSize: SIZES.large,
        fontFamily: Fonts.font_500,
        marginVertical: 15,
        //alignSelf:'center'
    },
    textitem: {
        color: COLORS.primary_black,
        fontSize: SIZES.medium,
        fontFamily: Fonts.font_500,
        //marginVertical:15,
        //alignSelf:'center'
    },
    text2: {
        color: '#b2b8b4',
        fontSize: SIZES.medium,
        fontFamily: Fonts.font_400,
        //marginTop:'50%',
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
    raw: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        //width:'80%',
        //alignSelf:'center'
    }
})