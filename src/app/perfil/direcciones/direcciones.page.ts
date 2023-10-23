import { Component, OnInit } from '@angular/core';
import { ClDireccion,ResClDireccion } from "../../model/ClDireccion";
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { DireccionServicioService } from './direccion-servicio.service';
import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {  public alertButtons = ['OK'];

constructor(public restApi: DireccionServicioService
  , public loadingController: LoadingController
  , public router: Router) { }

  resClDireccion: ResClDireccion=new ResClDireccion({});

  direcciones:ClDireccion[]=[];


  ngOnInit() {
    this.getDirecciones();
  }

  async getDirecciones() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    console.log(globalData.RUT_CLIENTE)
    await this.restApi.getDirecciones(parseInt(globalData.RUT_CLIENTE, 10))
      .subscribe({
        next: (res) => {
          this.resClDireccion=res;
          this.direcciones = this.resClDireccion.registro;
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
