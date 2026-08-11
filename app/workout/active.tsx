import React from 'react';
import { Button, ScrollView, Text, View, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useActiveWorkout } from '../../hooks/useActiveWorkout';
import { styles } from './active.style';

export default function ActiveWorkoutScreen() {
  const {
    currentWorkout,
    formattedTime,
    endWorkout,
    addSerie,
    removeSerie,
    updateSerie,
    toggleSerie,
  } = useActiveWorkout();

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

              {index === 0 && (
                <View style={styles.seriesContainer}>
                  <View style={styles.seriesHeader}>
                    <Text style={[styles.headerText, { width: '10%' }]}>Série</Text>
                    <Text style={[styles.headerText, { width: '25%' }]}>Précédent</Text>
                    <Text style={[styles.headerText, { width: '18%' }]}>Kg</Text>
                    <Text style={[styles.headerText, { width: '18%' }]}>Reps</Text>
                    <Text style={[styles.headerText, { width: '15%' }]}>Fait</Text>
                  </View>
                  {exercise.series.map((serie) => (
                    <View key={serie.id} style={styles.serieRow}>
                      <Text style={styles.serieNumber}>{serie.numeroSerie}</Text>
                      <Text style={styles.previousPerformance}>
                        {serie.poidsPrecedent}kg x {serie.repetitionPrecedent}
                      </Text>
                      <TextInput
                        style={styles.serieInput}
                        keyboardType="numeric"
                        placeholder="0"
                        defaultValue={serie.poids?.toString()}
                        onChangeText={(text) => updateSerie(exercise.id, serie.id, { poids: Number(text) })}
                      />
                      <TextInput
                        style={styles.serieInput}
                        keyboardType="numeric"
                        placeholder="0"
                        defaultValue={serie.repetition?.toString()}
                        onChangeText={(text) => updateSerie(exercise.id, serie.id, { repetition: Number(text) })}
                      />
                      <Switch
                        value={serie.isCompleted}
                        onValueChange={() => toggleSerie(exercise.id, serie.id)}
                      />
                    </View>
                  ))}
                  <View style={styles.seriesActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => addSerie(exercise.id)}>
                      <Text style={styles.actionButtonText}>Ajouter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.removeButton]} onPress={() => removeSerie(exercise.id)}>
                      <Text style={styles.actionButtonText}>Retirer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
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

