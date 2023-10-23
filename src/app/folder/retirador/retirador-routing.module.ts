import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetiradorPage } from './retirador.page';

const routes: Routes = [
  {
    path: '',
    component: RetiradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetiradorPageRoutingModule {}
