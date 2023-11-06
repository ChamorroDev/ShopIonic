import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarOrdenPage } from './generar-orden.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarOrdenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarOrdenPageRoutingModule {}
