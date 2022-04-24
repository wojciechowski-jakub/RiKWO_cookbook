import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../data/category.model';
import { Ingredient } from '../data/ingredient.model';
import { Recipe } from '../data/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiKey = environment.apiKey;
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getRecipes(query?: string, category?: Category): Observable<Recipe[]> {
    let params = new HttpParams().set('apiKey', this.apiKey).set('number', 50);
    if (query) params = params.set('query', query);
    if (category) params = params.set(category.type, category.title);

    return this.http
      .get(`${this.apiURL}/recipes/complexSearch`, { params })
      .pipe(
        map((result: any) =>
          result.results.map((recipe) => {
            return {
              id: recipe.id,
              title: recipe.title,
              photo: recipe.image,
              ingredients: [],
              preparationSteps: [],
            };
          })
        )
      );
  }

  getRecipeDetails(id: number): Observable<Recipe> {
    let params = new HttpParams().set('apiKey', this.apiKey);

    return forkJoin([
      this.getRecipeInfo(id),
      this.getRecipePreparationSteps(id),
      this.getRecipeIngredients(id),
    ]).pipe(
      map((response) => {
        return {
          ...response[0],
          preparationSteps: response[1],
          ingredients: response[2],
        };
      })
    );
  }

  private getRecipeInfo(id: number): Observable<Recipe> {
    let params = new HttpParams().set('apiKey', this.apiKey);

    return this.http
      .get(`${this.apiURL}/recipes/${id}/information`, { params })
      .pipe(
        map((recipe: any) => {
          return {
            id: recipe.id,
            title: recipe.title,
            photo: recipe.image,
            ingredients: [],
            preparationSteps: [],
          };
        })
      );
  }

  private getRecipePreparationSteps(id: number): Observable<string[]> {
    return of(['Step 1', 'Step 2', 'Step 3']);
  }

  private getRecipeIngredients(id: number): Observable<Ingredient[]> {
    let params = new HttpParams().set('apiKey', this.apiKey);

    return this.http
      .get(`${this.apiURL}/recipes/${id}/ingredientWidget.json`, { params })
      .pipe(
        map((response: any) =>
          response.ingredients.map((ingredient) => {
            return {
              name: ingredient.name,
              amount: ingredient.amount.metric.value,
              unit: ingredient.amount.metric.unit,
            };
          })
        )
      );
  }
}
