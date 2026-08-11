import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { mockWorkouts, PreProgrammedWorkout, Serie } from "../constants/mockWorkouts";

// Hook personnalisé pour gérer la logique d'une séance d'entraînement active
export function useActiveWorkout() {
  const router = useRouter();
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

  // State pour la séance d'entraînement en cours, initialisé à null
  const [currentWorkout, setCurrentWorkout] = useState<PreProgrammedWorkout | null>(null);
  // State pour le chronomètre
  const [seconds, setSeconds] = useState(0);

  // Effet pour initialiser la séance d'entraînement au chargement
  useEffect(() => {
    // Recherche de la séance pré-programmée via son ID
    const workoutTemplate = mockWorkouts.find((w) => w.id === workoutId);

    if (workoutTemplate) {
      // Création d'une copie profonde pour éviter de modifier l'objet original
      const workoutSession = JSON.parse(JSON.stringify(workoutTemplate));

      // Initialisation des séries pour chaque exercice si elles ne sont pas déjà définies
      workoutSession.exercises.forEach((exercise) => {
        if (exercise.series.length === 0) {
          exercise.series = Array.from({ length: exercise.targetSets }, (_, i) => ({
            id: `${exercise.id}-serie-${i}`,
            numeroSerie: i + 1,
            poidsPrecedent: (Math.random() * 20 + 60).toFixed(1), // Simule un poids précédent
            repetitionPrecedent: Math.floor(Math.random() * 5 + 8), // Simule des répétitions précédentes
            poids: null,
            repetition: null,
            isCompleted: false,
          }));
        }
      });
      setCurrentWorkout(workoutSession);
    }
  }, [workoutId]); // Se déclenche si l'ID de la séance change

  // Gestion du chronomètre
  useEffect(() => {
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(interval); // Nettoyage à la destruction du composant
  }, []);

  // Formatage du temps en MM:SS
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // --- Fonctions de manipulation des séries ---

  const addSerie = (exerciseId: string) => {
    if (!currentWorkout) return;

    const updatedWorkout = { ...currentWorkout };
    const exercise = updatedWorkout.exercises.find((e) => e.id === exerciseId);

    if (exercise) {
      const newSerie: Serie = {
        id: `${exerciseId}-serie-${new Date().getTime()}`, // ID unique
        numeroSerie: exercise.series.length + 1,
        poids: null,
        repetition: null,
        isCompleted: false,
      };
      exercise.series.push(newSerie);
      setCurrentWorkout(updatedWorkout);
    }
  };
  const removeSerie = (exerciseId: string) => {
    if (!currentWorkout) return;
  
    const updatedWorkout = { ...currentWorkout };
    const exercise = updatedWorkout.exercises.find((e) => e.id === exerciseId);
  
    // Supprime la dernière série si elle existe
    if (exercise && exercise.series.length > 0) {
      exercise.series.pop();
      setCurrentWorkout(updatedWorkout);
    }
  };
  
  const updateSerie = (exerciseId: string, serieId: string, values: { poids?: number; repetition?: number }) => {
    if (!currentWorkout) return;
  
    const updatedWorkout = { ...currentWorkout };
    const exercise = updatedWorkout.exercises.find((e) => e.id === exerciseId);
    
    if (exercise) {
      const serie = exercise.series.find((s) => s.id === serieId);
      if (serie) {
        // Met à jour le poids et/ou les répétitions
        serie.poids = values.poids ?? serie.poids;
        serie.repetition = values.repetition ?? serie.repetition;
        setCurrentWorkout(updatedWorkout);
      }
    }
  };
  
  const toggleSerie = (exerciseId: string, serieId: string) => {
    if (!currentWorkout) return;
  
    const updatedWorkout = { ...currentWorkout };
    const exercise = updatedWorkout.exercises.find((e) => e.id === exerciseId);
  
    if (exercise) {
      const serie = exercise.series.find((s) => s.id === serieId);
      if (serie) {
        // Inverse l'état de complétion
        serie.isCompleted = !serie.isCompleted;
        setCurrentWorkout(updatedWorkout);
      }
    }
  };
  // --- Fin des fonctions de manipulation ---

  const endWorkout = () => {
    router.back();
  };

  return {
    currentWorkout,
    formattedTime: formatTime(seconds),
    endWorkout,
    addSerie,
    removeSerie,
    updateSerie,
    toggleSerie,
  };
}
