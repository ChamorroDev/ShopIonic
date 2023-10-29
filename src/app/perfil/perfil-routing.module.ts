import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPage } from './perfil.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage,
  },
  {
    path: 'tarjetas',
    loadChildren: () =>
      import('./tarjetas/tarjetas.module').then((m) => m.TarjetasPageModule),
  },
  {
    path: 'historial',
    loadChildren: () =>
      import('./historial/historial.module').then((m) => m.HistorialPageModule),
  },
  {
    path: 'direcciones',
    loadChildren: () =>
      import('./direcciones/direcciones.module').then(
        (m) => m.DireccionesPageModule
      ),
  },
  {
    path: 'producto',
    loadChildren: () =>
      import('./producto/producto.module').then((m) => m.ProductoPageModule),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then((m) => m.UsuariosPageModule),
  },
  {
    path: 'categoria',
    loadChildren: () =>
      import('./categoria/categoria.module').then((m) => m.CategoriaPageModule),
  },
  {
    path: 'proveedores',
    loadChildren: () =>
      import('./proveedores/proveedores.module').then(
        (m) => m.ProveedoresPageModule
      ),
  },
  {
    path: 'empleado',
    loadChildren: () =>
      import('./empleado/empleado.module').then((m) => m.EmpleadoPageModule),
  },
  {
    path: 'sucursal',
    loadChildren: () =>
      import('./sucursal/sucursal.module').then((m) => m.SucursalPageModule),
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./clientes/clientes.module').then((m) => m.ClientesPageModule),
  },
  {
    path: 'marca',
    loadChildren: () =>
      import('./marca/marca.module').then((m) => m.MarcaPageModule),
  },
  {
    path: 'genero',
    loadChildren: () =>
      import('./genero/genero.module').then((m) => m.GeneroPageModule),
  },
  {
    path: 'cuenta',
    loadChildren: () =>
      import('./cuenta/cuenta.module').then((m) => m.CuentaPageModule),
  },
  {
    path: 'region',
    loadChildren: () =>
      import('./region/region.module').then((m) => m.RegionPageModule),
  },
  {
    path: 'ciudad',
    loadChildren: () =>
      import('./ciudad/ciudad.module').then((m) => m.CiudadPageModule),
  },
  {
    path: 'cargo',
    loadChildren: () =>
      import('./cargo/cargo.module').then((m) => m.CargoPageModule),
  },
  {
    path: 'atributo',
    loadChildren: () =>
      import('./atributo/atributo.module').then((m) => m.AtributoPageModule),
  },

  {
    path: 'bodega',
    loadChildren: () =>
      import('./bodega/bodega.module').then((m) => m.BodegaPageModule),
  },
  {
    path: 'mis-compras',
    loadChildren: () =>
      import('./mis-compras/mis-compras.module').then(
        (m) => m.MisComprasPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPageRoutingModule {}
