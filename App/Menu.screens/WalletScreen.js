/**
 * Created by pajicv on 9/21/18.
 * App/Menu.screens/WalletScreen.js
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import BalanceCard from "../components/Wallet/BalanceCard";

class WalletScreen extends React.Component {
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
    justifyContent: "flex-start"
  }
});
