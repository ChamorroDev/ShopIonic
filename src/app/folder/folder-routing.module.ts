import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccesoUsuariosGuard} from '../guards/acceso-usuarios.guard'

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
    ,canActivate:[AccesoUsuariosGuard]

  },
  {
    path: 'sucursal',
    loadChildren: () => import('./sucursal/sucursal.module').then( m => m.SucursalPageModule)
    ,canActivate:[AccesoUsuariosGuard]


  },
  {
    path: 'direccion',
    loadChildren: () => import('./direccion/direccion.module').then( m => m.DireccionPageModule)
    ,canActivate:[AccesoUsuariosGuard]

  },
  {
    path: 'retirador',
    loadChildren: () => import('./retirador/retirador.module').then( m => m.RetiradorPageModule)
    ,canActivate:[AccesoUsuariosGuard]

  },
  {
    path: 'forma-pagar',
    loadChildren: () => import('./forma-pagar/forma-pagar.module').then( m => m.FormaPagarPageModule)
    ,canActivate:[AccesoUsuariosGuard]

  },
  {
    path: 'aceptado',
    loadChildren: () => import('./aceptado/aceptado.module').then( m => m.AceptadoPageModule)
    ,canActivate:[AccesoUsuariosGuard]

  },
  {
    path: 'rechazado',
    loadChildren: () => import('./rechazado/rechazado.module').then( m => m.RechazadoPageModule)
    ,canActivate:[AccesoUsuariosGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
