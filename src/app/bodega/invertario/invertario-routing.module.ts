import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvertarioPage } from './invertario.page';

const routes: Routes = [
  {
    path: '',
    component: InvertarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvertarioPageRoutingModule {}
