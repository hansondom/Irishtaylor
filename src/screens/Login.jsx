import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { AsyncStorage } from "react-native";
import axios from "axios";
    
export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      const response = await axios.post(`http://192.168.137.1:1337/api/auth/local`, {
        identifier: username,
        password: password,
      });
  
      if (response.status === 200) {
        await AsyncStorage.setItem("token", response.data.jwt);
        await AsyncStorage.setItem("id", JSON.stringify(response.data.user.id));
  
        // Store username in AsyncStorage
        await AsyncStorage.setItem("username", username);
  
        navigation.push("Home");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  }
  function handleSignupNavigation() {
    navigation.navigate('Signup');
  }
  
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        dense={true}
        label='Username'
        onChangeText={(text) => setUsername(text)}
        value={username}
        style={{ marginVertical: 8, width: "80%", height: 40}}
      />
      <TextInput
        mode="outlined"
        dense={true}
        label='Password'
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        style={{ marginVertical: 10, width: "80%", height: 40}}
      />
      <Button style={{margin: 10}} icon="login" mode="contained" onPress={handleSubmit}>
        LOGIN
      </Button>
      <Button style={{margin: 10}} icon="login" mode="contained" onPress={handleSignupNavigation}>
        Signup
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    resizeMode: 'cover',
    backgroundColor: 'rgba(285, 235, 255, 0.4)',
  },
});
