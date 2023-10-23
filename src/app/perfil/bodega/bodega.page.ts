import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { ClBodega,ResCLBodega } from '../../model/ClBodega';
import { BodegaServiceService } from './bodega-servicio.service';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.page.html',
  styleUrls: ['./bodega.page.scss'],
})
export class BodegaPage implements OnInit {

  constructor(public restApi: BodegaServiceService
    , public loadingController: LoadingController
    , public router: Router) { }
    ResCLBodega: ResCLBodega=new ResCLBodega({});

  bodegas:ClBodega[]=[];
  searchBodega:ClBodega[]=[];

  ngOnInit() {
    this.getBodegas();
  }

  searchBodegas(event:any){
    const text = event.target.value;
    this.searchBodega=this.bodegas;
    if (text && text.trim()!= ''){
      this.searchBodega = this.searchBodega.filter((bodega:any)=>{
        return(bodega.nombre.toLowerCase().indexOf(text.toLowerCase())> -1);
      })
    }
  }

  ionViewWillEnter(){
    this.getBodegas();
  }

  async getBodegas() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getBodegas()
      .subscribe({
        next: (res) => {
          this.ResCLBodega=res;

          this.bodegas = this.ResCLBodega.registro.regBodegaList;
          this.searchBodega=this.bodegas;
          console.log(this.searchBodega);

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
