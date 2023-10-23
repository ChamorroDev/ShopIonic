import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ClCliente } from '../../model/ClUsuario';
import { ClientesServicioService } from '../clientes/clientes-servicio.service';

import { globalData } from 'src/app/constants/user';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  constructor(
    public restApi: ClientesServicioService,
     public loadingController: LoadingController
    , public router: Router,
    private navCtrl: NavController
  ) {
   }

   ngOnInit() {
    this.getCliente();
   
  }
  cliente: ClCliente = new ClCliente({});
  mostrarElemento = false;

  ionViewWillEnter() {
    this.getCliente();

  }

  async getCliente() {
    const loading = await this.loadingController.create({
      cssClass: 'fullscreen-loading',
    });
    loading.present();
    await this.restApi.getCliente(globalData.RUT_CLIENTE)
      .subscribe({
        next: (res) => { 
          this.cliente = res.registro;
            loading.dismiss();
     
          this.mostrarElemento=true;
        },
        
        complete: () => { },
        error: (err) => {
          console.log("Err:" + err);
         
        }
      });
  }
  
  
  

}
