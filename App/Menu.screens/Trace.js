import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from 'react-native-elements'

class Trace extends React.Component {
    static navigationOptions = {
        title: 'Trace',
        headerStyle: {
            backgroundColor: '#e24f2d',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={{ alignSelf: 'flex-start' }}>Trace History</Text>
                    <Text style={{ alignSelf: 'flex-end' }}>View All</Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.titleSection}>
                        <Text style={styles.titleText}>
                            Potato
                        </Text>
                        <Text style={styles.titleText}>
                            Pera Peric Company
                            </Text>
                        <Text >
                            Svetozara Markovica 74,Futog, Srbija
                            </Text>
                        <Text >
                            9.20.2018
                            </Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.titleSection}>
                        <Text style={styles.titleText}>
                            Carrots
                        </Text>
                        <Text style={styles.titleText}>
                            Sima Simic D.O.O
                            </Text>
                        <Text >
                            Cara Lazara 48,Indjija, Srbija
                            </Text>
                        <Text >
                            9.19.2018
                            </Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.titleSection}>
                        <Text style={styles.titleText}>
                            Cabbage
                        </Text>
                        <Text style={styles.titleText}>
                            Pera Peric Company
                            </Text>
                        <Text >
                            Svetozara Markovica 74,Futog, Srbija
                            </Text>
                        <Text >
                            9.20.2018
                            </Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Button
                        large
                        buttonStyle={styles.buttonLogin}
                        textStyle={styles.buttonText}
                        title='SCAN' />
                    <Button
                        large
                        buttonStyle={styles.buttonLogin}
                        textStyle={styles.buttonText}
                        title='ENTER CODE' />
                </View>
            </View>
        );
    }
}

export default Trace;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "flex-start"
    },
    card: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        backgroundColor: "#ffffff",
        padding: 5,
        margin: 10,
        borderRadius: 3,
        width: "90%",
        elevation: 3
    },
    titleText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "black",
        alignSelf: 'flex-start'
    },
    titleSection: {
        flexDirection: "column",
        padding: 5
    },
    buttonLogin: {
        backgroundColor: '#e24f2d',
        borderRadius: 5,
        width: 150,
        height: 40,
        paddingTop: 20,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
});
