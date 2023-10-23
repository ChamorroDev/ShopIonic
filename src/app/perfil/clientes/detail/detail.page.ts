import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClUsuario,ClCliente } from '../../../model/ClUsuario';
import { LoadingController } from '@ionic/angular';
import {  Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ClientesServicioService } from '../clientes-servicio.service';
import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  cliente:ClCliente = new ClCliente({});


  constructor(public restApi: ClientesServicioService
    , public loadingController: LoadingController
    , public router: Router,
    private navCtrl: NavController ) {}


  ngOnInit() {
    this.getCliente();
  }

  async getCliente() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getCliente(globalData.RUT_CLIENTE)
      .subscribe({
        next: (res) => { 
          this.cliente = res.registro;
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
