/**
 * Created by pajicv on 9/25/18.
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const TransactionListItem = ({currency, amount, user, title, date}) => {

    const color = (amount < 0) ?  'red' : 'green';

    return (
        <View style={styles.card}>
            <View style={styles.leftContainer}>
                <View style={styles.leftTopText}>
                    <Text style={{fontWeight: 'bold', color: 'black'}}>{title}</Text>
                </View>
                <View style={styles.leftBottomText}>
                    <Text>{user}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <View style={styles.rightTopText}>
                    <Text style={{fontWeight: 'bold', color}}>{`${amount} ${currency}`}</Text>
                </View>
                <View style={styles.rightBottomText}>
                    <Text >{date}</Text>
                </View>
            </View>
        </View>
    )
};

TransactionListItem.propTypes = {
    currency: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
};

export default TransactionListItem;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignContent: 'stretch',
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    leftContainer: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'stretch',
        flex: 1
    },
    rightContainer: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'stretch',
        flex: 1
    },
    leftTopText: {
        alignItems: 'flex-start'
    },
    leftBottomText: {
        alignItems: 'flex-start'
    },
    rightTopText: {
        alignItems: 'flex-end'
    },
    rightBottomText: {
        alignItems: 'flex-end'
    }
});
