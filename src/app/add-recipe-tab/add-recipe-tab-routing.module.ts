import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRecipeTabPage } from './add-recipe-tab.page';

const routes: Routes = [
  {
    path: '',
    component: AddRecipeTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRecipeTabPageRoutingModule {}
