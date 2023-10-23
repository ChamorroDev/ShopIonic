import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClSucursal,ResClSucursal} from '../../model/ClSucursal';
import { SucursalServicioService } from './sucursal-servicio.service';



@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.page.html',
  styleUrls: ['./sucursal.page.scss'],
})
export class SucursalPage implements OnInit {public alertButtons = ['OK'];

  constructor(public restApi: SucursalServicioService
  , public loadingController: LoadingController
  , public router: Router) { }
  resClSucursal: ResClSucursal= new ResClSucursal({});

  sucursales: ClSucursal[] = [];
  searchSucursal: ClSucursal[] = [];

  ngOnInit() {
    this.getSucursales();
  }
  ionViewWillEnter() {
    this.getSucursales();
  }

  searchSucursales(event :any){
    const text = event.target.value;
    this.searchSucursal=this.sucursales;
    if (text && text.trim() != ''){
      this.searchSucursal = this.searchSucursal.filter((sucursales: any )=>{
        return (sucursales.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1); 
      })
    }
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

          this.searchSucursal=this.sucursales;

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

