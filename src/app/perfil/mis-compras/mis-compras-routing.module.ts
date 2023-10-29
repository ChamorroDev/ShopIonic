import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisComprasPage } from './mis-compras.page';

const routes: Routes = [
  {
    path: '',
    component: MisComprasPage,
  },

  {
    path: 'detalle-boleta/:id',
    loadChildren: () =>
      import('./detalle-boleta/detalle-boleta.module').then(
        (m) => m.DetalleBoletaPageModule
      ),
  },
  {
    path: 'detalle-factura/:id',
    loadChildren: () =>
      import('./detalle-factura/detalle-factura.module').then(
        (m) => m.DetalleFacturaPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisComprasPageRoutingModule {}
