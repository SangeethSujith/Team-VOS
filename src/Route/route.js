import React, { useRef, useEffect, useState } from 'react';
import CustomDrawerContent from '../Components/CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../Styles/theme';
import Home from '../Screens/Home';
import CreateCall from '../Screens/CreateCall';
import SignIn from '../Screens/SignIn';
import Orders from '../Screens/Orders';
import TodayCalls from '../Screens/TodayCalls';
import TodayCallsRoute from '../Screens/TodayCallsRoute';
import CallDetails from '../Screens/CallDetails';
import SampleIssue from '../Screens/SampleIssue';
import Invoices from '../Screens/Invoices';
import Leads from '../Screens/Leads';
import Customers from '../Screens/Customers';
import CustomerDetails from '../Screens/CustomerDetails';
import DispatchDetails from '../Screens/DispatchDetails';
import Tasks from '../Screens/Tasks';
import SelectCustomers from '../Screens/SelectCustomer';
import CreateOrder from '../Screens/CreateOrder';
import Products from '../Screens/Products';
import Routes from '../Screens/Routes';
import Messages from '../Screens/Messages';
import Expenseslist from '../Screens/Expenseslist';
import ChangePassword from '../Screens/ChangePassword';
import TrainingVideo from '../Screens/TrainingVideo';
import ArdhavilamKC from '../Screens/TrainingVideo/VideoPages/ArdhavilamKC';
import Vyoshamrutham from '../Screens/TrainingVideo/VideoPages/Vyoshamrutham';
import NisothamadiK from '../Screens/TrainingVideo/VideoPages/NisothamadiK';
import SapthachadadiK from '../Screens/TrainingVideo/VideoPages/SapthachadadiK';
import AadareesahacharadiK from '../Screens/TrainingVideo/VideoPages/AadareesahacharadiK';
import Amalakarishtam from '../Screens/TrainingVideo/VideoPages/Amalakarishtam';
import BruhathNK from '../Screens/TrainingVideo/VideoPages/BruhathNK';
import PanchagandhadiC from '../Screens/TrainingVideo/VideoPages/PanchagandhadiC';
import ThakrarishtaC from '../Screens/TrainingVideo/VideoPages/ThakrarishtaC';
import ChithrakagranthikadiK from '../Screens/TrainingVideo/VideoPages/ChithrakagranthikadiK';
import Expenses from '../Screens/Expenses';
import Target from '../Screens/Target';
import SelectProducts from '../Screens/SelectProducts';
import OrderDetails from '../Screens/OrderDetails';
import InvoiceOrder from '../Screens/InvoiceOrder';
import InvoiceDetails from '../Screens/InvoiceDetails';
import Detail from '../Screens/Details';
import Reports from '../Screens/Reports';
import SubLedger from '../Screens/SubLedger';
import ItemsNCustomers from '../Screens/ItemsNCustomers';
import SalesByCustomer from '../Screens/SalesByCustomer';
import ItemWiseSales from '../Screens/ItemWiseSales';
import SampleIssue2 from '../Screens/SampleIssue2';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/slices/authSlice';
import {
    Platform,
    StatusBar,
    //AsyncStorage
} from 'react-native';
const useInitialRender = () => {
    const [isInitialRender, setIsInitialRender] = React.useState(false);
    if (!isInitialRender) {
        setTimeout(() => setIsInitialRender(true), 10);
        return true;
    }
    return false;
};

const MainStackCreator = createNativeStackNavigator();
function MainSectionStack({ navigation }) {
    const isInitialRender = useInitialRender();
    useEffect(() => {
        getUserToken();
    }, []);

    const [Error, setError] = useState('');
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const getUserToken = async () => {
        const value = await AsyncStorage.getItem("User_Data");
        const auth = JSON.parse(value)
        console.log(auth)
        setError(auth.Status);
        console.log(Error);
    }
    getUserToken();
    return (
        <MainStackCreator.Navigator
            initialRouteName={Error ? "Home" : "SignIn"}
            screenOptions={(props) => ({
                header: () => null
            })} >
            {/* {Error !== 1 && <MainStackCreator.Screen name="SignIn" component={SignIn}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />} */}
            {Error == false && <MainStackCreator.Screen name="SignIn" component={SignIn}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />}
            <MainStackCreator.Screen name="Home" component={Home}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="CreateCall" component={CreateCall}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Orders" component={Orders}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="TodayCalls" component={TodayCalls}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="CallDetails" component={CallDetails}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="SampleIssue" component={SampleIssue}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="SampleIssue2" component={SampleIssue2}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Invoices" component={Invoices}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="TodayCallsRoute" component={TodayCallsRoute}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                 <MainStackCreator.Screen name="InvoiceDetails" component={InvoiceDetails}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Leads" component={Leads}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Customers" component={Customers}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="CustomerDetails" component={CustomerDetails}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="DispatchDetails" component={DispatchDetails}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Tasks" component={Tasks}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="SelectCustomers" component={SelectCustomers}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="CreateOrder" component={CreateOrder}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Products" component={Products}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Routes" component={Routes}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Messages" component={Messages}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Expenseslist" component={Expenseslist}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="ChangePassword" component={ChangePassword}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="TrainingVideo" component={TrainingVideo}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="ArdhavilamKC" component={ArdhavilamKC}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="Vyoshamrutham" component={Vyoshamrutham}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="NisothamadiK" component={NisothamadiK}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="SapthachadadiK" component={SapthachadadiK}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="AadareesahacharadiK" component={AadareesahacharadiK}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="Amalakarishtam" component={Amalakarishtam}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="BruhathNK" component={BruhathNK}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="PanchagandhadiC" component={PanchagandhadiC}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="ThakrarishtaC" component={ThakrarishtaC}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="ChithrakagranthikadiK" component={ChithrakagranthikadiK}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Expenses" component={Expenses}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Target" component={Target}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="SelectProducts" component={SelectProducts}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="OrderDetails" component={OrderDetails}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="InvoiceOrder" component={InvoiceOrder}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Detail" component={Detail}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="Reports" component={Reports}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                <MainStackCreator.Screen name="ItemWiseSales" component={ItemWiseSales}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="SubLedger" component={SubLedger}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="ItemsNCustomers" component={ItemsNCustomers}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
            <MainStackCreator.Screen name="SalesByCustomer" component={SalesByCustomer}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
                


        </MainStackCreator.Navigator>
    )
}
const BeforeLoginCreator = createNativeStackNavigator();
function BeforeLoginStack({ navigation }) {
    return (
        <NavigationContainer>
            <BeforeLoginCreator.Navigator
                initialRouteName="SignIn"  >
                <BeforeLoginCreator.Screen name="SignIn" component={SignIn}
                    options={{
                        header: () => null,
                        transitionSpec: {
                            open: config,
                            close: config,
                        },
                    }}
                />
            </BeforeLoginCreator.Navigator>
        </NavigationContainer>
    )
}


const Drawer = createDrawerNavigator();
function AppStack() {
    const isInitialRender = useInitialRender();

    return (
        <Drawer.Navigator
            //openByDefault={false}
            defaultStatus='closed'
            backBehavior='initialRoute'
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerPosition={'left'}
            drawerStyle={{ width: isInitialRender ? 0 : '70%', height: '100%' }}
        >
            <Drawer.Screen name=" " component={MainSectionStack} options={{ headerShown: false }} />

        </Drawer.Navigator>
    )
}
const config = {
    animation: 'spring',
    config: {
        stiffness: 100000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};




function MainNavigation() {
    return (
        <>
            <AppStack />
            {Platform.OS === 'android' && <StatusBar barStyle='dark-content' backgroundColor={COLORS.white} animated={true} />}
        </>
    )
}




export default function route() {

    return (
        <NavigationContainer>
            <Provider store={store}>
                <MainNavigation />
            </Provider>
        </NavigationContainer>
    )
}