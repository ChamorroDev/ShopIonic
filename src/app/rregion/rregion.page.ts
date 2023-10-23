import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClRegion,ResClRegion} from '../model/ClRegion';
import { RregionServicioService } from './rregion-servicio.service';

@Component({
  selector: 'app-rregion',
  templateUrl: './rregion.page.html',
  styleUrls: ['./rregion.page.scss'],
})


export class RregionPage implements OnInit {public alertButtons = ['OK'];

  constructor(public restApi: RregionServicioService
  , public loadingController: LoadingController
  , public router: Router) { }
  resClRegion: ResClRegion= new ResClRegion({});
 
  sucursales: ClRegion[] = [];
  searchSucursal: ClRegion[] = [];

  ngOnInit() {
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
          this.resClRegion=res;
          this.sucursales = this.resClRegion.registro;
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


