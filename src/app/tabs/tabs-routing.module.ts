import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'cookbook',
    component: TabsPage,
    children: [
      {
        path: 'search-tab',
        loadChildren: () =>
          import('../search-tab/search-tab.module').then(
            (m) => m.SearchTabPageModule
          ),
      },
      {
        path: 'add-recipe-tab',
        loadChildren: () =>
          import('../add-recipe-tab/add-recipe-tab.module').then(
            (m) => m.AddRecipeTabPageModule
          ),
      },
      {
        path: 'my-recipes-tab',
        loadChildren: () =>
          import('../my-recipes-tab/my-recipes-tab.module').then(
            (m) => m.MyRecipesTabPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/cookbook/search-tab',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/cookbook/search-tab',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
