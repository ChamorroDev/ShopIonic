import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import {
  ClProducto,
  ResClProducto,
  ClMarca,
  ClTipoProductoAtributo,
  ClAtributo,
} from '../model/ClProducto';
import { ClCategoria } from '../model/ClCategoria';
import { ProductoServiceService } from '../perfil/producto/producto-servicio.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarroServicioService } from './carro/carro-servicio.service';
import { globalData } from 'src/app/constants/user';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public alertButtons = ['OK'];
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(
    public restApi: ProductoServiceService,
    public loadingController: LoadingController,
    public restApiCarro: CarroServicioService,
    public router: Router,
    private navCtrl: NavController,
    private modalController: ModalController,
    public alertController: AlertController
  ) {}

  resClCategoria: ResClProducto = new ResClProducto({});
  productoModel: ClProducto = new ClProducto({});
  productos: ClProducto[] = [];
  searchProducto: ClProducto[] = [];
  resClProducto: ResClProducto = new ResClProducto({});
  marca: ClMarca = new ClMarca({});
  marcas: any[] = [];
  tipoProductoAtributo: ClTipoProductoAtributo[] = [];
  listaAtributos: ClAtributo[] = [];
  atributosArray: { nombreAtributo: string; valorAtributo: string }[] = [];
  categoriasProducto: any[] = [];
  categorias: ClCategoria[] = [];
  producto: ClProducto = new ClProducto({});
  mostrarElemento: boolean = false;
  filterTerm: any;
  ngOnInit() {
    this.getProductos();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  formatPrice(price: number): string {
    return '$ ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  searchProductos(event: any) {
    const text = event.target.value;
    this.searchProducto = this.productos;
    if (text && text.trim() != '') {
      this.searchProducto = this.searchProducto.filter((producto: any) => {
        return producto.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
    }
  }
  productoCarro: { cliente: string; producto: number; cantidad: number } = {
    cliente: '',
    producto: 0,
    cantidad: 0,
  };
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No hay suficiente stock',
      message: 'Lo sentimos, no hay suficiente stock para este producto.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async addcart(id: number) {
    this.productoCarro.cliente = globalData.RUT_CLIENTE;
    this.productoCarro.producto = id;
    this.productoCarro.cantidad = 1;

    await this.restApiCarro.addProducto(this.productoCarro).subscribe({
      next: (res) => {
        console.log(res);
        if (res.msg === 'no stock') {
          this.presentAlert();
        }
        //this.router.navigate(['/folder/carro']);
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
      },
    });
  }
  async getProductos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getProductos().subscribe({
      next: (res) => {
        this.resClProducto = res;
        this.productos = res.registro.regProducto.map(
          (item: any) => new ClProducto(item)
        );

        this.searchProducto = this.productos;
        loading.dismiss();
        this.mostrarElemento = true;
        console.log(res);
      },
      complete: () => {},
      error: (err) => {
        loading.dismiss();
        this.mostrarElemento = true;
      },
    });
  }
}
