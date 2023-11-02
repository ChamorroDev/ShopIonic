import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosProveedorPage } from './pedidos-proveedor.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosProveedorPage,
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
export class PedidosProveedorPageRoutingModule {}
