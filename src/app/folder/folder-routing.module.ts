import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: 'tienda-producto/:id',
    loadChildren: () => import('./tienda-producto/tienda-producto.module').then( m => m.TiendaProductoPageModule)
  },
  {
    path: 'carro',
    loadChildren: () => import('./carro/carro.module').then( m => m.CarroPageModule)
  },
  {
    path: 'sucursal',
    loadChildren: () => import('./sucursal/sucursal.module').then( m => m.SucursalPageModule)
  },
  {
    path: 'direccion',
    loadChildren: () => import('./direccion/direccion.module').then( m => m.DireccionPageModule)
  },
  {
    path: 'retirador',
    loadChildren: () => import('./retirador/retirador.module').then( m => m.RetiradorPageModule)
  },
  {
    path: 'forma-pagar',
    loadChildren: () => import('./forma-pagar/forma-pagar.module').then( m => m.FormaPagarPageModule)
  },
  {
    path: 'aceptado',
    loadChildren: () => import('./aceptado/aceptado.module').then( m => m.AceptadoPageModule)
  },
  {
    path: 'rechazado',
    loadChildren: () => import('./rechazado/rechazado.module').then( m => m.RechazadoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
