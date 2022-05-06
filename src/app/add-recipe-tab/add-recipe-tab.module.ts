import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRecipeTabPageRoutingModule } from './add-recipe-tab-routing.module';

import { AddRecipeTabPage } from './add-recipe-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRecipeTabPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddRecipeTabPage],
})
export class AddRecipeTabPageModule {}
