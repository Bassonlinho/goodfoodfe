import React from 'react';
import {
    View, TouchableOpacity, ScrollView, ToastAndroid
} from 'react-native';
import styles from '../../assets/css/Main'
import { connect } from 'react-redux';
import { Icon, FormInput } from 'react-native-elements';
import { setItemPropertyInReducer, createItem } from '../../actions/ItemActions';
import MapView from 'react-native-maps';
class ItemForm extends React.Component {
    static navigationOptions = {
        title: 'Form',
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
        headerRight: (<TouchableOpacity
            onPress={() => this.submitForm}
        >
            <Icon name="check" type='material-community' size={30} color="white" />
        </TouchableOpacity>),

    };
    constructor() {
        super();
        this.state = {
            itemLocation: {},
        };
    }

    componentDidMount() {
        let itemLocation = this.props.navigation.getParam('itemLocation');
        let pozicija = 'POINT(' + this.props.itemLocation.longitude + ' ' + this.props.itemLocation.latitude + ')';
        this.props.setItemPropertyInReducer('location', pozicija)
        this.setState({
            itemLocation: itemLocation
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.itemPostingSuccess === false && this.props.itemPostingSuccess === true) {
            this.props.navigation.navigate('HomeScreen');
        }
        if (prevProps.itemPostingFailed === false && this.props.itemPostingFailed === true) {
            ToastAndroid.show(("Something went wrong, please try again later!"), ToastAndroid.SHORT);
            this.props.setInitialState('itemPostingFailed');
        }
    }

    handleTextChange = (name, value) => {
        this.props.setItemPropertyInReducer(name, value);
    }

    submitForm = () => {
        const { itemLocation } = this.state;
        if (this.props.item.name &&
            this.props.item.description) {
            this.props.createItem(this.props.item, itemLocation);
        }
        else {
            ToastAndroid.show('Please enter required fields!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
    }


    render() {
        const { itemLocation } = this.state;
        const { item } = this.props;
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <MapView
                        style={styles.mapForm}
                        mapType="hybrid"
                        initialRegion={{
                            latitude: itemLocation.latitude, longitude: itemLocation.longitude, latitudeDelta: 0.0022,
                            longitudeDelta: 0.0022
                        }}
                        scrollEnabled={false}
                        pitchEnabled={false}
                        cacheEnabled={false}
                        showMyLocationButton={false}
                        showsUserLocation={false}
                        followUserLocation={false}
                        rotateEnabled={false}
                        zoomEnabled={false}>
                        <MapView.Marker coordinate={{
                            longitude: itemLocation.longitude,
                            latitude: itemLocation.latitude
                        }} />
                    </MapView>
                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                        <FormInput inputStyle={styles.inputFieldsForm} defaultValue={item.name} onChangeText={(text) => this.handleTextChange('name', text)} placeholder="Title *" />
                        <FormInput inputStyle={styles.inputFieldsForm} defaultValue={item.price} onChangeText={(text) => this.handleTextChange('price', text)} placeholder="Price *" />
                        <FormInput inputStyle={styles.inputFieldsForm} defaultValue={item.description} onChangeText={(text) => this.handleTextChange('description', text)} placeholder="Description" />
                    </View>
                </View>
            </ScrollView>
        );
    }
}
function mapStateToProps(state) {
    return {
        item: state.itemReducer.item,
        itemPosting: state.itemReducer.itemPosting,
        itemPostingSuccess: state.itemReducer.itemPostingSuccess,
        itemPostingFailed: state.itemReducer.itemPostingFailed
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setItemPropertyInReducer: (name, value) => dispatch(setItemPropertyInReducer(name, value)),
        createItem: (item, location) => dispatch(createItem(item, location)),
        setInitialState: (component) => dispatch(setInitialState(component))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemForm)

