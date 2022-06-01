import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../data/recipe.model';
import { MyRecipesService } from '../services/my-recipes.service';

@Component({
  selector: 'app-my-recipes-tab',
  templateUrl: './my-recipes-tab.page.html',
  styleUrls: ['./my-recipes-tab.page.scss'],
})
export class MyRecipesTabPage implements OnInit {
  recipes: Recipe[];

  constructor(
    private myRecipesService: MyRecipesService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.recipes = this.myRecipesService.getRecipes();
  }

  bookmark(recipe: Recipe) {
    this.myRecipesService.bookmark(recipe);
  }

  showRecipeDetails(recipe: Recipe) {
    this.router.navigate(['cookbook/recipe-details', recipe.id]);
  }
}
