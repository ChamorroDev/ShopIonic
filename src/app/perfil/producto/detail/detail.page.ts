import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ClCategoria} from '../../../model/ClCategoria';
import { CategoryServiceService } from '../../categoria/categoria-servicio.service';

import { ClProducto,ResClProducto,ClMarca,ClTipoProductoAtributo,ClAtributo} from '../../../model/ClProducto';
import { ProductoServiceService } from '../producto-servicio.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(
    public restApiCat: CategoryServiceService,
    public restApi: ProductoServiceService,
     public loadingController: LoadingController
    , public alertController: AlertController
    , public route: ActivatedRoute
    , public router: Router
  ) { }
  resClProducto: ResClProducto= new ResClProducto({});
  tipoProductoAtributo: ClTipoProductoAtributo[] = [];
  marca: ClMarca= new ClMarca({});
  producto: ClProducto = new ClProducto({});  
  categorias: ClCategoria[] = [];
  categoriasFiltradas:ClCategoria[] = [];
  fotos: any[] = [];




  
  ngOnInit() {
    this.getProducto();
  }


  
  async getProducto() {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();
    await this.restApi.getProducto(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          this.resClProducto=res;
          this.producto = this.resClProducto.registro.regProducto;
          this.fotos = this.resClProducto.registro.dataFotos;
          this.categorias = this.resClProducto.registro.regCategoriasDetail;
          this.marca = this.resClProducto.registro.regMarcaDetail;
          this.tipoProductoAtributo = this.resClProducto.registro.regTipoProductoAtributoDetail	
          this.categoriasFiltradas = this.categorias.filter(categoria => this.producto.categorias.includes(categoria.id as any));
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss();
        }
      })
  }


  async desactivar(id: number) {
    this.presentAlertConfirm(id, 'Confirme la desactivación, De lo cantrario Cancele');
  }
  async presentAlertConfirm(id: number, msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!', // Título
      message: msg,   // Mensaje
      buttons: [   // Botones
        {
          text: 'Cancelar ',
          handler: () => { 
          }
        },
        {
          text: 'Desactivar ',
          handler: () => { 
            this.deleteConfirmado(id)
          }
        }
      ]
    });
    await alert.present();
  }
 
  async deleteConfirmado(id: number) {
    const alert = await this.alertController.create({
      header: 'Completado', // Título
      message: "Se ha desactivado el producto",   // Mensaje
      buttons: [   // Botones
        {
          text: 'Aceptar ',
          
        }
      ]
    });
    await alert.present();
  }
    

}
