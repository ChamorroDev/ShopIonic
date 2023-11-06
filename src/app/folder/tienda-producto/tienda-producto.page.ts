import { Component, OnInit } from '@angular/core';
import {
  ClProducto,
  ResClProducto,
  ClMarca,
  ClTipoProductoAtributo,
  ClAtributo,
} from '../../model/ClProducto';
import { ClCategoria } from '../../model/ClCategoria';
import { ProductoServiceService } from '../../perfil/producto/producto-servicio.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClCarro, ResClCarro } from '../../model/ClCarro';
import { CarroServicioService } from '../carro/carro-servicio.service';
import { globalData } from 'src/app/constants/user';
import Swiper from 'swiper';
@Component({
  selector: 'app-tienda-producto',
  templateUrl: './tienda-producto.page.html',
  styleUrls: ['./tienda-producto.page.scss'],
})
export class TiendaProductoPage implements OnInit {
  constructor(
    public restApi: ProductoServiceService,
    public restApiCarro: CarroServicioService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    private navCtrl: NavController,
    private modalController: ModalController
  ) {}
  resClProducto: ResClProducto = new ResClProducto({});
  marca: ClMarca = new ClMarca({});
  marcas: any[] = [];
  tipoProductoAtributo: ClTipoProductoAtributo[] = [];
  listaAtributos: ClAtributo[] = [];
  atributosArray: { nombreAtributo: string; valorAtributo: string }[] = [];

  categoriasProducto: any[] = [];
  categorias: ClCategoria[] = [];

  producto: ClProducto = new ClProducto({});
  id: any = '';
  aux: number = 0;
  isLoading: boolean = true;
  productoCarro: { cliente: string; producto: number; cantidad: number } = {
    cliente: '',
    producto: 0,
    cantidad: 0,
  };

  cat: any[] = [];
  categoriasSeleccionadasOriginales: number[] = [];

  fotos: any;
  mySwiper: Swiper | undefined;
  ngOnInit() {
    this.isLoading = true;
    this.mySwiper = new Swiper('.swiper-container', {});
    this.getProducto(this.route.snapshot.params['id']).then(() => {});
  }

  swiperConfig: any = {
    direction: 'horizontal',
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  formatPrice(price: number): string {
    return '$ ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  quantity: number = 1;
  closeModal() {
    this.modalController.dismiss();
  }
  decrementValue() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  incrementValue() {
    this.quantity++;
  }
  async addcart() {
    this.productoCarro.cliente = globalData.RUT_CLIENTE;
    this.productoCarro.producto = this.producto.id;
    this.productoCarro.cantidad = this.quantity;

    await this.restApiCarro.addProducto(this.productoCarro).subscribe({
      next: (res) => {
        this.router.navigate(['/folder/']);
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
      },
    });
  }
  async getProducto(id: number) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getProducto(id + '').subscribe({
      next: (data) => {
        this.resClProducto = data;
        this.producto = this.resClProducto.registro.regProducto;
        this.marca = this.resClProducto.registro.regMarcaDetail;
        this.marcas = this.resClProducto.registro.regMarcaList;
        this.fotos = this.resClProducto.registro.dataFotos;
        console.log(this.fotos);
        this.categorias = this.resClProducto.registro.regCategoriasList;
        this.tipoProductoAtributo =
          this.resClProducto.registro.regTipoProductoAtributoDetail;
        this.listaAtributos = this.resClProducto.registro.regAtributoList;
        for (const atributo of this.tipoProductoAtributo) {
          this.atributosArray.push({
            nombreAtributo: atributo.atributo_nombre,
            valorAtributo: atributo.atributo_valor,
          });
        }
        this.categoriasProducto = this.categorias.filter((categoria) =>
          this.producto.categorias.includes(categoria.id as any)
        );
        this.isLoading = false;
        console.log(data);

        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
        this.isLoading = false;

        loading.dismiss();
      },
    });
  }
}
