import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ActiveWorkoutScreen() {
    const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Séance en cours...</Text>      
      <Text> Temps : 00:00:00</Text> {/* TODO: Remplacer par un timer réel */}
      <Button title="Terminer la séance" onPress={() => router.back()} />
    </View>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f59a'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
});