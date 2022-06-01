import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeDetailsPageRoutingModule } from './recipe-details-routing.module';

import { RecipeDetailsPage } from './recipe-details.page';
import { RecipeIngredientComponent } from './recipe-ingredient/recipe-ingredient.component';
import { RecipePreparationStepComponent } from './recipe-preparation-step/recipe-preparation-step.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeDetailsPageRoutingModule,
  ],
  declarations: [
    RecipeDetailsPage,
    RecipeIngredientComponent,
    RecipePreparationStepComponent,
  ],
})
export class RecipeDetailsPageModule {}
