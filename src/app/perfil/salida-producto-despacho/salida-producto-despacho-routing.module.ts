import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalidaProductoDespachoPage } from './salida-producto-despacho.page';

const routes: Routes = [
  {
    path: '',
    component: SalidaProductoDespachoPage,
  },
  {
    path: 'generar-orden',
    loadChildren: () =>
      import('./generar-orden/generar-orden.module').then(
        (m) => m.GenerarOrdenPageModule
      ),
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
export class SalidaProductoDespachoPageRoutingModule {}
