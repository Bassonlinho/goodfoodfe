/**
 * Created by pajicv on 9/21/18.
 * App/components/Wallet/BalanceCard.js
 */

import React from "react";
import PropTypes from "prop-types";
import { Button, View, Text, StyleSheet } from "react-native";

const BalanceCard = ({ buttonTitle, currency, balance, onButtonPress }) => (
  <View style={styles.card}>
    <View style={styles.titleSection}>
      <Text style={styles.titleText}>
        {`${currency.toUpperCase()} BALANCE`}
      </Text>
    </View>
    <View style={styles.balanceSection}>
      <Text style={styles.balanceText}>{balance.toFixed(2)}</Text>
      <Text> </Text>
      <Text style={styles.currencyText}>{currency.toUpperCase()}</Text>
    </View>
    <View style={styles.buttonSection}>
      <Button
        title={buttonTitle}
        onPress={onButtonPress}
        color="red"
        style={styles.button}
      />
    </View>
  </View>
);

BalanceCard.propTypes = {
  currency: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func.isRequired
};

export default BalanceCard;

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
      flex: 0.5
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 5
  },
  balanceSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 5
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5
  },
  balanceText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "red"
  },
  currencyText: {
    fontSize: 20,
    fontWeight: "bold",
    bottom: 5,
    color: "red"
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black"
  },
  button: {
    padding: 20,
    fontSize: 15,
    fontFamily: "arial",
    width: 400,
    height: 40,
    textAlign: "center"
  }
});
