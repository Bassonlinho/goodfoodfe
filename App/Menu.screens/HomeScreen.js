import React from 'react';
import {
    View, ToastAndroid, Text, Dimensions, Image, ScrollView,
    FlatList, TouchableOpacity
} from 'react-native';
import styles from '../assets/css/Main'
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { Header, SearchBar, Icon } from 'react-native-elements';
import drawerStyles from '../assets/css/Main';
import Menu from './Menu';
const { width } = Dimensions.get("window")
const SCREEN_WIDTH = width
import TabNavigator from 'react-native-tab-navigator';
import {
    getItemById, getItems
} from '../actions/ItemActions';
import MapList from '../components/Map/MapList';

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor() {
        super();
        this.state = {
            selectedTab: 'list',
            items: []
        };

    }
    componentDidMount() {
        this.props.getItems();
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

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => {
        let src = require('../assets/img/potato.jpg');
        if (item.signedURL) {
            console.log('ffffffff ', item.signedURL);
            src = { uri: item.signedURL };
        }
        return (
            <View key={item.id} style={{ width: SCREEN_WIDTH / 2 - 8, justifyContent: 'center', alignItems: 'center', paddingLeft: Math.floor((SCREEN_WIDTH % 2) / 2), borderColor: '#d4d4d4', borderWidth: 1, borderRadius: 5 }}>
                <View style={styles.redSquareMP}>
                    <Image source={src}
                        style={{
                            height: 120,
                            width: 150,
                            borderWidth: 1,
                            borderRadius: 5,
                        }} />
                </View>
                <View style={styles.columnMP}>
                    <Text ellipsizeMode={'tail'} style={{ fontSize: 12 }}>{item.name}</Text>
                    <Text ellipsizeMode={'tail'} style={{ fontSize: 12 }}>{item.description}</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>RSD {item.price} /KG</Text>
                </View>

            </View>
        )
    };

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
                            <FlatList
                                data={this.props.items}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderItem}
                                contentContainerStyle={styles.contentContainer}
                            />
                        </ScrollView>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'map'}
                        title="Items on map"
                        selectedTitleStyle={{ color: '#fff' }}
                        titleStyle={{ color: '#fff', fontSize: 16 }}
                        tabStyle={{ borderBottomWidth: this.state.selectedTab === 'map' ? 1 : 0, borderBottomColor: this.state.selectedTab === 'map' ? "white" : '#de4b39' }}
                        onPress={() => this.setState({ selectedTab: 'map' })}>
                        <MapList navigation={this.props.navigation} />
                    </TabNavigator.Item>
                </TabNavigator>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        height: 70,
                        backgroundColor: '#0000FF',
                        borderRadius: 100,
                    }}
                    onPress={() => this.props.navigation.navigate('ItemLocation')}
                >
                    <Icon name="plus" type='material-community' size={30} color="white" />
                </TouchableOpacity>
            </Drawer >
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
)(HomeScreen)

