import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { CLGenero,ResCLGenero } from '../../model/CLGenero';
import { GeneroServiceService } from './genero-servicio.service';


@Component({
  selector: 'app-genero',
  templateUrl: './genero.page.html',
  styleUrls: ['./genero.page.scss'],
})
export class GeneroPage implements OnInit {

  constructor(public restApi: GeneroServiceService
    , public loadingController: LoadingController
    , public router: Router) { }
    ResCLGenero: ResCLGenero=new ResCLGenero({});

  generos:CLGenero[]=[];
  searchGenero:CLGenero[]=[];

  ngOnInit() {
    this.getGeneros();
  }

  searchGeneros(event:any){
    const text = event.target.value;
    this.searchGenero=this.generos;
    if (text && text.trim()!= ''){
      this.searchGenero = this.searchGenero.filter((genero:any)=>{
        return(genero.name.toLowerCase().indexOf(text.toLowerCase())> -1);
      })
    }
  }

  ionViewWillEnter() {
    this.getGeneros();
  }

  async getGeneros() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getGeneros()
      .subscribe({
        next: (res) => {
          this.ResCLGenero=res;
          this.generos = this.ResCLGenero.registro;
          this.searchGenero=this.generos;
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
