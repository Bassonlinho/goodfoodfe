import React from 'react';
import {
    View, ToastAndroid, Text, Dimensions, Image, ScrollView
} from 'react-native';
import styles from '../assets/css/Main'
import { compose, setStatic, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { withFirebase, isEmpty, isLoaded } from 'react-redux-firebase'
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager } from 'react-native-fbsdk'
import Drawer from 'react-native-drawer';
import { Header, SearchBar, Icon, Tile } from 'react-native-elements';
import drawerStyles from '../assets/css/Main';
import Menu from './Menu';
const { width, height } = Dimensions.get("window")
import MapView from 'react-native-maps';
const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height
const ASPECT_RATIO = width / height;
const LONGITUDE_DELTA = 0.0022
const LATITUDE_DELTA = 0.0022
import TabNavigator from 'react-native-tab-navigator';
class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 'list',
            region: {
                latitude: 44.0165,
                longitude: 21.0059,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
        };

    }

    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };

    applyFilter = (text) => {
        ToastAndroid.show("Soon!", ToastAndroid.SHORT);
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<Menu navigation={this.props.navigation}
                />}
                tapToClose={true}
                openDrawerOffset={0.35} // 35% gap on the right side of drawer
                //panCloseMask={0.2} 
                closedDrawerOffset={-3}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })} >
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.openControlPanel(), }}
                    centerComponent={
                        <View style={styles.searchHeader}>
                            <SearchBar
                                lightTheme
                                showLoading
                                icon={{ type: 'font-awesome', name: 'search', color: 'white', size: 24 }}
                                containerStyle={styles.searchBarEl}
                                inputStyle={{ backgroundColor: '#e24f2d' }}
                                onChange={(event) => this.applyFilter(event.nativeEvent.text)}
                            />
                        </View>}
                    rightComponent={<Icon
                        name='filter-variant'
                        type='material-community'
                        color='white'
                    />}
                    outerContainerStyles={{
                        backgroundColor: '#de4b39',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 57,
                    }}
                />
                <TabNavigator tabBarStyle={styles.tabBar}
                    style={{ marginBottom: -50 }}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'list'}
                        tabStyle={{ borderBottomWidth: this.state.selectedTab === 'list' ? 1 : 0, borderBottomColor: this.state.selectedTab === 'list' ? "white" : '#de4b39' }}
                        title="List of items"
                        selectedTitleStyle={{ color: '#fff' }}
                        titleStyle={{ color: '#fff', fontSize: 16 }}
                        onPress={() => this.setState({ selectedTab: 'list' })}>
                        <ScrollView style={styles.mainContainer}>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 25 }}>
                                <View style={{ width: SCREEN_WIDTH / 2 - 8, justifyContent: 'center', alignItems: 'center', paddingLeft: Math.floor((SCREEN_WIDTH % 2) / 2), borderColor: '#d4d4d4', borderWidth: 1, borderRadius: 5 }}>
                                    <View style={styles.redSquareMP}>
                                        <Image source={require('../assets/img/potato.jpg')}
                                            style={{
                                                height: 120,
                                                width: 150,
                                                borderWidth: 1,
                                                borderRadius: 5,
                                            }} />
                                    </View>
                                    <View style={styles.columnMP}>

                                        <Text ellipsizeMode={'tail'} style={{ fontSize: 12 }}>Potato</Text>
                                        <Text ellipsizeMode={'tail'} style={{ fontSize: 12 }}>Delicious</Text>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>RSD 50 /KG</Text>
                                    </View>

                                </View>
                                <View style={{ marginLeft: 5, width: SCREEN_WIDTH / 2 - 8, justifyContent: 'center', alignItems: 'center', paddingLeft: Math.floor((SCREEN_WIDTH % 2) / 2), borderColor: '#d4d4d4', borderWidth: 1, borderRadius: 5 }}>
                                    <View style={styles.redSquareMP}>
                                        <Image source={require('../assets/img/carrots.jpg')}
                                            style={{
                                                height: 120,
                                                width: 150,
                                                borderWidth: 1,
                                                borderRadius: 5,
                                            }} />
                                    </View>
                                    <View style={styles.columnMP}>

                                        <Text ellipsizeMode={'tail'} style={{ fontSize: 12 }}>Carrots</Text>
                                        <Text ellipsizeMode={'tail'} style={{ fontSize: 12 }}>Sweet</Text>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>RSD 30 /KG</Text>

                                    </View>

                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <View style={{ marginTop: 10, width: SCREEN_WIDTH / 2 - 8, justifyContent: 'center', alignItems: 'center', paddingLeft: Math.floor((SCREEN_WIDTH % 2) / 2), borderColor: '#d4d4d4', borderWidth: 1, borderRadius: 5 }}>
                                    <View style={styles.redSquareMP}>
                                        <Image source={require('../assets/img/raspberries.jpg')}
                                            style={{
                                                height: 120,
                                                width: 150,
                                                borderWidth: 1,
                                                borderRadius: 5,
                                            }} />
                                    </View>
                                    <View style={styles.columnMP}>
                                        <Text ellipsizeMode={'tail'} style={{ fontSize: 12 }}>Raspberries</Text>
                                        <Text ellipsizeMode={'tail'} style={{ fontSize: 12 }}>Lorem ipsum</Text>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>RSD 120 /KG</Text>

                                    </View>

                                </View>
                                <View style={{ marginTop: 10, marginLeft: 5, width: SCREEN_WIDTH / 2 - 8, justifyContent: 'center', alignItems: 'center', paddingLeft: Math.floor((SCREEN_WIDTH % 2) / 2), borderColor: '#d4d4d4', borderWidth: 1, borderRadius: 5 }}>
                                    <View style={styles.redSquareMP}>
                                        <Image source={require('../assets/img/kupus.jpg')}
                                            style={{
                                                height: 120,
                                                width: 150,
                                                borderWidth: 1,
                                                borderRadius: 5,
                                            }} />
                                    </View>
                                    <View style={styles.columnMP}>

                                        <Text ellipsizeMode={'tail'} style={{ fontSize: 12 }}>Cabbage</Text>
                                        <Text ellipsizeMode={'tail'} style={{ fontSize: 12 }}>Lorem ipsum</Text>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>RSD 100 /KG</Text>

                                    </View>

                                </View>
                            </View>
                        </ScrollView>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'map'}
                        title="Items on map"
                        selectedTitleStyle={{ color: '#fff' }}
                        titleStyle={{ color: '#fff', fontSize: 16 }}
                        tabStyle={{ borderBottomWidth: this.state.selectedTab === 'map' ? 1 : 0, borderBottomColor: this.state.selectedTab === 'map' ? "white" : '#de4b39' }}
                        onPress={() => this.setState({ selectedTab: 'map' })}>
                        <View style={styles.mainContainer}>
                            <MapView
                                style={styles.map2}
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
                    </TabNavigator.Item>
                </TabNavigator>
            </Drawer >
        );
    }
}

export default compose(
    setStatic(
        'navigationOptions',
        {
            header: null
        }
    ),
    connect((state) => {
        return {
            auth: state.firebase.auth,
            profile: state.firebase.profile
        }
    })
)(HomeScreen)

