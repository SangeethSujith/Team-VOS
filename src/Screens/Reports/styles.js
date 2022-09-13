const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%'
    },
    card: {
        backgroundColor: 'white',
        width: '100%',
        alignSelf: 'center',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10
    },
    elevation: {
        //elevation: 20,
        //shadowColor: 'black',
    },
    text: {
        color: COLORS.black,
        fontSize: SIZES.small,
        fontFamily: Fonts.font_500,
        marginBottom: 5,
    },
    text2: {
        color: COLORS.black,
        fontSize: SIZES.small,
        fontFamily: Fonts.font_500,
        marginBottom: 5,
    },
    text3: {
        color: COLORS.heading_black,
        fontSize: SIZES.vsmall,
        fontFamily: Fonts.font_400,
        marginBottom: 5,
        //marginVertical:15,
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
    line: {
        height: .5,
        width: '100%',
        backgroundColor: '#b2b8b4'
    },
    modalStyle: {
        height: '40%',
        width: '90%',
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        elevation: 60,
        shadowColor: 'black',
        borderRadius: 10,
        //justifyContent:'center',
        //alignItems:'center'

    },
    textrow: {
        flexDirection: 'row',
        alignItems: 'center',
        //width:300
    },
    innerrow: {
        width: '50%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    heading: {
        //fontFamily: "poppins",
        fontFamily: Fonts.font_400,
        fontSize: SIZES.large,
        //fontStyle : 'normal',
        //textAlign:'center',
        //marginTop:heightPercentageToDP(.5),
        //fontSize: Theme.FONT_BIG,  
        //fontSize : Theme.FONT_TWNETY,
        color: COLORS.primary_black,
        marginBottom: 10
    }



});