import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ClSucursal} from '../../../model/ClSucursal';
import { SucursalServicioService } from '../sucursal-servicio.service';
import { ClCiudad } from '../../../model/ClCiudad';
import { ClRegion } from '../../../model/ClRegion';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  constructor(
    public restApi: SucursalServicioService
    , public loadingController: LoadingController
    , public alertController: AlertController
    , public route: ActivatedRoute
    , public router: Router
  ) { }
  ciudad: ClCiudad = new ClCiudad({});
  sucursal: ClSucursal = new ClSucursal({});
  ngOnInit() {
  
    this.getSucursal()
  }


  async getSucursal() {
    const loading = await this.loadingController.create({ message: 'Loading...' });
    await loading.present();
    await this.restApi.getSucursal(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          this.sucursal = res.registro.regSucursalList;
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss(); 
        }
      })
  }



}

