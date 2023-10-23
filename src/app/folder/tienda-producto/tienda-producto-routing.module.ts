import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendaProductoPage } from './tienda-producto.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaProductoPageRoutingModule {}
