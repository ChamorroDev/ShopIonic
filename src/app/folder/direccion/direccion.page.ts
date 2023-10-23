import { Component, OnInit } from '@angular/core';
import { DireccionServicioService } from '../../perfil/direcciones/direccion-servicio.service';
import { CarroServicioService } from '../carro/carro-servicio.service';

import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClDireccion,ResClDireccion} from '../../model/ClDireccion';
import { globalData } from 'src/app/constants/user';


@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {

  constructor(
    public restApi: DireccionServicioService,
    public restApiCarro: CarroServicioService
  , public loadingController: LoadingController
  , public router: Router) {
    
   }
   resClDireccion: ResClDireccion= new ResClDireccion({});
   direcciones:ClDireccion[]=[];
   direccionSeleccionada:any;
  ngOnInit() {
    this.getDirecciones();
  }
  async getDirecciones() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getDirecciones(parseInt(globalData.RUT_CLIENTE, 10))
      .subscribe({
        next: (res) => { 
          this.resClDireccion =res;
          this.direcciones =res.registro;
          console.log(this.direcciones)

          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }
  async guardarDireccion() {
    const postData = {
      rut: globalData.RUT_CLIENTE,
      Direccion_id:this.direccionSeleccionada.id,
    };
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApiCarro.guardarDireccion(postData)
      .subscribe({
        next: () => { 
          
          loading.dismiss();
          this.router.navigate(['/folder/forma-pagar']);

        }
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }

}
