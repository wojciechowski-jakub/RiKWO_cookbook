import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Recipe } from '../data/recipe.model';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyRecipesService {
  recipes: Recipe[];
  private RECIPE_STORAGE = 'my-recipes';

  constructor() {
    this.recipes = [];
    this.loadRecipes();
  }

  bookmark(recipe: Recipe) {
    if (this.isBookmarked(recipe)) {
      this.recipes.splice(
        this.recipes.findIndex((r) => r.id === recipe.id),
        1
      );
    } else this.recipes.push(recipe);

    Storage.set({
      key: this.RECIPE_STORAGE,
      value: JSON.stringify(this.recipes),
    });
  }

  isBookmarked(recipe: Recipe) {
    return this.recipes.some((r) => r.id === recipe.id);
  }

  private loadRecipes() {
    const recipes$ = from(Storage.get({ key: this.RECIPE_STORAGE }));
    recipes$.subscribe(
      (recipes) => (this.recipes = JSON.parse(recipes.value) || [])
    );
  }

  getRecipes(): Recipe[] {
    return this.recipes;
  }
}
