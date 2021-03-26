import React, { Component }  from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { Background, Logo, User1, Vector1, Vector2, Key, Visibility } from "../../assets";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";



export default class LoginScreen extends Component {
  // state = {
  //   email: "",
  //   password: "",
  //   newId : 0, 
  // };
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      newId : 0,
      secureTextEntry: true
    }
  }
  onIconPress = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    })
  }


 
  login() {
  //   const{email, password} = this.state
  // if(email == ""){
  //   alert("Masukan Email Anda")
  //   return false
  // }
  // else if (password == "") {
  //   alert("Password Anda Salah")
  //   return false
  // }
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "http://10.10.0.38:8083/v1/auth",
        {
          email: this.state.email,
          password: this.state.password,
        },
        config
        )
      

      .then((response) => {
        console.log("response login");
        console.log(JSON.stringify(response));
        let id = response.data.data.user.id
        console.log("id", id)
        const token = response.data.data.token;
        console.log("idtoken", id);
        console.log(token);
        this.setState({ email: "", password: "" });
        AsyncStorage.setItem("id", id);
        AsyncStorage.setItem("token", token);
        console.log("tokenlogin", token);
        this.props.navigation.navigate("MainApp");
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        const errorMessage = JSON.stringify(error.data.errors.email);
        console.log(errorMessage);
      });
  }
  render() {
    return (
      <ImageBackground source={Background} style={styles.container}>
        <View style={styles.header}>
          <Image source={Vector1} style={styles.vector1} />
          <Image source={Vector2} style={styles.vector2} />
        </View>
        <View style={styles.logo}>
          <Image source={Logo} style={styles.logoImage} />
        </View>
        <View style={styles.login}>
          <Image source={User1} style={styles.user} />
          <TextInput
            style={styles.inputTitle}
            placeholder="Email"
            placeholderTextColor="#000000"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          ></TextInput>
        </View>
        <View style={styles.password}>
          <Image source={Key} style={styles.user} />
          <TextInput
            style={styles.inputTitle}
            placeholder="Password"
            placeholderTextColor="#000000"
            secureTextEntry={this.state.secureTextEntry}
            autoCapitalize="none"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          ></TextInput>
          <View>
            <TouchableOpacity onPress={this.onIconPress}>
            <Image source={Visibility} style={styles.user} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => this.login()}>
          <Text style={styles.textLogin}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={{ color: "#414959", fontSize: 13, marginTop: 15 }}>
            <Text
              style={{
                fontWeight: "500",
                color: "#768F9C",
                fontStyle: "italic",
                fontSize: 12,
              }}
            >
              Forgot Password?
            </Text>
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
  },
  
  vector1: {
    marginLeft: 40,
    width: 400,
    height: 200,
  },
  vector2: {
    position: "absolute",
    height: 220,
  },
  logo: {
    height: 60,
    marginTop: 5,
  },
  logoImage: {
    alignSelf: "center",
    width: 80,
    height: 70,
  },
  login: {
    marginTop: 40,
    width: 300,
    height: 40,
    borderRadius: 15,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#FCFCFC",
  },
  user: {
    alignSelf: "flex-start",
    marginTop: 8,
    marginLeft: 14,
    marginRight: 12,
  },
  inputTitle: {
    fontSize: 12,
    flex : 1
  },
  password: {
    marginTop: 20,
    width: 300,
    height: 40,
    borderRadius: 15,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#FCFCFC",
  },
  button: {
    width: 300,
    height: 40,
    alignItems: "center",
    backgroundColor: "#6FCF97",
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 50,
  },
  textLogin: {
    fontSize: 12,
    color: "#FFF",
  },
});
