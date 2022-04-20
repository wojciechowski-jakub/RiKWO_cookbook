import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'search-tab',
    loadChildren: () => import('./search-tab/search-tab.module').then( m => m.SearchTabPageModule)
  },
  {
    path: 'add-recipe-tab',
    loadChildren: () => import('./add-recipe-tab/add-recipe-tab.module').then( m => m.AddRecipeTabPageModule)
  },
  {
    path: 'my-recipes-tab',
    loadChildren: () => import('./my-recipes-tab/my-recipes-tab.module').then( m => m.MyRecipesTabPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
