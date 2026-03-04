export interface HealthPlanSummary {
  status: string;
  description: string;
}

export interface HealthPlanTimeline {
  estimatedWeeks: number;
  progressPercentage: number;
}

export interface ExercisePlanItem {
  day: string;
  activity: string;
  duration: string;
  caloriesBurned: string;
}

export interface MacroBreakdownItem {
  type: string;
  valueInGrams: number;
  percentage: string;
}

export interface DietaryRecommendations {
  focus: string;
  postWorkoutSpecifics: string;
  suggestedFoods: string;
  toAvoid: string;
}

export interface HealthPlanNutrition {
  dailyCalories: number;
  macroBreakdown: MacroBreakdownItem[];
  dietaryRecommendations: DietaryRecommendations;
}

export interface WeightProgressItem {
  week: string;
  weight: string;
}

export interface CompositionDetailItem {
  type: string;
  value: string;
}

export interface CompositionsItem {
  activity: CompositionDetailItem[];
  body: CompositionDetailItem[];
}

export interface HealthPlanResponse {
  bmi: number;
  summary: HealthPlanSummary;
  timeline: HealthPlanTimeline;
  exerciseCalendar: ExercisePlanItem[];
  nutrition: HealthPlanNutrition;
  weightProgress: WeightProgressItem[];
  compositions: CompositionsItem[];
}
