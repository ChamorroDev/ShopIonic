import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AceptadoPage } from './aceptado.page';

const routes: Routes = [
  {
    path: '',
    component: AceptadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AceptadoPageRoutingModule {}
