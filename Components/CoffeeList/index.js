import React, { Component } from "react";
import { observer } from "mobx-react";

// NativeBase Components
import { List, Content, Footer, Text, Button } from "native-base";

// Store
import CoffeeStore from "../../store/coffeeStore";
import authStore from "../../store/authStore";

// Component
import CoffeeItem from "./CoffeeItem";
import Quantity from "../Quantity";

class CoffeeList extends Component {
  inOrOut() {
    if (authStore.isAuthenticated) {
      authStore.logoutUser();
    } else {
      this.props.navigation.navigate("Login");
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: "Coffee List",
    headerLeft: null,
    headerRight: <Quantity />
  });
  render() {
    let logInOrOut;
    if (authStore.isAuthenticated) {
      logInOrOut = "Logout";
    } else {
      logInOrOut = "Login";
    }

    const coffeeshops = CoffeeStore.coffeeshops;
    let ListItems;
    if (coffeeshops) {
      ListItems = coffeeshops.map(coffeeShop => (
        <CoffeeItem coffeeShop={coffeeShop} key={coffeeShop.id} />
      ));
    }
    return (
      <Content>
        <List>{ListItems}</List>
        <Footer>
          <Button onPress={() => this.inOrOut()}>
            <Text>{logInOrOut}</Text>
          </Button>
        </Footer>
      </Content>
    );
  }
}

export default observer(CoffeeList);
