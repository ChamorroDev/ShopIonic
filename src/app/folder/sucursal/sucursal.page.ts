import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClSucursal,ResClSucursal} from '../../model/ClSucursal';
import { ClRegion} from '../../model/ClRegion';
import { ClCiudad} from '../../model/ClCiudad';

import { SucursalServicioService } from '../../perfil/sucursal/sucursal-servicio.service';
import { CarroServicioService } from '../carro/carro-servicio.service';

import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.page.html',
  styleUrls: ['./sucursal.page.scss'],
})
export class SucursalPage implements OnInit {
  constructor(public restApi: SucursalServicioService,
      public restApiCarro: CarroServicioService
    , public loadingController: LoadingController
    , public router: Router) { }
    sucursalSeleccionada: any; 
    regionSeleccionada: number=0;
    ciudadSeleccionada: number=0;
    resClSucursal: ResClSucursal= new ResClSucursal({});
    ciudades: ClCiudad[] = [];
    regiones: ClRegion[] = [];
  
    sucursales: ClSucursal[] = [];
    searchSucursal: ClSucursal[] = [];

    ciudadesFiltradas: ClCiudad[] = [];
    sucursalesFiltradas: ClSucursal[] = [];


  ngOnInit() {
    this.getSucursales();
  }
  filtrarCiudades() {
    this.ciudadesFiltradas = this.ciudades.filter(ciudad => ciudad.region === this.regionSeleccionada);
    this.ciudadSeleccionada = 0;
    this.filtrarSucursales();
  }

  filtrarSucursales() {
   
    this.sucursalesFiltradas = this.sucursales.filter(sucursal => sucursal.ciudad === this.ciudadSeleccionada);
  }

  async getSucursales() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getSucursales()
      .subscribe({
        next: (res) => { 
          this.resClSucursal =res;
          this.sucursales = this.resClSucursal.registro.regSucursalList;
          this.regiones = this.resClSucursal.registro.regRegionList;
          this.ciudades = this.resClSucursal.registro.regCiudadesList;

          this.searchSucursal=this.sucursales;
          console.log(this.sucursales)

          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }

  async addSucursal() {
    const postData = {
      rut:parseInt(globalData.RUT_CLIENTE, 10),
      sucursal:this.ciudadSeleccionada
    };

    await this.restApiCarro.addSucursal(postData)
      .subscribe({
        next: (res) => {
              this.router.navigate(['/folder/retirador']);
        }
        , complete: () => { }
        , error: (err) => { console.log(err); }
      });
    
   
  }

  
}
