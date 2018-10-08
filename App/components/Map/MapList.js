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
    getItemById, getItems
} from '../../actions/ItemActions';
class MapList extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor() {
        super();
        this.state = {
            region: {
                latitude: 44.0165,
                longitude: 21.0059,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            items: []
        };

    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <MapView
                    style={styles.map}
                    mapType="hybrid"
                    initialRegion={this.state.region}
                    followUserLocation={false}
                    onRegionChange={this.onRegionChange.bind(this)}
                    showsUserLocation={false}
                    loadingEnabled={true}
                    showsMyLocationButton={false}
                    rotateEnabled={false}>

                    <MapView.Marker
                        coordinate={{ longitude: 21.0059, latitude: 44.0165 }}
                    />
                    <MapView.Marker
                        coordinate={{ longitude: 21.0062, latitude: 44.0175 }}
                    />
                    <MapView.Marker
                        coordinate={{ longitude: 21.0079, latitude: 44.0265 }}
                    />
                    <MapView.Marker
                        coordinate={{ longitude: 21.0089, latitude: 44.0185 }}
                    />
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

