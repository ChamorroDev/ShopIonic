import { Component, OnInit } from '@angular/core';
import { CarroServicioService } from '../carro/carro-servicio.service';
import { TarjetaServiceService } from '../../perfil/tarjetas/tarjetas-servicio.service';
import { ClTarjeta } from '../../model/ClTarjeta';
import { ActivatedRoute } from '@angular/router';
import { NavController,ModalController  } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import {  Router } from '@angular/router';
import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-rechazado',
  templateUrl: './rechazado.page.html',
  styleUrls: ['./rechazado.page.scss'],
})
export class RechazadoPage implements OnInit {
  mensaje:string="";
  constructor( 
    public restApi: CarroServicioService,
    public loadingController: LoadingController,
    public router: Router,
    private navCtrl: NavController, 
    private modalController: ModalController
    ) {
 
  }

  ngOnInit() {
    this.errorPago();

  }

  async errorPago() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    const postData = {
      rut:parseInt(globalData.RUT_CLIENTE, 10),
    };
    await loading.present();
    await this.restApi.errorPago(postData)
      .subscribe({
        next: (response) => { 
          this.mensaje=response.registro.error
          loading.dismiss();
          
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss();
        }
      })
  }
}
