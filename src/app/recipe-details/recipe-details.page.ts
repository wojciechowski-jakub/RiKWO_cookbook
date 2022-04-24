import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../data/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
  recipe$: Observable<Recipe>;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const recipeId = +this.route.snapshot.paramMap.get('id');
    this.recipe$ = this.recipeService.getRecipeDetails(recipeId);
  }
}
