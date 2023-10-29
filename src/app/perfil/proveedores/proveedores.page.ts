import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';

import { ClProveedor,ResClProveedor } from '../../model/ClProveedor';
import { ProveedorServiceService } from './proveedores-servicio.service';
import { ClProducto } from 'src/app/model/ClProducto';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit { 

  constructor(public restApi:ProveedorServiceService
    , public loadingController: LoadingController
    , public router: Router) { }
    
    ResClProveedor: ResClProveedor = new  ResClProveedor({});
    proveedor:ClProveedor[]=[];
    searchProveedor:ClProveedor[]=[];

  ngOnInit() {
    this.getProveedores();
  }


  searchProveedores(event:any){
    const text = event.target.value;
    this.searchProveedor=this.proveedor;
    if (text && text.trim()!=''){
      this.searchProveedor=this.searchProveedor.filter((cargo:any)=>{
        return(cargo.nombre.toLowerCase().indexOf(text.toLowerCase())> -1);
      })
    }
  }
  ionViewWillEnter() {
    this.getProveedores();
  }






  async getProveedores() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getProveedores()
      .subscribe({
        next: (res) => {
          this.ResClProveedor=res;
          this.proveedor = this.ResClProveedor.registro;
          this.searchProveedor=this.proveedor;

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
