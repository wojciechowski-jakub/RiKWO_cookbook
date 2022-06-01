import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/data/ingredient.model';

@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.scss'],
})
export class RecipeIngredientComponent implements OnInit {
  @Input() ingredient: Ingredient;

  constructor() {}

  ngOnInit() {}
}
