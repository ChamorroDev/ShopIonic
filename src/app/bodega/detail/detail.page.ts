import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ClBodega} from '../../model/ClBodega';
import { BodegaServicioService } from '../bodega-servicio.service';

import { ClCiudad } from '../../model/ClCiudad';
import { CiudadServicioService } from '../../global-servicios/ciudad-servicio.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  constructor(
    public restApiCiudad: CiudadServicioService,
    public restApi: BodegaServicioService
    , public loadingController: LoadingController
    , public alertController: AlertController
    , public route: ActivatedRoute
    , public router: Router
  ) { }
  ciudad: ClCiudad = new ClCiudad({});
  bodega: ClBodega = new ClBodega({});
  ngOnInit() {
  
    this.getBodega()
  }
  getCiudad(id: number) {
     this.restApiCiudad.getCiudad(id)
      .subscribe({
        next: (res) => {
          this.ciudad = res;
        }
        , complete: () => { }
        , error: (err) => {
        }
      })
  }

  async getBodega() {
    const loading = await this.loadingController.create({ message: 'Loading...' });
    await loading.present();
    await this.restApi.getBodega(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          this.bodega = res;
          this.getCiudad(this.bodega.ciudad);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss(); 
        }
      })
  }


  async desactivar(id: number) {
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
      message: "Se ha desactivado el bodega",   // Mensaje
      buttons: [   // Botones
        {
          text: 'Aceptar ',
          
        }
      ]
    });
    await alert.present();
  }
    

}
