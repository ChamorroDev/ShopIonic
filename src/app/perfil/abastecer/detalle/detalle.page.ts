import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ClProducto,
  ClFoto,
  ResClProducto,
  ClAtributo,
  ClTipoProductoAtributo,
  ClProveedorPrecio,
} from '../../../model/ClProducto';

import { ClCategoria } from '../../../model/ClCategoria';
import { ClBodega } from '../../../model/ClBodega';

import { HttpClient } from '@angular/common/http';
import { AbastecerServicioService } from '../abastecer-servicio.service';
import { AlertController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  constructor(
    public restApi: AbastecerServicioService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    public alertController: AlertController
  ) {}
  producto: ClProducto = new ClProducto({});
  marca_nombre: any;
  precio: string = '';
  proveedorElegido: any;
  bodegaElegido: any;

  categorias: ClCategoria[] = [];
  atributos: ClTipoProductoAtributo[] = [];
  dataFotos: ClFoto = new ClFoto({});
  proveedor: ClProveedorPrecio[] = [];
  cantidad: number = 0;
  bodegas: ClBodega[] = [];
  ngOnInit() {
    this.getProductos();
  }
  ionViewWillEnter() {
    this.getProductos();
  }
  formatPrice(price: number): string {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  onProviderClicked(prov: any) {
    this.cantidad = 0;
    prov.selected = !prov.selected;
    if (this.proveedorElegido && this.proveedorElegido !== prov) {
      this.proveedorElegido.selected = false;
    }
    this.proveedorElegido = prov;
    console.log(this.proveedorElegido);
  }
  onBodegaClicked(bod: any) {
    bod.selected = !bod.selected;
    if (this.bodegaElegido && this.bodegaElegido !== bod) {
      this.bodegaElegido.selected = false;
    }
    this.bodegaElegido = bod;
    console.log(this.bodegaElegido);
  }

  incrementarCantidad() {
    this.cantidad++;
  }

  decrementarCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }
  compareByPrice(a: any, b: any) {
    if (a.precio > b.precio) {
      return 1;
    }
    if (a.precio < b.precio) {
      return -1;
    }
    return 0;
  }

  async getProductos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getProducto(this.route.snapshot.params['id']).subscribe({
      next: (res) => {
        this.producto = res.registro.producto;
        this.precio = this.formatPrice(this.producto.precio);
        this.marca_nombre = res.registro.marca_nombre;
        this.categorias = res.registro.categorias;
        this.atributos = res.registro.atributos;
        this.dataFotos = res.registro.dataFotos[0];
        this.proveedor = res.registro.proveedor;
        this.bodegas = res.registro.bodegas;

        this.proveedor.sort(this.compareByPrice);
        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        console.log('Err:' + err);
        loading.dismiss();
      },
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate([
              '/perfil/abastecer/detalle/',
              this.route.snapshot.params['id'],
            ]);
          },
        },
      ],
    });

    await alert.present();
  }

  async onFormSubmit() {
    const data = {
      proveedor: this.proveedorElegido,
      cantidad: this.cantidad,
      user: localStorage.getItem('rut'),
      producto: this.producto,
      bodega: this.bodegaElegido,
    };
    await this.restApi.abastecerProducto(data).subscribe({
      next: (res: any) => {
        this.presentAlert(
          'Pedido creado',
          '¡Gerente debe confirmar el pedido!'
        );
      },

      complete: () => {},
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
