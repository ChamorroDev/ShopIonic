import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClCategoria,ResClCategoria} from '../../model/ClCategoria';
import { CategoryServiceService } from './categoria-servicio.service';



@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {public alertButtons = ['OK'];

  constructor(public restApi: CategoryServiceService
  , public loadingController: LoadingController
  , public router: Router) { }
  resClCategoria: ResClCategoria= new ResClCategoria({});

  categorias: ClCategoria[] = [];
  searchCategoria: ClCategoria[] = [];

  ngOnInit() {
    this.getCategorias();
  }

  searchCategorias(event :any){
    const text = event.target.value;
    this.searchCategoria=this.categorias;
    if (text && text.trim() != ''){
      this.searchCategoria = this.searchCategoria.filter((categoria: any )=>{
        return (categoria.name.toLowerCase().indexOf(text.toLowerCase()) > -1); 
      })
    }
  }
  ionViewWillEnter() {
    this.getCategorias();
  }

  async getCategorias() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getCategorias()
      .subscribe({
        next: (res) => { 
          this.resClCategoria=res;
          this.categorias = this.resClCategoria.registro;
          this.searchCategoria=this.categorias;
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
