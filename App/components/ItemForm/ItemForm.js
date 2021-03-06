import React from 'react';
import {
    View, TouchableOpacity, ScrollView, ToastAndroid, ActivityIndicator,
    Image, Dimensions
} from 'react-native';
import styles from '../../assets/css/Main'
import { connect } from 'react-redux';
import { Icon as ElementIcon, FormInput, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setItemPropertyInReducer, createItem, setInitialState, setItemDoc } from '../../actions/ItemActions';
import MapView from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';
const { width } = Dimensions.get("window");
const SCREEN_WIDTH = width;
class ItemForm extends React.Component {
    constructor() {
        super();
        this.state = {
        };

        this.submitForm = this.submitForm.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
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
                onPress={params.handleSave && params.handleSave()}>
                <ElementIcon name="check" type='material-community' size={30} color="white" />
            </TouchableOpacity>)
        }

    };

    componentDidMount() {
        let itemLocation = this.props.navigation.getParam('itemLocation');
        this.props.navigation.setParams({ handleSave: () => this.submitForm });
        let pozicija = 'POINT(' + itemLocation.longitude + ' ' + itemLocation.latitude + ')';
        this.props.setItemPropertyInReducer('location', pozicija)
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
        if (this.props.item.name &&
            this.props.item.description &&
            this.props.item.location) {
            this.props.createItem(this.props.item);
        }
        else {
            ToastAndroid.show('Please enter required fields!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
    }

    showPicker() {
        var options = {
            title: 'Select picture',
            mediaType: 'mixed',
            noData: true,
            storageOptions: {
                skipBackup: true,
                waitUntilSaved: true
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source = {
                    path: response.path,
                    uri: response.uri,
                    fileName: response.fileName
                };
                let item = Object.assign({}, this.state.item);
                item.documents = source;
                this.setState({ item })
                this.props.setItemDoc(item.documents);
            }
        });
    }



    render() {
        let itemLocation = this.props.navigation.getParam('itemLocation');
        const { item } = this.props;
        let content;
        if (this.props.itemPosting) {
            content = <View style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center', marginTop: 100, padding: 15 }}>
                <ActivityIndicator size="large" color="#e24f2d" />
            </View>
        } else {
            content =
                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <FormInput inputStyle={styles.inputFieldsForm} defaultValue={item.name} onChangeText={(text) => this.handleTextChange('name', text)} placeholder="Title *" />
                    <FormInput inputStyle={styles.inputFieldsForm} defaultValue={item.price} onChangeText={(text) => this.handleTextChange('price', text)} placeholder="Price *" />
                    <FormInput inputStyle={styles.inputFieldsForm} defaultValue={item.description} onChangeText={(text) => this.handleTextChange('description', text)} placeholder="Description" />
                    {this.props.item.documents.uri && <Image
                        style={{
                            height: SCREEN_WIDTH / 2,
                            marginBottom: 5,
                            borderRadius: 10,
                        }}
                        source={{ uri: this.props.item.documents.uri }}
                    />
                    }
                    <View accessibilityLabel='fnforms003' >
                        <Button
                            icon={
                                <Icon
                                    name='arrow-right'
                                    size={15}
                                    color='red'
                                />
                            }
                            title={this.props.item.documents.uri ? 'Edit picture' : 'Get picture'}
                            onPress={this.showPicker.bind(this)}
                        />
                    </View>
                </View>
        }
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
                    {content}
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
        setItemDoc: (doc) => dispatch(setItemDoc(doc)),
        setItemPropertyInReducer: (name, value) => dispatch(setItemPropertyInReducer(name, value)),
        createItem: (item) => dispatch(createItem(item)),
        setInitialState: (component) => dispatch(setInitialState(component))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemForm)

