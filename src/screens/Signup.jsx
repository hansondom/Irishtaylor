import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    console.log(username, email, password);
    try {
      const response = await axios.post(
        "http://192.168.68.104:1337/api/auth/local/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            Connection: "keep-alive",
          },
        }
      );

      console.log("User registered:", response.data);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Name"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
        style={styles.input}
        theme={{ colors: { error: "#FF0000" } }}
      />
      {!passwordsMatch && (
        <Text style={{ color: "#FF0000" }}>Passwords do not match</Text>
      )}
      <Button mode="contained" style={styles.button} onPress={handleSignup}>
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    marginTop: 10,
  },
});
