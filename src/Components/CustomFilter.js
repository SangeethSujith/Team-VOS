import React,{useState} from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import {Fonts ,COLORS,SIZES} from '../Styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { CustomInput } from './CustomInput';
import { CustomButton } from './CustomButton';
import { CustomButtonTwo } from './CustomButtonTwo';


export const CustomFilter = (props) => {
    const { 
        onPress,
        style,
        value1,
        value2,
        text1,
        text2,
        onChangevalue1,
        onChangevalue2,
        onPressdate1,
        onPressdate2,
        datePicker1,
        datePicker2
     } = props;
     const [PickerVisible, setPickerVisible]   = useState(false);
    return (
    <View style={styles.plusbutton}>
        <TouchableOpacity onPress={()=>setPickerVisible(true)}  activeOpacity={.7}>
                <Text style={styles.plus}>
                  Filter
                </Text>
        </TouchableOpacity>
        <Modal  isVisible={PickerVisible}
                onBackdropPress={() => setPickerVisible(false)}
                backdropOpacity={0.5}
                swipeDirection={'up'}
                style={styles.modalView}
                backdropTransitionOutTiming={0} >
                <View style={styles.modalStyle}>
                  <View style={{margin:20}}>
                    <Text style={styles.filter}>Filter By Date</Text>
                    <CustomInput
                        type = 'calender' 
                        label= 'Start Date'
                        labelBG='white'
                        placeholderText='Select Start Date'
                        value={value1}
                        input={text1}
                        onChangevalue={onChangevalue1}
                        onPressdate={onPressdate1}
                        datePicker={datePicker1}
                    />
                    <CustomInput
                        type = 'calender' 
                        label= 'End Date'
                        labelBG='white'
                        placeholderText='Select End Date'
                        value={value2}
                        input={text2}
                        onChangevalue={onChangevalue2}
                        onPressdate={onPressdate2}
                        datePicker={datePicker2}
                    />
                <View style={styles.buttonrow}>
                    <CustomButtonTwo
                        title={'Cancel'}
                        width1={SIZES.image210} 
                        onPress={()=>setPickerVisible(false)}
                    />
                    <CustomButton
                        title={'Apply'}
                        width1={SIZES.image210}
                        onPress={onPress}
                    />
                </View>
                
                </View>
            </View>
        </Modal>
</View>      
    )
}




const styles = StyleSheet.create({
    plus:{
        //color:COLORS.white,
        color:COLORS.primary_black,
        alignSelf:'center',
        fontFamily:Fonts.font_500,
        //textAlignVertical:'center',
        fontSize:SIZES.large,
      },
      filter:{
        color:COLORS.black,
        marginVertical:20,
        //alignSelf:'center',
        fontFamily:Fonts.font_600,
        //textAlignVertical:'center',
        fontSize:SIZES.large,
      },
      plusbutton:{
        height:40,
        width:'100%',
        //borderRadius:SIZES.radius30,
        overflow:'hidden',
        alignSelf:'flex-end',
        backgroundColor:'#D1F4D1',
        //backgroundColor:COLORS.primary,
        //marginTop:80,
        //justifyContent:'center',
        //borderColor:'white',
        //borderWidth:.5,
        elevation: 20,
        shadowColor: 'black',
        justifyContent:'center',
        //marginTop:-SIZES.profile,
        //marginHorizontal:25,
        //marginBottom:25 
        
      },
    modalStyle:{
        height:'40%',
        width:'100%',
        alignSelf:'baseline',
        backgroundColor:COLORS.white,
        borderRadius:SIZES.radius25
      },
    modalView: {
        margin: 0,
        justifyContent: 'flex-end'
      },
    buttonrow:{
        flexDirection:'row',
        justifyContent:'space-between',
        //marginTop:5
      },
});