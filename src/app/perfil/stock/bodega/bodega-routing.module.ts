import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodegaPage } from './bodega.page';

const routes: Routes = [
  {
    path: '',
    component: BodegaPage,
  },
  {
    path: 'detalle/:id',
    loadChildren: () =>
      import('./detalle/detalle.module').then((m) => m.DetallePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegaPageRoutingModule {}
