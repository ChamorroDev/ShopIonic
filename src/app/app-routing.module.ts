import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AccesoUsuariosGuard} from './guards/acceso-usuarios.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'perfil',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'recuperarclave',
    loadChildren: () => import('./recuperarclave/recuperarclave.module').then( m => m.RecuperarclavePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
    //,canActivate:[AccesoUsuariosGuard]

  }
 ,
  {
    path: 'rregion',
    loadChildren: () => import('./rregion/rregion.module').then( m => m.RregionPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
