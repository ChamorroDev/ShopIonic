import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClProducto,ResClProducto} from '../../model/ClProducto';
import { HttpClient } from '@angular/common/http';
import { ProductoServiceService } from './producto-servicio.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})

export class ProductoPage implements OnInit {public alertButtons = ['OK'];

constructor(public restApi: ProductoServiceService
  , public loadingController: LoadingController
  , public router: Router
  , private http: HttpClient
  ) { }
  productos: ClProducto[] = [];
  searchProducto: ClProducto[] = [];
  resClProducto: ResClProducto= new ResClProducto({});
  ngOnInit() {
    this.getProductos();
  }
  ionViewWillEnter() {
    this.getProductos();
  }
  searchProductos(event :any){
    const text = event.target.value;
    this.searchProducto=this.productos;
    if (text && text.trim() != ''){
      this.searchProducto = this.searchProducto.filter((producto: any )=>{
        return (producto.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1); 
      })
    }
  }

  async getProductos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getProductos()
      .subscribe({
        next: (res) => { 
          this.resClProducto =res;
          this.productos = res.registro.regProducto.map((item: any) => new ClProducto(item));
          this.searchProducto=this.productos;
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
