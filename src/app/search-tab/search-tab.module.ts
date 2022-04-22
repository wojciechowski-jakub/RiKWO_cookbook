import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchTabPageRoutingModule } from './search-tab-routing.module';

import { SearchTabPage } from './search-tab.page';
import { CategoryCardComponent } from './category-card/category-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SearchTabPageRoutingModule],
  declarations: [SearchTabPage, CategoryCardComponent],
  providers: [],
})
export class SearchTabPageModule {}
