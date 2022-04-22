import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RECIPES } from '../data/mock.recipes';
import { Recipe } from '../data/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  searchRecipe(phrase: string): Observable<Recipe[]> {
    return of(RECIPES);
  }
}
