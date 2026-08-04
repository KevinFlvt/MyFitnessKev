import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { mockWorkouts } from "../constants/mockWorkouts";

export function useActiveWorkout() {
  const router = useRouter();
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();
  const [seconds, setSeconds] = useState(0);

  // Recherche de la séance
  const currentWorkout = mockWorkouts.find((w) => w.id === workoutId);

  // Gestion du chronomètre global
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Formatage des secondes en MM:SS
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const endWorkout = () => {
    router.back();
  };

  return {
    currentWorkout,
    formattedTime: formatTime(seconds),
    endWorkout,
  };
}
