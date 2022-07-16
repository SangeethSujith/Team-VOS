import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import { CustomButton } from '../../Components/CustomButton';
//import {Cust}

const Tasks = ({ navigation }) => {

  const [isSelected, setSelection] = useState([]);

  const [state, setstate] = useState({
    data: [
      { id: 1, name: 'Elaj ayrvedic clinic', date: 'july 2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
      { id: 2, name: 'Kalpetta ayrvedic clinic', date: 'april 2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
      { id: 3, name: 'Kannur ayrvedic clinic', date: 'march 2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
      { id: 4, name: 'Elaj ayrvedic clinic', date: 'feb 2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
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
      <CustomHeaderTwo
        heading={'Targets'}
        onpress={() => navigation.goBack()}
      />
      <FlatList style={{ backgroundColor: 'white', marginTop: 20 }}
        data={state.data}
        horizontal={false}
        scrollEnabled={true}
        //ListFooterComponent={}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={styles.card}>
                <View style={{ margin: 10 }}>
                  <View>
                    <View style={styles.textrow}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text}>{'Target For'}</Text>
                        <Text style={styles.text}>{': '}</Text>
                      </View>
                      <Text style={styles.text3}>{item.date}</Text>
                    </View>
                    <View style={styles.textrow}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text3}>{'Target Type'}</Text>
                        <Text style={styles.text3}>{': '}</Text>
                      </View>
                      <Text style={styles.text2}>{'Patent'}</Text>
                    </View>
                    <View style={styles.textrow}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text3}>{'Target Amount'}</Text>
                        <Text style={styles.text3}>{': '}</Text>
                      </View>
                      <Text style={styles.text2}>{'789764'}</Text>
                    </View>
                    <View style={styles.textrow}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text3}>{'Achieved'}</Text>
                        <Text style={styles.text3}>{': '}</Text>
                      </View>
                      <Text style={styles.text2}>{'6466'}</Text>
                    </View>
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
