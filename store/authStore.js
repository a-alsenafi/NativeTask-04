import { decorate, observable } from "mobx";
import axios from "axios";

import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";

class AuthStore {
  constructor() {
    this.user = null;
    this.isAuthenticated = false;
    this.checkForToken();
  }

  loginUser(userData, navigation) {
    axios
      .post(" http://coffee.q8fawazo.me/api/login/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        this.setAuthToken(user.token);
        this.setCurrentUser(decodedUser);
        this.isAuthenticated = true;
        navigation.replace("CoffeeList");
      })
      .catch(err => console.error(err.response));
  }

  signup(userData, navigation) {
    console.log(userData);
    axios
      .post("http://coffee.q8fawazo.me/api/register/", userData)
      .then(res => res.data)
      .then(user => {
        console.log("second console loge:", user);
        this.loginUser(userData, navigation);
      })
      .catch(err => console.error(err.response));
  }

  setCurrentUser(user) {
    this.user = user;
  }

  setAuthToken(token) {
    if (token) {
      AsyncStorage.setItem("loginToken", token);
      axios.defaults.headers.common.Authorization = `jwt ${token}`;
    } else {
      AsyncStorage.removeItem("loginToken");
      delete axios.defaults.headers.common.Authorization;
    }
  }

  checkForToken() {
    AsyncStorage.getItem("loginToken").then(token => {
      if (token) {
        const decodedUser = jwt_decode(token);
        this.setCurrentUser(decodedUser);
        this.setAuthToken(token);
      }
    });
  }
  logoutUser() {
    this.user = null;
    this.isAuthenticated = false;
    this.setAuthToken();
  }
}

decorate(AuthStore, {
  user: observable
});

export default new AuthStore();
