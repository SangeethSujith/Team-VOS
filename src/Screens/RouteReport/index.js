import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {COLORS, Fonts, SIZES} from '../../Styles/theme';
import {CustomHeaderTwo} from '../../Components/CustomHeaderTwo';
import {Icon, icoMoonConfigSet} from '../../Styles/icons';
import { CustomButton } from '../../Components/CustomButton';
import {CustomInput} from '../../Components/CustomInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {LoaderTwo, LoaderThree} from '../../Components/Loader';
import {BASE_URL, ROUTES,SAVE_ROUTE_REPORT,GET_FSO} from '../../Apis/SecondApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';
const RouteReport = ({navigation}) => {
  useEffect(() => {
    getRoutes();
  }, []);
  const [loader, setloader] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [isPickerShow, setIsPickerShow] = useState(false);
  const onChange = async (event, value) => {
    await setDate(value);
    getRoutes();
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };
  const [input, setinput] = useState({
    type:'Worked Independently',
    desc:' '

  });
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState(null);
  const[value2,setValue2]=useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const [state, setstate] = useState('');
  const[state2,setstate2]=useState('')
  async function getRoutes() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData);
    let body = {
      user_id: Data.Userid,
      assigned_date: moment(date).format('YYYY-MM-DD'),
    };
    let body2 ={
      user_id:Data.Userid,
    }
    axios
      .post(`${BASE_URL}/${ROUTES}`, qs.stringify(body))
      .then(async response => {
        // await setstate(response.data.routes)
        // console.log(response.data.routes);
        // AsyncStorage.setItem('Routes', JSON.stringify(response.data.routes.new));
        const dropdata = response.data.routes.map(item => ({
          label: item.route_name,
          value: item.route_id,
        }));
        await setstate(dropdata);
        console.log(dropdata, 'routes');
        setloader(false);
        return {
          response: response.data,
        };
      })
      .catch(err => {
        console.log(err);
      });
      setloader(true);
      axios
      .post(`${BASE_URL}/${GET_FSO}`, qs.stringify(body2))
      .then(async response => {
        const dropdata2 = response.data.fso.map(item => ({
          label: item.name,
          value: item.user_id,
        }));
        await setstate2(dropdata2);
        console.log(dropdata2, 'fso');
        setloader(false);
        return {
          response: response.data,
        };
      })
      .catch(err => {
        console.log(err);
      });
  }
  const PostSave = async () => {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    let posts = {
      user_id: Data.Userid,
      route_id:value,
      route_date:moment(date).format('YYYY-MM-DD'),
      report_type:input.type,
      description:input.desc,
      fso_id:value2,
    }
    console.log(posts)
    axios.post(`${BASE_URL}/${SAVE_ROUTE_REPORT}`, qs.stringify(posts)).then(async (response) => {
      if (response.status == 200) {
        setloader(false);
        Alert.alert(
          "Saved Successfully ", '',
          [
            {
              text: "Yes",
              cancelable: true,
              onPress: () => navigation.navigate('Home'),
              style: "cancel",
            }],
        );
      }
      else {
        setloader(false);
        Alert.alert(
          "Failed Saving Expenses, Try Again")
      }
    }
    ).catch((err) => {
      console.log(err)
    });

  }
  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Route Report'}
        onpress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView behavior={"position"}
        contentContainerStyle={{ flexGrow: 1, }}
        enableOnAndroid={Platform.OS === 'android'}
        enableAutomaticScroll={true}>
      {state !== '' ? (
        <View style={{marginHorizontal: 25, marginTop: 10}}>
          <Text style={styles.text}>Create New Route Report</Text>
          <CustomInput
            type="calender"
            label="Date"
            labelBG="white"
            placeholderText="Pick A Date"
            onPressdate={() => setIsPickerShow(true)}
            value={moment(date).format('YYYY-MM-DD')}
            //datePicker={true}
            //icon={true}
            //iconname='location'
          />
          {isPickerShow && (
            <DateTimePicker
              value={date}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChange}
              style={styles.datePicker}
            />
          )}
          <View style={styles.container1}>
            <View style={[styles.labelContainer, {backgroundColor: '#fff'}]}>
              <Text
                style={[
                  styles.label,
                  {
                    color: COLORS.primary,
                  },
                ]}>
                Select Report Type
              </Text>
            </View>
            <View
              style={[
                styles.textInput,
                {
                  borderColor: COLORS.primary,
                },
              ]}>
              <Picker
                style={{width: '100%'}}
                selectedValue={input.type}
                itemStyle={{color: COLORS.primary_black, fontSize: SIZES.small}}
                onValueChange={(itemValue, itemIndex) =>
                  setinput({...input, type: itemValue})
                }>
                <Picker.Item
                  label="Worked Independently"
                  value="Worked Independently"
                />
                <Picker.Item label="Worked with FSO" value="Worked with FSO" />
                <Picker.Item label="Worked At Branch" value="Worked At Branch" />
                <Picker.Item label="Worked At HO" value="Worked At HO" />
              </Picker>
            </View>
          </View>
          {input.type=='Worked with FSO'&&
          <>
          <View style={styles.custom}>
            <View style={[styles.labelContainer, {backgroundColor: '#fff'}]}>
              <Text
                style={[
                  styles.label,
                  {
                    color: COLORS.primary,
                  },
                ]}>
                Routes
              </Text>
            </View>
            <DropDownPicker
              open={open}
              value={value}
              items={state}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="MODAL"
              modalProps={{
                animationType: 'fade',
              }}
              placeholderStyle={{
                color: 'grey',
                fontSize: SIZES.medium,
                fontFamily: Fonts.font_400,
              }}
              dropDownContainerStyle={{
                backgroundColor: '#fff',
                borderColor: '#fff',
              }}
              style={{borderColor: '#fff'}}
            />
          </View>
          <View style={styles.custom}>
            <View style={[styles.labelContainer, {backgroundColor: '#fff'}]}>
              <Text
                style={[
                  styles.label,
                  {
                    color: COLORS.primary,
                  },
                ]}>
                FSO
              </Text>
            </View>
            <DropDownPicker
              open={open2}
              value={value2}
              items={state2}
              setOpen={setOpen2}
              setValue={setValue2}
              setItems={setItems}
              listMode="MODAL"
              modalProps={{
                animationType: 'fade',
              }}
              placeholderStyle={{
                color: 'grey',
                fontSize: SIZES.medium,
                fontFamily: Fonts.font_400,
              }}
              dropDownContainerStyle={{
                backgroundColor: '#fff',
                borderColor: '#fff',
              }}
              style={{borderColor: '#fff'}}
            />
          </View>
          </>

          }
          <View style={{    position: 'relative',
    marginVertical: 10,
    height: '30%',}}>
            <View style={[styles.labelContainer, {backgroundColor: '#fff'}]}>
              <Text
                style={[
                  styles.label,
                  {
                    color: COLORS.primary,
                  },
                ]}>
                Select Report Type
              </Text>
            </View>
            <View
              style={
                {
                  borderColor: COLORS.primary,
                  flex: 1,
    borderWidth: 1,
    justifyContent: 'flex-start',
    borderRadius: 5,
    paddingHorizontal: 12,
    height: '80%',
                }
              }>
          <TextInput
                placeholder={'Enter Description'}
                onChangeText={(text) => {
              setinput({ ...input, desc: text })
            }}
                value={input.desc}
                color={COLORS.heading_black}
                underlineColorAndroid='transparent'
                style={{ fontSize: SIZES.medium, fontFamily: Fonts.font_400, width: '100%',height:'100%' }}
                placeholderTextColor={'grey'}
                multiline
              />
          </View>
          </View>
          <CustomButton
            title={'Submit'}
            onPress={() => PostSave()}
          />
        </View>
      ) : (
        <View>
          <LoaderTwo loader={loader} />
          <Text>Loading ....</Text>
        </View>
      )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RouteReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  text: {
    color: COLORS.heading_black,
    fontSize: SIZES.large,
    fontFamily: Fonts.font_700,
    marginVertical: 15,
  },
  text2: {
    color: COLORS.backgroundColor,
    fontSize: SIZES.large,
    fontFamily: Fonts.font_500,
  },
  text3: {
    color: COLORS.heading_black,
    fontSize: SIZES.vsmall,
    fontFamily: Fonts.font_400,
    marginBottom: 5,
    //marginVertical:15,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 12,
    height: '80%',
  },
  inputText: {
    fontSize: SIZES.radius15,
    fontFamily: Fonts.font_500,
    color: '#6B7B8D',
    textAlignVertical: 'center',
    height: '100%',
    width: '90%',
  },
  container1: {
    position: 'relative',
    marginVertical: 10,
    height: SIZES.button,
    //zIndex:1
  },
  label: {
    fontSize: SIZES.small,
    fontFamily: Fonts.font_400,
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    top: -13,
    left: 10,
    padding: 5,
    zIndex: 50,
  },
  custom: {
    // position: 'relative',
    // marginVertical: 10,
    // // padding:5,
    // height: SIZES.button,
    // borderRadius:5,
    borderColor: COLORS.primary,
    // // zIndex:1
    marginTop: 3,
    marginBottom: 10,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#fff',
  },
});
