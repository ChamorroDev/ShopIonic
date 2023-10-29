import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleFacturaPage } from './detalle-factura.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleFacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleFacturaPageRoutingModule {}
