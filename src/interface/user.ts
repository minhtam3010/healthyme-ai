import type { HealthPlanResponse } from "./health";

export interface User {
  id: string;
  name: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  goalWeight: number;
  day2Exercise: number; // Time per day exercise
  health: HealthPlanResponse;
}
