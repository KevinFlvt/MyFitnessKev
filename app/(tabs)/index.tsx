import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

/**
 * Ecran d'accueil de l'application
 */
export default function WorkoutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prêt pour notre prochaine séance ? ^^</Text>
      <Button title="Commencer la séance" onPress={() => router.push("/workout/active")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  }
});
