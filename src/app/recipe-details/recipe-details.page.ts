import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from '../data/recipe.model';
import { MyRecipesService } from '../services/my-recipes.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
  recipe$: Observable<Recipe>;
  bookmarked = false;

  constructor(
    private recipeService: RecipeService,
    private myRecipesService: MyRecipesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const recipeId = +this.route.snapshot.paramMap.get('id');
    const recipeInMemory = this.myRecipesService.getMyRecipeById(recipeId);
    console.log(recipeInMemory);
    if (recipeInMemory) this.recipe$ = of(recipeInMemory);
    else this.recipe$ = this.recipeService.getRecipeDetails(recipeId);
  }

  bookmark(recipe: Recipe) {
    this.bookmarked = !this.bookmarked;
    this.myRecipesService.bookmark(recipe);
  }

  isBookmarked(recipe: Recipe) {
    return this.myRecipesService.isBookmarked(recipe);
  }
}
