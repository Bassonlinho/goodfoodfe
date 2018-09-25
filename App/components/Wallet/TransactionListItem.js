/**
 * Created by pajicv on 9/25/18.
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const TransactionListItem = ({currency, amount, user, title, date}) => {
    <View style={styles.card}>
        <View style={styles.leftContainer}>
            <Text>A</Text>
            <Text>B</Text>
        </View>
        <View style={styles.rightContainer}>
            <Text>C</Text>
            <Text>D</Text>
        </View>
    </View>
};

TransactionListItem.propTypes = {
    currency: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.date.isRequired
};

export default TransactionListItem;

const styles = StyleSheet.create({
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
        elevation: 3,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignContent: 'stretch'
    },
    leftContainer: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'stretch',
        width: '100%'
    },
    rightContainer: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'stretch',
        width: '100%'
    },
    leftTopText: {
        fontWeight: "bold",
        color: "black"
    },
    leftBottomText: {

    },
    rightTopText: {
        justifyContent: 'flex-end',
        fontWeight: "bold",
        color: "black"
    },
    rightBottomText: {
        justifyContent: 'flex-end'
    }
});
