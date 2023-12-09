import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Appbar, Card, Title, Paragraph } from 'react-native-paper';

export default function HomePage () {
  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title>Welcome to My App</Title>
            <Paragraph>This is the home page using React Native Paper!</Paragraph>
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

 