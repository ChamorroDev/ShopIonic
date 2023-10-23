import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { ClUsuario} from '../../model/ClUsuario';
import { UsuarioServicioService } from './usuario-servicio.service';





@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {public alertButtons = ['OK'];

  constructor(public restApi: UsuarioServicioService
    , public loadingController: LoadingController
    , public router: Router) { }
    usuarios: ClUsuario[] = [];

  ngOnInit() {
    this.getUsuarios();
  }
  async getUsuarios() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getUsuarios()
      .subscribe({
        next: (res) => { 
          this.usuarios = res;
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }
}
