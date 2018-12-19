import React, { Component } from "react";

// NativeBase Components
import {
  Text,
  Button,
  Body,
  List,
  ListItem,
  Form,
  Label,
  Input,
  Item,
  Content,
  Header
} from "native-base";
import authStore from "../../store/authStore";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  changeHandler() {
    // console.log(this.state);
    authStore.loginUser(this.state, this.props.navigation);
  }

  signUp() {
    //  console.log(this.state);
    authStore.signup(this.state, this.props.navigation);
  }

  static navigationOptions = {
    title: "Login"
  };
  render() {
    return (
      <Content>
        <Header transparent />
        <List>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <Body>
              <Form>
                <Body>
                  <Label style={{ color: "white" }}>Username</Label>
                </Body>
                <Item
                  rounded
                  style={{
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={text => this.setState({ username: text })}
                  />
                </Item>
                <Body>
                  <Label style={{ color: "white" }}>Password</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={text => this.setState({ password: text })}
                  />
                </Item>
              </Form>
            </Body>
          </ListItem>
          <Button full success onPress={() => this.changeHandler()}>
            <Text>Login</Text>
          </Button>
          <Button full warning onPress={() => this.signUp()}>
            <Text>Register</Text>
          </Button>
        </List>
        <Body>
          <Label style={{ color: "red", opacity: 0.6 }} />
        </Body>
      </Content>
    );
  }
}

export default Login;
