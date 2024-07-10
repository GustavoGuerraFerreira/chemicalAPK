import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Button, Alert, Pressable } from "react-native";
import PropTypes from "prop-types";
import {  logar, getCurrentUser } from "../../services/Login_api";

export function Login(props) {
  const [username, setusername] = useState("")
  const [password, setPassword] = useState("")
  
  function onPressButton() {
    const userData = {
      username: username,
      password: password
    }
    logar(userData).then(() => {
      getCurrentUser
    })
    props.navigation.navigate("Menu")
   
  }


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/img/theme.png')}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Usuário:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setusername}
          value={username}
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button
          style={styles.btn}
          title="Entrar"
          color='black'
          onPress={onPressButton} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  formContainer: {
    padding: "5px",
    width: "90%"
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: 40,
    padding: 5,
    marginBottom: 10,
    borderRadius: 4,
  },
  btn: {
    width: '10%',
    borderRadius: 15
  }
});

export default Login;
