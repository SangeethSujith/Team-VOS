import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { LoaderTwo } from './Loader';
import {
    View,
    Button,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    useIsDrawerOpen
} from '@react-navigation/drawer';
import { Icon, icoMoonConfigSet } from '../Styles/icons';
import { COLORS, Fonts, SIZES } from '../Styles/theme';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import { LOGIN } from '../Apis/SecondApi';
import { setSignIn, setSignOut } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function CustomDrawerContent(props) {
    const dispatch = useDispatch();
    const [name, setname] = useState('')
    const [loader, setloader] = useState(false);
    const [manager,setmanager]=useState('');
    useEffect(() => {
        setloader(true)
        //const isLoggedIn = useSelector(setSignIn);
        //console.log(isLoggedIn)
        getName();
    }, []);
    const getName = async () => {
        const userData = await AsyncStorage.getItem('User_Data');
        let Data = await JSON.parse(userData)
        await setname(Data.Name)
        await setmanager(Data.isManager)
        setloader(false)
    }
    const handleLogout = async (navigation) => {
        const user = {
            Status: ''
        };
        await AsyncStorage.setItem('User_Data', JSON.stringify(user))
        dispatch(setSignOut());

    }

    const stackArray = [
        {
            label: 'Home ',
            icon: require('../Assets/Images/homee.png'),
            stack: 'Home',
        },
        {
            label: 'Routes ',
            icon: require('../Assets/Images/routee.png'),
            stack: 'Routes',
        },
        {
            label: 'Orders ',
            icon: require('../Assets/Images/homeicon2.png'),
            stack: 'Orders',
        },
        {
            label: 'Customers',
            icon: require('../Assets/Images/homeicon3.png'),
            stack: 'Customers',
        },
        {
            label: 'Products',
            icon: require('../Assets/Images/ayurvedic.png'),
            stack: 'Products',
        },
        manager=='0'?{
            label: 'Expenses',
            icon: require('../Assets/Images/budget.png'),
            stack: 'Expenseslist',
        }:{
            label: 'Route Report',
            icon: require('../Assets/Images/homeicon6.png'),
            //function: 'handleLogout',
            stack: 'RouteReport'
        },
        {
            label: 'Tasks',
            icon: require('../Assets/Images/homeicon8.png'),
            //function: 'handleLogout',
            stack: 'Target'
        },
        {
            label: 'Messages',
            icon: require('../Assets/Images/conversation.png'),
            //function: 'handleLogout',
            stack: 'Messages'
        },
        {
            label: 'Training Videos',
            //icon    : 'exit1',
            icon: require('../Assets/Images/webinar.png'),
            stack: 'TrainingVideo'
        },
        {
            label: 'Change Password',
            icon: require('../Assets/Images/key.png'),
            //function: 'handleLogout',
            stack: 'ChangePassword'
        },
        {
            label: 'Logout',
            //function: 'handleLogout',
            icon: require('../Assets/Images/logout.png'),
            function: 'handleLogout',
            //stack: 'SignIn'
        },
        {
            label:'Version 1.0.1',
            icon: require('../Assets/Images/index.jpg'),
            stack:'Home',
        }
    ]

    return (
        <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>

            <View style={{ width: '100%', height: SIZES.sixty, backgroundColor: COLORS.primary }} />
            <View style={[styles.drawerWrapper]}>
                {/* <Icon
                    name={'user-1'}
                    size={SIZES.profile}
                    color={COLORS.primary}
                    config={icoMoonConfigSet}
                    style={{ alignSelf: 'center', marginTop: 20, opacity: .5 }}
                /> */}
                {/* {name ? */}

                <View>
                    <Image
                        style={{
                            width: 100, height: 100, borderWidth: 1, resizeMode: 'contain',
                            alignSelf: 'center', marginTop: 20, borderRadius: 50, borderColor: COLORS.black
                        }}
                        source={{ uri: 'https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg' }}
                    />
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.position}>{manager!=="1"&&'Sales Representative'}</Text>
                </View>
                {/* :
                    <LoaderTwo loader={loader} />} */}
                <View style={styles.line}></View>
                {
                    stackArray.map((item, index) => {
                        if (!(Boolean(item.function))) {
                            return (

                                <DrawerItem
                                    icon={({ focused, color, size }) => (
                                        <Image
                                            style={{ width: SIZES.icon, height: SIZES.icon, resizeMode: 'contain', alignSelf: 'center' }}
                                            source={item.icon}>
                                        </Image>
                                    )}
                                    label={({ focused, color }) =>
                                        <Text style={[styles.drawerLabel, { color: COLORS.gray_800 }]}>{item.label}</Text>
                                    }
                                    onPress={() =>
                                        props.navigation.navigate(item.stack,
                                            item.screen && {
                                                screen: item.screen,
                                                params: {
                                                    statusBarIdenti: item.params ? item.params : ''
                                                }
                                            }
                                        )
                                    }

                                    //style={[styles.drawerItem, {}]}
                                    //focused={activeItem == item.stack ? true : false}
                                    key={index}
                                />
                            )
                        } else {
                            return (
                                <DrawerItem
                                    icon={({ focused, color, size }) => (
                                        <Image
                                            style={{ width: SIZES.icon, height: SIZES.icon, resizeMode: 'contain', alignSelf: 'center' }}
                                            source={item.icon}>
                                        </Image>
                                    )}
                                    label={({ focused, color }) =>
                                        <Text style={[styles.drawerLabel, { color: COLORS.gray_200 }]}>{item.label}</Text>
                                    }
                                    onPress={() =>
                                        item.function ? handleLogout() && props.navigation.navigate(item.stack,
                                            item.screen && {
                                                screen: item.screen,
                                                params: {
                                                    statusBarIdenti: item.params ? item.params : ''
                                                }
                                            }
                                        ) : null
                                    }
                                    // onPress={() =>
                                    //     item.function ? LogOut() : null
                                    // }

                                    style={[styles.drawerItem, {}]}
                                    // focused={activeItem == item.stack ? true : false}
                                    key={index}
                                />
                                
                            )
                        }
                    })

                }
            </View>
        </DrawerContentScrollView>
    );
}



const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        //paddingLeft: 35,
        //paddingRight: 35,
        height: 70,
        width: "100%",
        //borderRadius: 5
    },
    drawerIcon: {
        color: COLORS.primary
    },
    drawerItem: {
        padding: widthPercentageToDP(.4),//.5
        borderBottomWidth: .3,
        borderColor: '#13914c',
        backgroundColor: '#fff'
    },
    drawerLabel: {
        fontFamily: Fonts.font_400,
        fontSize: SIZES.medium,
        color: '#374045',
        //left    : widthPercentageToDP(-6),
    },
    drawerWrapper: {
        //backgroundColor: 'red'

    },
    profileWrap: {
        //minHeight      : Theme.SCREEN_HEIGHT / 4.3,
        backgroundColor: '#F5F5F5',
        marginBottom: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'red'
    },
    image: {
        height: heightPercentageToDP(8.5),
        width: heightPercentageToDP(8.5),
        borderRadius: heightPercentageToDP(4.25),
        borderWidth: SIZES.bordertwo,
        borderColor: 'green',
        resizeMode: 'cover',
    },
    text1: {
        //fontFamily: "Roboto",
        fontSize: SIZES.extralarge,
        color: "#2D98F9",
        marginBottom: heightPercentageToDP(.5)
    },
    text2: {
        // fontFamily: "Roboto",
        fontSize: SIZES.small,
        color: "grey",
        marginLeft: SIZES.sixty,
        marginTop: 20
    },
    name: {
        fontFamily: Fonts.font_800,
        fontSize: SIZES.large,
        color: COLORS.black,
        alignSelf: 'center'
    },
    position: {
        fontFamily: Fonts.font_400,
        fontSize: SIZES.medium,
        color: COLORS.black,
        alignSelf: 'center'
    },
    bakcgroundImage0: {
        marginLeft: 120,
        //marginTop :80,
        //padding   :1,
        alignSelf: 'center',
        height: 50,
        width: 140,
        //borderBottomLeftRadius:120

    },
    line: {
        width: '100%',
        height: 2,
        backgroundColor: '#FDF7D3',
        marginTop: 10
    }
});