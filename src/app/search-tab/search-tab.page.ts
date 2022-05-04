import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Category } from '../data/category.model';
import { Recipe } from '../data/recipe.model';
import { CategoryService } from '../services/category.service';
import { MyRecipesService } from '../services/my-recipes.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.page.html',
  styleUrls: ['./search-tab.page.scss'],
})
export class SearchTabPage implements OnInit {
  categories$: Observable<Category[]>;
  recipes$: Observable<Recipe[]>;
  searching = false;
  private searchPhrase = new Subject<string>();
  selectedCategory?: Category;

  constructor(
    private categoryService: CategoryService,
    private recipeService: RecipeService,
    private myRecipesService: MyRecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
    this.recipes$ = this.searchPhrase.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((phrase) =>
        this.recipeService.getRecipes(phrase, this.selectedCategory)
      )
    );
  }

  search(phrase: string): void {
    this.searchPhrase.next(phrase);
  }

  cancelSearch(searchbar: IonSearchbar): void {
    this.searching = false;
    searchbar.value = '';
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.search('');
  }

  bookmark(recipe: Recipe) {
    this.myRecipesService.bookmark(recipe);
  }

  showRecipeDetails(recipe: Recipe) {
    this.router.navigate(['cookbook/recipe-details', recipe.id]);
  }
}
