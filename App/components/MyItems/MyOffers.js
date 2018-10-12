import React from 'react';
import {
    View, ToastAndroid, Text, Dimensions, Image, ScrollView,
    FlatList, TouchableOpacity, ActivityIndicator
} from 'react-native';
import styles from '../../assets/css/Main'
import { connect } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
const { width, height } = Dimensions.get("window")
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
import {
    getItemById, getMyItems
} from '../../actions/ItemActions';

class MyOffers extends React.Component {
    static navigationOptions = {
        title: 'My Offers',
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
            myItems: []
        };

    }
    componentDidMount() {
        this.props.getMyItems();
    }

    applyFilter = (text) => {
        ToastAndroid.show("Soon!", ToastAndroid.SHORT);
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => {
        let src = require('../../assets/img/potato.jpg');
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
                    <Text ellipsizeMode={'tail'} numberOfLines={2} style={{ fontSize: 12 }}>{item.name}</Text>
                    <Text ellipsizeMode={'tail'} numberOfLines={2} style={{ fontSize: 12 }}>{item.description}</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>RSD {item.price} /KG</Text>
                </View>

            </View>
        )
    };

    render() {
        let content;
        if (this.props.itemsFetching) {
            content = <View style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center', marginTop: 100, padding: 15 }}>
                <ActivityIndicator size="large" color="#e24f2d" />
            </View>;
        } else if (!this.props.itemsFetching && this.props.myItems.length) {
            content = <FlatList
                data={this.props.myItems}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                contentContainerStyle={styles.myOfferContainer}
            />
        } else if (!this.props.itemsFetching && this.props.itemsFetchingFailed) {
            content = <View style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center', marginTop: 100, padding: 15 }}>
                <Text>Error please try again!</Text>
                <Button onClick={() => this.props.getMyItems()}>Try again</Button>
            </View>;
        }
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={styles.mainContainer}>
                    {content}
                </ScrollView>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        position: 'absolute',
                        height: 70,
                        backgroundColor: '#0000FF',
                        borderRadius: 100,
                        flex: 1,
                        bottom: 5,
                        right: 5,
                    }}
                    onPress={() => this.props.navigation.navigate('ItemLocation')}
                >
                    <Icon name="plus" type='material-community' size={30} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        myItems: state.itemReducer.myItems,
        itemsFetching: state.itemReducer.itemsFetching,
        itemsFetchingFailed: state.itemReducer.itemsFetchingFailed
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getItemById: (id) => dispatch(getItemById(id)),
        getMyItems: () => dispatch(getMyItems()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyOffers)

