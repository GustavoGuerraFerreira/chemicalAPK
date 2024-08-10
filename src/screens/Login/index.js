import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Button, Alert, ActivityIndicator,  } from "react-native";
import {  logar, getCurrentUser } from "../../services/Login_api";

export function Login(props) {
  const [username, setusername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  
  function onPressButton() {
    setLoading(true);

    const userData = {
      password: password,
      username: username
    }
    logar(userData).then(() => {
      props.navigation.navigate("Menu")
    }).catch(error => {
       Alert.alert('Erro no login', 'Impossível fazer login com as credenciais fornecidas.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ])
      
     // console.error('Error during login:', error);
    });
   
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
         {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <Button
            style={styles.btn}
            title="Entrar"
            color="black"
            onPress={onPressButton}
          />
        )}
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
