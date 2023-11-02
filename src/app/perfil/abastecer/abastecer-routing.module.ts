import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbastecerPage } from './abastecer.page';

const routes: Routes = [
  {
    path: '',
    component: AbastecerPage,
  },
  {
    path: 'detalle/:id',
    loadChildren: () =>
      import('./detalle/detalle.module').then((m) => m.DetallePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbastecerPageRoutingModule {}
