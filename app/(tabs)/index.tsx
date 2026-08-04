import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { useHome } from '../../hooks/useHome';
import { styles } from './home.styles';

export default function HomeScreen() {
  // Extraction des données et des actions depuis notre hook personnalisé
  const { workouts, startPreProgrammedWorkout, startEmptyWorkout } = useHome();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Mon Assistant Fitness</Text>

      {/* Option pour lancer un entraînement libre */}
      <Text style={styles.sectionTitle}>Entraînement libre</Text>
      <TouchableOpacity style={[styles.workoutCard, styles.emptyCard]} onPress={startEmptyWorkout}>
        <Text style={styles.emptyText}>+ Lancer un entraînement vide</Text>
      </TouchableOpacity>

      {/* Liste des séances programmées */}
      <Text style={styles.sectionTitle}>Séances programmées</Text>
      {workouts.map((workout) => (
        <TouchableOpacity
          key={workout.id}
          style={styles.workoutCard}
          onPress={() => startPreProgrammedWorkout(workout.id)}
        >
          <Text style={styles.workoutTitle}>{workout.title}</Text>
          <Text style={styles.workoutDesc}>{workout.description}</Text>
          <Text style={styles.workoutMeta}>{workout.exercises.length} exercices prévus</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
