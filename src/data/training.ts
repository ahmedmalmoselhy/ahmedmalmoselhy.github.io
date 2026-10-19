import { ordered } from "@/lib/content";

export interface TrainingItem {
  id: string;
  name: string;
  provider: string;
  year: string;
  description?: string;
  logo?: string;
}

export const training = ordered<TrainingItem>(
  import.meta.glob("/src/content/training/*.json", { eager: true, import: "default" }),
);
