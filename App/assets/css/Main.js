import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window")

const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height

export default StyleSheet.create({
    loginBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 170
    },
    mainContainer: {
        backgroundColor: '#FFF',
        flex: 1
    },
    inputFields: {
        marginTop: 25,
        width: 290,
        paddingLeft: 15,
        height: 40,
        borderColor: "#d3d3d3",
        borderWidth: 1,
        borderRadius: 10
    },
    inputFieldsRow: {
        marginTop: 10,
        width: 130,
        height: 40,
        borderColor: "#d3d3d3",
        borderWidth: 1,
        borderRadius: 10
    },
    buttonLogin: {
        backgroundColor: '#e24f2d',
        borderRadius: 5,
        width: 290,
        height: 40,
        paddingTop: 20,
        marginTop: 20
    },
    buttonRegister: {
        backgroundColor: 'white',
        borderColor: '#e24f2d',
        borderWidth: 1,
        borderRadius: 5,
        width: 290,
        height: 40,
        paddingTop: 20,
        marginTop: 10
    },
    buttonText: {
        color: '#e24f2d',
        fontWeight: 'bold'
    },
    photo: {
        alignSelf: 'center',
        height: 100,
        width: 80,
        color: 'white',
    },
    forgotPassword: {
        fontSize: 15,
        color: '#999',
        marginLeft: 150,
    },

})