/**
 * Created by pajicv on 9/21/18.
 * App/Menu.screens/WalletScreen.js
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import BalanceCard from "../components/Wallet/BalanceCard";
import TransactionList from "../components/Wallet/TransactionList";

class WalletScreen extends React.Component {

  state = {
    transactions: [{
      id: 1,
        amount: -120.00,
        title: 'Potato',
        currency: '$',
        user: 'Petar Petrovic',
        date: '21.09.2018.'
    },{
        id: 1,
        amount: 20000.00,
        title: 'Subsidies',
        currency: '$',
        user: 'Ministry of Agriculture',
        date: '11.09.2018.'
    },{
        id: 1,
        amount: -15000.00,
        title: 'Fertilizer',
        currency: '$',
        user: 'AgriTrade d.o.o.',
        date: '01.09.2018.'
    }]
  };

  handleUSDButtonPress = () => {
    console.log("handleUSDButtonPress");
  };

  handleGFCButtonPress = () => {
    console.log("handleUSDButtonPress");
  };

  render() {
    return (
      <View style={styles.walletContainer}>
        <BalanceCard
          currency="USD"
          balance={150.0}
          buttonTitle="Send"
          onButtonPress={this.handleUSDButtonPress}
        />
        <BalanceCard
          currency="GFC"
          balance={13.26}
          buttonTitle="Convert"
          onButtonPress={this.handleGFCButtonPress}
        />
        <TransactionList transactions={this.state.transactions}/>
      </View>
    );
  }
}

export default WalletScreen;

const styles = StyleSheet.create({
  walletContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignContent: 'space-between'
  }
});
