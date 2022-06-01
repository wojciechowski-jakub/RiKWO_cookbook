import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../data/recipe.model';
import { MyRecipesService } from '../services/my-recipes.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeClick = new EventEmitter<Recipe>();
  @Output() bookmark = new EventEmitter<Recipe>();
  bookmarked = false;

  constructor(private myRecipesService: MyRecipesService) {}

  ngOnInit() {
    this.bookmarked = this.myRecipesService.isBookmarked(this.recipe);
  }

  onRecipeClick(recipe: Recipe) {
    this.recipeClick.emit(recipe);
  }

  onBookmark(recipe: Recipe) {
    this.bookmarked = !this.bookmarked;
    this.bookmark.emit(recipe);
  }
}
