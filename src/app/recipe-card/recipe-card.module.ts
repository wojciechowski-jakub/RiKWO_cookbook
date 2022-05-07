import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from './recipe-card.component';

@NgModule({
  declarations: [RecipeCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [RecipeCardComponent],
})
export class RecipeCardModule {}
