import content from "@/content/training.json";

export interface TrainingItem {
  id: string;
  name: string;
  provider: string;
  year: string;
  description?: string;
  logo?: string;
}

export const training = content.training as TrainingItem[];
