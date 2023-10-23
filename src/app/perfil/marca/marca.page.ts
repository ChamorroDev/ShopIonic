import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { CLMarca,ResCLMarca } from '../../model/CLMarca';
import { MarcaServiceService } from './marca-servicio.service';




@Component({
  selector: 'app-marca',
  templateUrl: './marca.page.html',
  styleUrls: ['./marca.page.scss'],
})
export class MarcaPage implements OnInit {

  constructor(public restApi: MarcaServiceService
    , public loadingController: LoadingController
    , public router: Router) { }
    ResCLMarca: ResCLMarca=new ResCLMarca({});

    marcas:CLMarca[]=[];
    searchMarca:CLMarca[]=[];


  ngOnInit() {
    this.getMarcas();
  }


  searchMarcas(event:any){
    const text = event.target.value;
    this.searchMarca=this.marcas;
    if (text && text.trim()!=''){
      this.searchMarca=this.searchMarca.filter((marca:any)=>{
        return(marca.nombre.toLowerCase().indexOf(text.toLowerCase())> -1);
      })
    }
  }

  ionViewWillEnter() {
    this.getMarcas();
  }

  async getMarcas() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getMarcas()
      .subscribe({
        next: (res) => {
          this.ResCLMarca=res;
          this.marcas = this.ResCLMarca.registro;
          this.searchMarca=this.marcas;
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
