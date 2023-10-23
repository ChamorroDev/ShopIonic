import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

import { ClUsuario } from '../../../model/ClUsuario';
import { UsuarioServicioService } from '../usuario-servicio.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})


export class DetailPage implements OnInit {

  constructor(
    public restApi: UsuarioServicioService
    , public loadingController: LoadingController
    , public alertController: AlertController
    , public route: ActivatedRoute
    , public router: Router
  ) { }

  usuario:ClUsuario =new ClUsuario({});
  ngOnInit() {
    this.getUsuario();
  }

  async getUsuario() {
    console.log("getProduct **************** ParamMap ID:" + this.route.snapshot.paramMap.get('id'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    // Mostramos el Wait
    await loading.present();
    await this.restApi.getUsuario(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          this.usuario = res;
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          //Si no funcion desplegamos en consola el error
          console.log("Error DetailProduct Página", err);
          loading.dismiss(); //Elimina la espera
        }
      })
  }


  async desactivar(id: number) {
    // Confirma Primero
    this.presentAlertConfirm(id, 'Confirme la desactivación, De lo cantrario Cancele');
  }
  async presentAlertConfirm(id: number, msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!', // Título
      message: msg,   // Mensaje
      buttons: [   // Botones
        {
          text: 'Cancelar ',
          handler: () => { 
          }
        },
        {
          text: 'Desactivar ',
          handler: () => { 
            this.deleteConfirmado(id)
          }
        }
      ]
    });
    await alert.present();
  }
 
  async deleteConfirmado(id: number) {
    const alert = await this.alertController.create({
      header: 'Completado', // Título
      message: "Se ha desactivado el usuario",   // Mensaje
      buttons: [   // Botones
        {
          text: 'Aceptar ',
          
        }
      ]
    });
    await alert.present();
  }
    

}
