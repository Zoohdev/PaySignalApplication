import { View, Text, StyleSheet } from 'react-native'; // Corrected here
import React from 'react';
import { Link } from 'expo-router';

const List = () => {
  return (
    <View style={styles.container}>
      <Text>Hey there list</Text>
      <Link href="./home">Setting</Link>
    </View>
  );
};

const styles = StyleSheet.create({ // Corrected here
  container: {
    backgroundColor: 'white',
    flex: 1, // Added to make sure the View takes up space
    justifyContent: 'center', // Centers the text vertically
    alignItems: 'center', // Centers the text horizontally
  },
});

export default List;
