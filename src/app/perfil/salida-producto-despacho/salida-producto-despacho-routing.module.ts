import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalidaProductoDespachoPage } from './salida-producto-despacho.page';

const routes: Routes = [
  {
    path: '',
    component: SalidaProductoDespachoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalidaProductoDespachoPageRoutingModule {}
