import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SucursalPage } from './sucursal.page';

const routes: Routes = [
  {
    path: '',
    component: SucursalPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  }
  ,
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
  ,
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SucursalPageRoutingModule {}
