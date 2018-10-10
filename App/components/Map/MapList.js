import React from 'react';
import {
    View
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
                    this.onMapLayout();
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
        this.onMapLayout();
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

    onMapLayout = () => {
        this.mapRef.fitToElements(true);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <MapView
                    style={styles.map}
                    ref={(ref) => { this.mapRef = ref }}
                    onLayout={() => this.onMapLayout}
                    mapType="hybrid"
                    initialRegion={this.state.region}
                    followUserLocation={false}
                    onRegionChange={this.onRegionChange.bind(this)}
                    showsUserLocation={false}
                    loadingEnabled={true}
                    showsMyLocationButton={true}
                    rotateEnabled={false}>
                    {this.props.items.map(item => (

                        <MapView.Marker
                            coordinate={{ longitude: this.returnCoords(item).long, latitude: this.returnCoords(item).lat }}
                            // onPress={this._onMarkerPress.bind(this, item)}
                            key={item.id}
                        />
                    ))}
                </MapView>
            </View>
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

