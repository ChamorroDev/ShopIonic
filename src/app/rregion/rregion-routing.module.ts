import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RregionPage } from './rregion.page';

const routes: Routes = [
  {
    path: '',
    component: RregionPage
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RregionPageRoutingModule {}
