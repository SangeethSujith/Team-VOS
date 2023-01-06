import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { SIZES, COLORS, Fonts } from '../../Styles/theme';
import { CustomButtonTwo } from '../../Components/CustomButtonTwo';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { CustomButtonThree } from '../../Components/CustomButtonThree';
import { CustomFilter } from '../../Components/CustomFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderOne, LoaderTwo } from '../../Components/Loader';
import qs from 'qs';
import axios from 'axios';
import { BASE_URL, GET_TASKS } from '../../Apis/SecondApi';

const Pending = () => {
  const [loader, setloader] = useState(false);
  const [state1, setstate1] = useState('');
  useEffect(() => {
    getTask()
  }, []);
  async function getTask() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    //console.log(Data.Userid);
    let body = {
      user_id: Data.Userid,
      task_id: 5
    }
    axios.post(`${BASE_URL}/${GET_TASKS}`,
      qs.stringify(body)).then(async (response) => {
        await setstate1(response.data.tasks.new)
        console.log('data',response.data.tasks.new);
        setloader(false)
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }
  const [state, setstate] = useState({
    data: [{ id: 1, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 2, name: 'Kalpetta ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 3, name: 'Kannur ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 4, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 5, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 6, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 7, name: 'Kalpetta ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    ]
  })
  const showAlert = () =>
    Alert.alert(
      "Do you want to mark as completed ?",
      " ",
      [
        {
          text: "Cancel",
          cancelable: true,
          style: "cancel",
        },
        {
          text: "Ok",
          cancelable: true,
          //onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
      ],
    );
  return (
    <View style={styles.container}>
      {state1 !== '' ?
        <FlatList style={{ backgroundColor: 'white' }}
          data={state1.filter((item) => item.is_done == 0)}
          horizontal={false}
          scrollEnabled={true}
          //ListFooterComponent={}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => {
            return item.task_id;
          }}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.card}>
                  <Icon
                    name={"user-1"}
                    color={COLORS.primary}
                    size={35}
                    config={icoMoonConfigSet}
                    style={{ opacity: .4, marginLeft: 20 }}
                  />
                  <View style={{ marginLeft: 10, width: '75%' }}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text style={styles.text3}>{item.description}</Text>
                    <View style={styles.textrow}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text2}>{'Assigned By'}</Text>
                        <Text style={styles.text2}>{': '}</Text>
                      </View>
                      <Text style={styles.text2}>{item.created_by}</Text>
                    </View>
                    <View style={styles.textrow}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text2}>{'Assigned On'}</Text>
                        <Text style={styles.text2}>{': '}</Text>
                      </View>
                      <Text style={styles.text2}>{item.created_date}</Text>
                    </View>
                    <View style={styles.textrow}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text2}>{'Due Date'}</Text>
                        <Text style={styles.text2}>{': '}</Text>
                      </View>
                      <Text style={styles.text2}>{item.due_date}</Text>
                    </View>
                    {/*<View style={styles.textrow}>
                                        <View style={styles.innerrow}>
                                           <Text style={styles.text2}>{'Done Date'}</Text>
                                           <Text style={styles.text2}>{': '}</Text>
                                        </View>
                                        <Text style={styles.text2}>{'27/12/2022'}</Text>
                                    </View>*/}


                    <CustomButtonThree
                      title={'Mark as completed'}
                      //width1 ={'auto'}
                      style={{ alignSelf: 'center' }}
                      height1={SIZES.radius25}
                      onPress={showAlert}
                    />
                  </View>
                </View>
                <View style={styles.line} />
              </View>
            )
          }}
        />
        :
        <View>
          <LoaderTwo loader={loader} />
          <Text>Loading...............</Text>
        </View>}

    </View>
  )
}
export default Pending;
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
    width: '100%',
    alignSelf: 'center',
    height: 'auto',
    flexDirection: 'row',
    margin: 10,
    //justifyContent:'space-between'
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