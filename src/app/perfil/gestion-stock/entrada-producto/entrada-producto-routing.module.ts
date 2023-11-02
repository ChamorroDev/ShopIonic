import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntradaProductoPage } from './entrada-producto.page';

const routes: Routes = [
  {
    path: '',
    component: EntradaProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntradaProductoPageRoutingModule {}
