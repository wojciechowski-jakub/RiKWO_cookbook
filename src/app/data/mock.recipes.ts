import { Recipe } from './recipe.model';

export const RECIPES: Recipe[] = [
  {
    title: 'Test',
    preparationSteps: ['1.Step1', '2.Step2', '3.Step3'],
    photo:
      'https://hips.hearstapps.com/hmg-prod/images/delish-190808-baked-drumsticks-0217-landscape-pf-1567089281.jpg',
    ingredients: [
      { name: 'ingredient1', amount: 1, unit: 'unit1' },
      { name: 'ingredient2', amount: 2, unit: 'unit2' },
    ],
  },
];
