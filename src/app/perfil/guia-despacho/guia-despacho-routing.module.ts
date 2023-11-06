import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuiaDespachoPage } from './guia-despacho.page';

const routes: Routes = [
  {
    path: '',
    component: GuiaDespachoPage,
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
export class GuiaDespachoPageRoutingModule {}
