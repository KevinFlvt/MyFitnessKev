import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { useActiveWorkout } from '../../hooks/useActiveWorkout';
import { styles } from './active.style';

export default function ActiveWorkoutScreen() {
  // On récupère uniquement les données et fonctions prêtes à l'emploi
  const { currentWorkout, formattedTime, endWorkout } = useActiveWorkout();

  return (
    <View style={styles.container}>
      {/* Header Statut */}
      <View style={styles.header}>
        <Text style={styles.workoutName}>
          {currentWorkout ? currentWorkout.title : "Entraînement Libre"}
        </Text>
        <Text style={styles.timer}>⏱️ {formattedTime}</Text>
      </View>

      {/* Liste des Exercices */}
      <ScrollView style={styles.exerciseList}>
        {currentWorkout ? (
          currentWorkout.exercises.map((exercise, index) => (
            <View key={exercise.id} style={[styles.exerciseCard, index === 0 && styles.activeCard]}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseTitle}>
                  {index === 0 ? "▶️ " : ""}{exercise.name}
                </Text>
                {index === 0 && <Text style={styles.badge}>En cours</Text>}
              </View>
              
              <Text style={styles.exerciseDetails}>
                Objectif : {exercise.targetSets} séries de {exercise.targetRepetitions} répétitions
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.centered}>
            <Text>Aucun exercice. Ajoutez-en un manuellement.</Text>
          </View>
        )}
      </ScrollView>

      {/* Footer Fin de Séance */}
      <View style={styles.footer}>
        <Button title="Terminer l'entraînement" color="#FF3B30" onPress={endWorkout} />
      </View>
    </View>
  );
}
