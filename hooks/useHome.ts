import { useRouter } from "expo-router";
import { mockWorkouts as MOCK_WORKOUTS } from "../constants/mockWorkouts";

export function useHome() {
  const router = useRouter();

  // Redirection vers une séance préprogrammée
  const startPreProgrammedWorkout = (workoutId: string) => {
    router.push({
      pathname: "/workout/active",
      params: { workoutId },
    });
  };

  // Redirection vers une séance vide
  const startEmptyWorkout = () => {
    router.push({
      pathname: "/workout/active",
      params: { workoutId: "empty" },
    });
  };

  return {
    workouts: MOCK_WORKOUTS,
    startPreProgrammedWorkout,
    startEmptyWorkout,
  };
}
