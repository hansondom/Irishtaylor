import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';

export default function Signup (){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:1337/auth/local', {
        name,
        email,
        password,
      });

      console.log('User registered:', response.data);
      // Navigate to login or any other screen on successful signup
    } catch (error) {
      console.error('Signup failed:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
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
        theme={{ colors: { error: '#FF0000' } }}
      />
      {!passwordsMatch && (
        <Text style={{ color: '#FF0000' }}>Passwords do not match</Text>
      )}
      <Button mode="contained" style={styles.button} onPress={handleSignup}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
});
