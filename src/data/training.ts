export interface TrainingItem {
  id: string;
  name: string;
  provider: string;
  year: string;
  description?: string;
  logo?: string;
}

export const training: TrainingItem[] = [
  {
    id: "training-1",
    name: "Sample Training Course",
    provider: "Training Provider",
    year: "2024",
    description: "Description of the training course.",
    logo: "",
  },
];
