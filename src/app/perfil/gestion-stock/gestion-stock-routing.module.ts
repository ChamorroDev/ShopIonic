import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionStockPage } from './gestion-stock.page';

const routes: Routes = [
  {
    path: '',
    component: GestionStockPage,
  },
  {
    path: 'entrada-producto/:id',
    loadChildren: () =>
      import('./entrada-producto/entrada-producto.module').then(
        (m) => m.EntradaProductoPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionStockPageRoutingModule {}
