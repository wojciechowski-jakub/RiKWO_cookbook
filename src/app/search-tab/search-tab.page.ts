import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { Category } from '../data/category.model';
import { Recipe } from '../data/recipe.model';
import { RecipeService } from './recipe.service';

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

  constructor(
    private categoryService: CategoryService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
    this.recipes$ = this.searchPhrase.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((phrase) => this.recipeService.searchRecipe(phrase))
    );
  }

  search(phrase: string): void {
    this.searchPhrase.next(phrase);
  }
}
