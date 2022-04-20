import { Ingredient } from './ingredient.model';

export interface Recipe {
  title: string;
  photo: string;
  ingredients: Ingredient[];
  preparationSteps: string[];
}
