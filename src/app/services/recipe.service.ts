import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../data/category.model';
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
              title: recipe.title,
              photo: recipe.image,
              ingredients: [],
              preparationSteps: [],
            };
          })
        )
      );
  }
}
