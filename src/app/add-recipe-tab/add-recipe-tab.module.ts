import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRecipeTabPageRoutingModule } from './add-recipe-tab-routing.module';

import { AddRecipeTabPage } from './add-recipe-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRecipeTabPageRoutingModule
  ],
  declarations: [AddRecipeTabPage]
})
export class AddRecipeTabPageModule {}
