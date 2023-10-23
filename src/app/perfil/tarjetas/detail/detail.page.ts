import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { ClTarjeta, ResClTarjeta } from '../../../model/ClTarjeta';
import { TarjetaServiceService } from '../tarjetas-servicio.service';




@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(public restApi: TarjetaServiceService,
    public loadingController: LoadingController
   , public alertController: AlertController
   , public route: ActivatedRoute
   , public router: Router) { }

    tarjeta:ClTarjeta = new ClTarjeta({});
  ngOnInit() {
    this.getTarjeta();
  }

  async getTarjeta(){
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();
    await this.restApi.getTarjeta(this.route.snapshot.paramMap.get('id')!)
    .subscribe({
      next:(res) => {
        this.tarjeta=res.registro;
        loading.dismiss();
      }
      ,complete:()=>{}
      ,error:(err)=>{
        loading.dismiss();
      }
    })
  }
}
