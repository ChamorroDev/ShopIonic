import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneroPage } from './genero.page';

const routes: Routes = [
  {
    path: '',
    component: GeneroPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneroPageRoutingModule {}
