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
  selector: 'app-forma-pagar',
  templateUrl: './forma-pagar.page.html',
  styleUrls: ['./forma-pagar.page.scss'],
})
export class FormaPagarPage implements OnInit {

    constructor(
      public restApi: CarroServicioService,
      public restApiTarjeta: TarjetaServiceService,
      public loadingController: LoadingController,
      public router: Router,
      private navCtrl: NavController, 
      private modalController: ModalController
      ) { }
    tarjetas:ClTarjeta[]=[];
    tarjetaSeleccionada:Number=0;

    ngOnInit() {
      this.obtenerTarjetas();

    }
    ionViewWillEnter(){
      this.obtenerTarjetas();
    }
    mostrarUltimosCuatroDigitos(numeroTarjeta: number): string {
      const numeroComoCadena = numeroTarjeta.toString();
      if (numeroComoCadena.length >= 4) {
        return '**** **** **** ' + numeroComoCadena.slice(-4);
      } else {
        return 'Número de tarjeta inválido';
      }
    }
    

 

    async obtenerTarjetas() {
      const loading = await this.loadingController.create({
        message: 'Cargando...'
      });
      await loading.present();
      await this.restApiTarjeta.getTarjetas(parseInt(globalData.RUT_CLIENTE, 10))
        .subscribe({
          next: (res) => { 
            this.tarjetas=res.registro;
            
            loading.dismiss();
          }
          , complete: () => { }
          , error: (err) => {
            loading.dismiss();
          }
        })
    }
    async hacerPago() {
      const loading = await this.loadingController.create({
        message: 'Cargando...'
      });
      const postData = {
        rut:parseInt(globalData.RUT_CLIENTE, 10),
        tarjeta:this.tarjetaSeleccionada,
      };
      await loading.present();
      await this.restApi.pagoWebPay(postData)
        .subscribe({
          next: (response) => { 
            loading.dismiss();
            if (response && response.registro && response.registro.respuesta && response.registro.respuesta.status === 'AUTHORIZED') {

              console.log('El estado es "AUTHORIZED".');
              this.router.navigate(['/folder/aceptado']);
            }else{
              
              
              console.log('El estado no es "AUTHORIZED" ',response.registro.error);
              this.router.navigate(['/folder/rechazado']);
            }

            
            
            
          }
          , complete: () => { }
          , error: (err) => {
            loading.dismiss();
          }
        })
    }
}
