import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';

import { CLCargo,ResCLCargo } from '../../model/CLCargo';
import { CargoServiceService } from './cargo-servicio.service';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.page.html',
  styleUrls: ['./cargo.page.scss'],
})
export class CargoPage implements OnInit {

  constructor(public restApi:CargoServiceService
    , public loadingController: LoadingController
    , public router: Router) { }
    ResCLCargo: ResCLCargo=new ResCLCargo({});
    cargo:CLCargo[]=[];
    searchCargo:CLCargo[]=[];
  ngOnInit() {
    this.getCargos();
  }

  searchCargos(event:any){
    const text = event.target.value;
    this.searchCargo=this.cargo;
    if (text && text.trim()!=''){
      this.searchCargo=this.searchCargo.filter((cargo:any)=>{
        return(cargo.nombre.toLowerCase().indexOf(text.toLowerCase())> -1);
      })
    }
  }

  ionViewWillEnter() {
    this.getCargos();
  }

  async getCargos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getCargos()
      .subscribe({
        next: (res) => {
          this.ResCLCargo=res;
          this.cargo = this.ResCLCargo.registro;
          this.searchCargo=this.cargo;
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
