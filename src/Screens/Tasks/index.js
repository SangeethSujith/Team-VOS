import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import { CustomButton } from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { GET_TARGET, API_URL, GET_TARGET_FSO } from '../../Apis/FirstApi';
import { LoaderOne, LoaderTwo } from '../../Components/Loader';
import axios from 'axios';
//import {Cust}

const Tasks = ({ navigation }) => {

  const [isSelected, setSelection] = useState([]);
  const [loader, setloader] = useState(false);
  const [state, setstate] = useState('')
  useEffect(() => {
    getTarget();
  }, []);

  async function getTarget() {
    setloader(true);
    const token = await AsyncStorage.getItem('userToken');
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    console.log(Data.UserCode)
    let headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    axios.get(`${API_URL}/${GET_TARGET_FSO}?FSOCode=${Data.UserCode}`,
      headers).then(async (response) => {
        setloader(false);
        await setstate(response.data.Data)
        console.log('state' + JSON.stringify(response.data.Data));
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }

  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Targets'}
        onpress={() => navigation.goBack()}
      />
      {state !== '' ?
        <FlatList style={{ backgroundColor: 'white', marginTop: 20 }}
          data={state}
          horizontal={false}
          scrollEnabled={true}
          //inverted={true}
          //contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          //ListFooterComponent={}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => {
            return item.FSOID;
          }}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.card}>
                  <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                      <View style={styles.textrow}>
                        <View style={styles.innerrow}>
                          <Text style={styles.text}>{'Target For'}</Text>
                          <Text style={styles.text}>{': '}</Text>
                        </View>
                        <Text style={styles.text3}>{item.Month} {item.Year}</Text>
                      </View>
                      <View style={styles.textrow}>
                        <View style={styles.innerrow}>
                          <Text style={styles.text3}>{'Target Type'}</Text>
                          <Text style={styles.text3}>{': '}</Text>
                        </View>
                        <Text style={styles.text2}>{item.TargetType}</Text>
                      </View>
                      <View style={styles.textrow}>
                        <View style={styles.innerrow}>
                          <Text style={styles.text3}>{'Target Amount'}</Text>
                          <Text style={styles.text3}>{': '}</Text>
                        </View>
                        <Text style={styles.text2}>{item.TargetAmount}</Text>
                      </View>
                      <View style={styles.textrow}>
                        <View style={styles.innerrow}>
                          <Text style={styles.text3}>{'Achieved'}</Text>
                          <Text style={styles.text3}>{': '}</Text>
                        </View>
                        <Text style={styles.text2}>{item.AchievementAmount}</Text>
                      </View>
                    </View>
                    <View style={{
                      width: 60, height: 60, borderColor: COLORS.primary, backgroundColor: COLORS.primary_light,
                      borderRadius: 30, borderWidth: 1, alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Text style={styles.text4}>
                        {parseFloat(item.AchievementAmount / item.TargetAmount * 100).toFixed(2)} %
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          }}
        />
        :
        <View>
          <LoaderTwo loader={loader} />
          <Text>Loading...............</Text>
        </View>}
      {state.length == 0 && loader == false &&
        <View style={{ marginTop: '60%', alignSelf: 'center' }}>
          <Text>No Targets</Text>
        </View>
      }
    </View>
  )
}
export default Tasks;
const styles = StyleSheet.create({
  tinyLogo: {
    width: SIZES.image120,
    height: SIZES.image120,
    alignSelf: 'center',
    opacity: .7
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    height: 'auto',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: 'black',
    borderRadius: 7
  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  text: {
    color: COLORS.black,
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_500,
    marginBottom: 3,
  },
  text2: {
    color: 'grey',
    fontSize: SIZES.vsmall,
    fontFamily: Fonts.font_400,
    marginVertical: 3,
  },
  text4: {
    color: 'black',
    fontSize: SIZES.vsmall,
    fontFamily: Fonts.font_600,
    marginVertical: 3,
    //width: '50%'
  },
  text3: {
    color: COLORS.heading_black,
    fontSize: SIZES.small,
    fontFamily: Fonts.font_400,
    marginBottom: 3,
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
  textrow: {
    flexDirection: 'row',
    alignItems: 'center',
    //width:300
  },
  innerrow: {
    width: '55%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  line: {
    height: .5,
    width: '100%',
    backgroundColor: '#b2b8b4'
  },

})
