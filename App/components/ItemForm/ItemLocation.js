import React from 'react';
import {
    View, TouchableHighlight, Text
} from 'react-native';
import styles from '../../assets/css/Main'
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
const LONGITUDE_DELTA = 0.0022
const LATITUDE_DELTA = 0.0022
class ItemLocation extends React.Component {
    static navigationOptions = {
        title: 'Location',
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
    constructor() {
        super();
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            marginBottom: 1
        };

    }

    componentDidMount() {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: '<h2>' + 'Use Location ?' + '</h2>' + 'This app wants to change your device settings' + ':<br/><br/>' + 'Use GPS, Wi-Fi, and cell network for location' + '<br/><br/>',
            ok: 'Ok',
            cancel: 'Cancel',
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            preventOutSideTouch: true, //true => To prevent the location services window from closing when it is clicked outside
            preventBackClick: true //true => To prevent the location services popup from closing when it is clicked back button
        }).then(function (success) {
            if (success.enabled == true) {
                navigator.geolocation.getCurrentPosition((position) => {
                    let lat = parseFloat(position.coords.latitude);
                    let long = parseFloat(position.coords.longitude);

                    let initialRegion = {
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    };
                    this.setState({
                        region: initialRegion,
                    });
                },
                    (error) => {
                        this.props.navigation.pop();
                    },
                    { enableHighAccuracy: false, timeout: 20000 }
                )
            }
        }.bind(this)
        ).catch((error) => {
            this.props.navigation.pop();
        });
    }

    goToForm = () => {
        const { region } = this.state;
        let itemLocation = { "latitude": region.latitude, "longitude": region.longitude };
        this.props.navigation.navigate('ItemForm', {
            itemLocation: itemLocation
        });
    }


    onRegionChange = (region) => {
        this.setState({ region });
    }

    _onMapReady = () => this.setState({ marginBottom: 0 })

    render() {
        return (
            <View style={styles.mainContainer}>
                <MapView
                    style={[styles.map, { marginBottom: this.state.marginBottom }]}
                    mapType="hybrid"
                    initialRegion={this.state.region}
                    followUserLocation={false}
                    onRegionChange={this.onRegionChange}
                    showsUserLocation={true}
                    onMapReady={this._onMapReady}
                    loadingEnabled={true}
                    showsMyLocationButton={true}
                    rotateEnabled={false}>
                    <MapView.Marker coordinate={{
                        longitude: this.state.region.longitude,
                        latitude: this.state.region.latitude
                    }} />
                </MapView>
                <TouchableHighlight
                    onPress={this.goToForm}
                    style={styles.button}>
                    <Text style={styles.buttonTextLocation}>
                        Confirm
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemLocation)

