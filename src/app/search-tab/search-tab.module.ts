import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchTabPageRoutingModule } from './search-tab-routing.module';

import { SearchTabPage } from './search-tab.page';
import { CategoryCardComponent } from './category-card/category-card.component';
import { AppModule } from '../app.module';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeCardModule } from '../recipe-card/recipe-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchTabPageRoutingModule,
    RecipeCardModule,
  ],
  declarations: [SearchTabPage, CategoryCardComponent, SearchFiltersComponent],
  providers: [],
})
export class SearchTabPageModule {}
