/**
 * Created by pajicv on 9/25/18.
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import TransactionListItem from "./TransactionListItem";

const TransactionList = ({ transactions }) => {
  const items = transactions.map(transaction => {
    const { id, user, amount, currency, date, title } = transaction;
    return (
      <TransactionListItem
        key={id}
        user={user}
        amount={amount}
        currency={currency}
        title={title}
        date={date}
      />
    );
  });

  return <View style={styles.card}>{items}</View>;
};

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired
};

export default TransactionList;

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
      flex: 1
  }
});
