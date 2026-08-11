export interface Serie {
  id: string;
  numeroSerie: number;
  poidsPrecedent?: number;
  repetitionPrecedent?: number;
  poids: number | null;
  repetition: number | null;
  isCompleted: boolean;
}
export interface Exercise {
  id:string;
  name: string;
  targetRepetitions: number;
  targetSets: number;
  series: Serie[];
}

export interface PreProgrammedWorkout {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
}

export const mockWorkouts: PreProgrammedWorkout[] = [
  {
    id: "push-day-1",
    title: "Séance Push (Pectoraux / Épaules / Triceps)",
    description: "Focus progression force et volume de travail",
    exercises: [
      {
        id: "barbell-dc-1",
        name: "Développé Couché (Barre)",
        targetRepetitions: 10,
        targetSets: 4,
        series: [],
      },
      {
        id: "db-shoulder-press-1",
        name: "Développé Épaules (Haltères)",
        targetRepetitions: 12,
        targetSets: 3,
        series: [],
      },
      {
        id: "tricep-dips-1",
        name: "Extensions Triceps (Poulie)",
        targetRepetitions: 15,
        targetSets: 3,
        series: [],
      },
    ],
  },
];
