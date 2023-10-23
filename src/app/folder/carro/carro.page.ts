import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClCarro,ResClCarro} from '../../model/ClCarro';
import { ClPersonaFactura } from '../../model/ClUsuario';

import { globalData } from 'src/app/constants/user';
import { IonModal } from '@ionic/angular';
import { CarroServicioService } from './carro-servicio.service';
import { ModalController } from '@ionic/angular';
import{  FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.page.html',
  styleUrls: ['./carro.page.scss'],
})
export class CarroPage implements OnInit {
  metodoEntrega: string='Direccion';
  tipoDocumento: string='Boleta';
  rutParte1: string='';
  rutParte2: string='';


  constructor(public restApi: CarroServicioService
    , public loadingController: LoadingController
    ,private modalController: ModalController
    ,private formBuilder: FormBuilder
    , public router: Router) { }

  isLoading: boolean = false;
  productos: ClCarro[] = [];
  resClProducto: ResClCarro= new ResClCarro({});
  mostrarElemento = false;
  mostrarModal: boolean = false; 

    fotos:any;
  total:number=0;
  carro:any[]=[];
  factura:ClPersonaFactura=new ClPersonaFactura({});

  ngOnInit() {
    this.getProductos();
 

  }
  aumentarCantidad(producto: any) {
    producto.cantidad++; 
    this.actualizarTotal();
  }

  disminuirCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--; 
      this.actualizarTotal();

    }
  }
  cambiarDocumento(documento: string) {
    this.tipoDocumento = documento;

  }

  
  async eliminarProducto(id: number) {
    this.productos = this.productos.filter((producto) => producto.id !== id);
    this.actualizarTotal();
    console.log(`Producto eliminado con ID: ${id}`);
  }
  private actualizarTotal() {
    this.total = this.productos.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
  }
  formatPrice(price: number): string {
    return '$ ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  async getProductos() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getCarro(globalData.RUT_CLIENTE)
      .subscribe({
        next: (res) => { 
          this.productos = res.registro.regProducto.map((item: any) => new ClCarro(item));
          this.total = this.productos.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
          this.fotos= res.registro.regFotos;
          loading.dismiss();
          this.mostrarElemento = true;
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();
          this.mostrarElemento = true;

        }
      })
  }

  ionViewWillEnter() {
    this.getProductos();
  }
  separarRut() {
    const rutControl = this.factura.rut;
    if (rutControl) {
   
      const partesRut = rutControl.split('-');
      if (partesRut.length === 2) {
        this.factura.rut= partesRut[0];
        this.factura.dv = partesRut[1];

      } else {
        alert("Reingrese su rut")
      }
    }
  }

  async addcart(opc:number) {
    this.separarRut()

    const postData = {
      productos: this.productos,
      total: this.total,
      cliente: globalData.RUT_CLIENTE,
      documento:this.tipoDocumento,
      envio:this.metodoEntrega,
      personaFactura:this.factura,

      
    };

    await this.restApi.addProductoCart(globalData.RUT_CLIENTE,postData)
      .subscribe({
        next: (res) => {
          if (opc === 1) {
            if (this.metodoEntrega === 'Direccion') {
              this.router.navigate(['/folder/direccion']);
            }
            if (this.metodoEntrega === 'Sucursal') {

              this.router.navigate(['/folder/sucursal']);
            }
          } else {
            this.router.navigate(['/folder']);
          }
        }
        , complete: () => { }
        , error: (err) => { console.log(err); }
      });
    
   
  }

  async limpiarCart() {

    console.log(this.productos)
    await this.restApi.limpiarCart(globalData.RUT_CLIENTE)
      .subscribe({
        next: (res) => {
          this.getProductos();
        }
        , complete: () => { }
        , error: (err) => { console.log(err); }
      });
    
   
  }
}
