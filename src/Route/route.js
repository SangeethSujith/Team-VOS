import React, {useRef} from 'react';
import CustomDrawerContent from '../Components/CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer}  from '@react-navigation/native';
import { COLORS } from '../Styles/theme';
import Home from '../Screens/Home';
import CreateCall from '../Screens/CreateCall';
import SignIn from '../Screens/SignIn';
import Orders from '../Screens/Orders';
import TodayCalls from '../Screens/TodayCalls';
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
import Expenses from '../Screens/Expenses';
import Target from '../Screens/Target';
import SelectProducts from '../Screens/SelectProducts';
import OrderDetails from '../Screens/OrderDetails';

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
    return (
        <MainStackCreator.Navigator
            initialRouteName="SignIn"
            screenOptions={(props) => ({
                header: () => null
            })} >
            <MainStackCreator.Screen name="SignIn" component={SignIn}
                options={(props) => ({
                  header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })} />
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
            <MainStackCreator.Screen name="Invoices" component={Invoices}
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
            
            
            
 </MainStackCreator.Navigator>
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
          drawerStyle={{ width: isInitialRender ? 0 : '70%',height:'100%' }}
      >
          <Drawer.Screen name=" " component={MainSectionStack}  options={{ headerShown: false }}/>

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
            {Platform.OS === 'android' && <StatusBar barStyle='dark-content' backgroundColor={COLORS.white}  animated={true} />}
        </>
    )
  }
  
  
  
  
  export default function route() {
    return (
        <NavigationContainer>
            <MainNavigation />
        </NavigationContainer>
    )
  }