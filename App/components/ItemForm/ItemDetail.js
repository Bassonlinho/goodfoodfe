import React from 'react';
import {
    View, TouchableOpacity, ScrollView, ToastAndroid,
    Image, Dimensions, Text
} from 'react-native';
import styles from '../../assets/css/Main'
import { connect } from 'react-redux';
import { Icon as ElementIcon, FormInput, Button, Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setInitialState, getItemById } from '../../actions/ItemActions';
import MapView from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';
const { width } = Dimensions.get("window");
const SCREEN_WIDTH = width;
class ItemDetail extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    static navigationOptions = {
        title: 'Item detail',
        headerStyle: {
            backgroundColor: '#e24f2d',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            textAlign: "center",
            flex: 1,
            fontWeight: 'bold'
        },
        headerLayoutPreset: 'center',
        headerRight: (<View />),

    };
    componentDidMount() {
        this.props.getItemById(this.props.navigation.getParam('itemId'));
    }

    componentWillUnmount() {
        console.log('evevevev')
        this.props.setInitialState('itemDetail')
    }

    render() {
        const { itemLocation } = this.state;
        const { itemDetail } = this.props;

        let src = require('../../assets/img/potato.jpg');
        if (itemDetail.signedURL) {
            src = { uri: itemDetail.signedURL };
        }
        console.log('qqqqqqqqqqqqqqqqqqqqq', itemDetail.rating);
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Image
                        style={{
                            height: SCREEN_WIDTH / 1.4,
                            marginBottom: 5,
                        }}
                        source={src}
                    />

                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                        <Text ellipsizeMode={'tail'} style={{ fontSize: 18, fontWeight: 'bold' }}>{itemDetail.name}</Text>
                        <Text ellipsizeMode={'tail'} style={{ fontSize: 16 }}>{itemDetail.description}</Text>
                        <Rating
                            imageSize={20}
                            readonly
                            startingValue={itemDetail.rating}
                            ratingColor={'#e24f2d'}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}
function mapStateToProps(state) {
    return {
        itemDetail: state.itemReducer.itemDetail,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getItemById: (id) => dispatch(getItemById(id)),
        setInitialState: (component) => dispatch(setInitialState(component))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemDetail)

