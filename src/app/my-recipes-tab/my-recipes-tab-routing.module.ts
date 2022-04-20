import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRecipesTabPage } from './my-recipes-tab.page';

const routes: Routes = [
  {
    path: '',
    component: MyRecipesTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRecipesTabPageRoutingModule {}
