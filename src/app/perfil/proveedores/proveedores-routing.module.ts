import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedoresPage } from './proveedores.page';

const routes: Routes = [
  {
    path: '',
    component: ProveedoresPage,
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then((m) => m.AddPageModule),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./edit/edit.module').then((m) => m.EditPageModule),
  },
  {
    path: 'detail/:id',
    loadChildren: () =>
      import('./detail/detail.module').then((m) => m.DetailPageModule),
  },
  {
    path: 'add-producto/:id',
    loadChildren: () =>
      import('./add-producto/add-producto.module').then(
        (m) => m.AddProductoPageModule
      ),
  },
  {
    path: 'add-bodega/:id',
    loadChildren: () =>
      import('./add-bodega/add-bodega.module').then(
        (m) => m.AddBodegaPageModule
      ),
  },
  {
    path: 'lista-productos',
    loadChildren: () =>
      import('./lista-productos/lista-productos.module').then(
        (m) => m.ListaProductosPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedoresPageRoutingModule {}
