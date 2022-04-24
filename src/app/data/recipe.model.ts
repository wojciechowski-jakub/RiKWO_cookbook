import { Ingredient } from './ingredient.model';

export interface Recipe {
  id: number;
  title: string;
  photo: string;
  ingredients: Ingredient[];
  preparationSteps: string[];
}
