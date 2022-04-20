import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRecipesTabPageRoutingModule } from './my-recipes-tab-routing.module';

import { MyRecipesTabPage } from './my-recipes-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRecipesTabPageRoutingModule
  ],
  declarations: [MyRecipesTabPage]
})
export class MyRecipesTabPageModule {}
