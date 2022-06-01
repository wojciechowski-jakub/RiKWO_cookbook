import {
  SearchFiltersComponent,
  FilterValues,
} from './search-filters/search-filters.component';
import { OptionsActionSheetsService } from './../services/options-action-sheets.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActionSheetController,
  IonSearchbar,
  ModalController,
  Platform,
} from '@ionic/angular';
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
import { LoadingService } from '../services/loading.service';
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
  lastSearchPhrase?: string;
  sortOption?: string;
  filterValues?: FilterValues;

  @ViewChild('searchbar') searchbar: IonSearchbar;

  constructor(
    private categoryService: CategoryService,
    private recipeService: RecipeService,
    private myRecipesService: MyRecipesService,
    private router: Router,
    private loadingService: LoadingService,
    private platform: Platform,
    private optionsService: OptionsActionSheetsService,
    private modalController: ModalController
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.searching) {
        this.searching = false;
        this.searchbar.value = '';
      }
    });
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
    this.recipes$ = this.searchPhrase.pipe(
      debounceTime(300),
      // distinctUntilChanged(),
      tap(() => {
        this.loadingService.displayLoader();
        this.searching = true;
      }),
      switchMap((phrase) => {
        this.lastSearchPhrase = phrase;
        return this.recipeService.getRecipes(
          phrase,
          this.selectedCategory,
          this.sortOption,
          this.filterValues
        );
      }),
      tap(() => this.loadingService.dismissLoader())
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

  async showSortOptions() {
    const sortOption = await this.optionsService.showSortOptions();

    this.sortOption = sortOption;
    if (!sortOption) return;

    // this.recipes$ = this.recipeService.getRecipes(
    //   this.lastSearchPhrase,
    //   this.selectedCategory,
    //   this.sortOption,
    //   this.filterValues
    // );
    this.searchPhrase.next(this.lastSearchPhrase);
  }

  async showFilterOptions() {
    const modal = await this.modalController.create({
      component: SearchFiltersComponent,
      componentProps: { values: this.filterValues },
      breakpoints: [0, 0.3, 0.5, 0.78, 0.9],
      initialBreakpoint: 0.78,
      backdropDismiss: false,
    });

    modal.onDidDismiss().then((data) => {
      this.filterValues = data.data;

      // this.recipes$ = this.recipeService.getRecipes(
      //   this.lastSearchPhrase,
      //   this.selectedCategory,
      //   this.sortOption,
      //   this.filterValues
      // );
      this.searchPhrase.next(this.lastSearchPhrase);
    });

    return await modal.present();
  }
}
