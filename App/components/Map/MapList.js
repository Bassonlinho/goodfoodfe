import React from 'react';
import {
    View, Text, Image, TouchableOpacity, Alert
} from 'react-native';
import styles from '../../assets/css/Main'
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
const LONGITUDE_DELTA = 0.0022
const LATITUDE_DELTA = 0.0022
import {
    getItems
} from '../../actions/ItemActions';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

class MapList extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor() {
        super();
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            popupVisible: false,
            selectedItem: {}
        };

    }

    componentWillMount() {
        this.props.getItems();
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

    onRegionChange(region) {
        this.setState({ region });
    }

    returnCoords(item) {
        let pozicija_parse = item.location;
        pozicija_parse = pozicija_parse.replace("POINT", '');
        pozicija_parse = pozicija_parse.replace("(", "");
        pozicija_parse = pozicija_parse.replace(")", "");
        let koordinate = pozicija_parse.split(' ');
        let longitude = parseFloat(koordinate[0]);
        let latitude = parseFloat(koordinate[1]);
        let myCoords = { "lat": latitude, "long": longitude };
        return myCoords;
    }

    _onMarkerPress = (item) => {
        this.setState({
            popupVisible: !this.state.popupVisible,
            selectedItem: item,
        })
    }

    onMapPress = () => {
        this.setState({
            popupVisible: false,
            selectedItem: null
        })
    }

    render() {
        let src = require('../../assets/img/potato.jpg');
        if (this.state.selectedItem && this.state.selectedItem.signedURL) {
            src = { uri: this.state.selectedItem.signedURL };
        }
        return (
            <View style={styles.mainContainer}>
                <MapView
                    style={styles.mapList}
                    ref={(ref) => { this.mapRef = ref }}
                    onMapReady={() => this.mapRef.fitToElements(true)}
                    mapType="hybrid"
                    onPress={() => this.onMapPress()}
                    initialRegion={this.state.region}
                    onPoiClick={e => Alert.alert(
                        'Name' + ': ' + e.nativeEvent.name + '\n',
                        'Coordinates' + ': ' + e.nativeEvent.coordinate.latitude + ',' + '\n' + e.nativeEvent.coordinate.longitude + '\n'
                    )}
                    followUserLocation={false}
                    onRegionChange={this.onRegionChange.bind(this)}
                    showsUserLocation={false}
                    loadingEnabled={true}
                    showsMyLocationButton={true}
                    rotateEnabled={false}>
                    {this.props.items.map(item => (

                        <MapView.Marker
                            coordinate={{ longitude: this.returnCoords(item).long, latitude: this.returnCoords(item).lat }}
                            onPress={() => this._onMarkerPress(item)}
                            key={item.id}
                        />
                    ))}
                </MapView>
                {
                    this.state.popupVisible &&
                    <View style={styles.modal}>
                        <Image source={src}
                            style={{
                                height: 140,
                                width: 150,
                                borderWidth: 1,
                                borderRadius: 5,
                                margin: 10
                            }} />
                        <View style={{ flexDirection: 'column', marginRight: 5, width: 180, height: 170, marginTop: 5 }}>
                            <Text ellipsizeMode='tail' numberOfLines={2} style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.selectedItem.name}</Text>
                            <Text ellipsizeMode='tail' numberOfLines={4} style={{ fontSize: 15 }}>{this.state.selectedItem.description}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{this.state.selectedItem.price}</Text>
                            <TouchableOpacity
                                style={{
                                    width: 100,
                                    marginTop: 4,
                                    backgroundColor: 'black',
                                }}>
                                <Text style={{ color: 'white' }}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View >
        );
    }
}
function mapStateToProps(state) {
    return {
        items: state.itemReducer.items,
        itemsFetching: state.itemReducer.itemsFetching
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getItemById: (id) => dispatch(getItemById(id)),
        getItems: () => dispatch(getItems()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapList)

