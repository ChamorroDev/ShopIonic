import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechazadoPage } from './rechazado.page';

const routes: Routes = [
  {
    path: '',
    component: RechazadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechazadoPageRoutingModule {}
