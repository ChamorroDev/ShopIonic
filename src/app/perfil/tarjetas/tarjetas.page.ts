import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';

import { TarjetaServiceService } from './tarjetas-servicio.service';
import { ClTarjeta } from '../../model/ClTarjeta';
import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.page.html',
  styleUrls: ['./tarjetas.page.scss'],
})
export class TarjetasPage implements OnInit {

  constructor(public restApi: TarjetaServiceService
    , public loadingController: LoadingController
    , public router: Router) { }
    tarjetas:ClTarjeta[]=[];
    searchTarjeta: ClTarjeta[] = [];

  ngOnInit() {
    this.getTarjetas();
  }
  ionViewWillEnter(){
    this.getTarjetas();
  }

  searchTarjetas(event :any){
    const text = event.target.value;
    this.searchTarjeta=this.tarjetas;
    if (text && text.trim() != ''){
      this.searchTarjeta = this.searchTarjeta.filter((producto: any )=>{
        return (producto.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }

  async getTarjetas() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getTarjetas(parseInt(globalData.RUT_CLIENTE, 10))
      .subscribe({
        next: (res) => {
          this.tarjetas = res.registro;
          this.searchTarjeta=this.tarjetas;
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
