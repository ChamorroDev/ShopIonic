import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { AtributoServiceService } from './atributo-servicio.service';
import { ClAtributo,ResClAtributo } from '../../model/ClAtributo';

@Component({
  selector: 'app-atributo',
  templateUrl: './atributo.page.html',
  styleUrls: ['./atributo.page.scss'],
})
export class AtributoPage implements OnInit {

  constructor(public restApi: AtributoServiceService
    , public loadingController: LoadingController
    , public router: Router) { }
    ResCLAtributo: ResClAtributo=new ResClAtributo({});

    atributos:ClAtributo[]=[];
  searchAtributo:ClAtributo[]=[];

  ngOnInit() {
    this.getAtributos();
  }

  searchAtributos(event:any){
    const text = event.target.value;
    this.searchAtributo=this.atributos;
    if (text && text.trim()!= ''){
      this.searchAtributo = this.searchAtributo.filter((atributo:any)=>{
        return(atributo.nombre.toLowerCase().indexOf(text.toLowerCase())> -1);
      })
    }
  }

  ionViewWillEnter() {
    this.getAtributos();
  }

  async getAtributos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getAtributos()
      .subscribe({
        next: (res) => {
          this.ResCLAtributo=res;
          this.atributos = this.ResCLAtributo.registro;
          this.searchAtributo=this.atributos;
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
