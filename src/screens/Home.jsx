import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { AsyncStorage } from "react-native";

export default function HomePage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function fetchUsername() {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    }

    fetchUsername(); 
  }, []); 

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title>Welcome to My App</Title>
            <Paragraph>{username ? `Welcome, ${username}` : 'Loading...'}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
