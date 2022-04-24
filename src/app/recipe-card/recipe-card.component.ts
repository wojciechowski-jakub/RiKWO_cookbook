import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../data/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeClick = new EventEmitter<Recipe>();
  @Output() bookmark = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit() {}

  onRecipeClick(recipe: Recipe) {
    this.recipeClick.emit(recipe);
  }

  addToFavorites(recipe: Recipe) {
    this.bookmark.emit(recipe);
  }
}
