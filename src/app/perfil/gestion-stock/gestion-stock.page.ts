import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionStockServiceService } from './gestion-stock-service.service';
import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-gestion-stock',
  templateUrl: './gestion-stock.page.html',
  styleUrls: ['./gestion-stock.page.scss'],
})
export class GestionStockPage implements OnInit {
  constructor(
    public restApi: GestionStockServiceService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.getPedidos();
  }

  bodegas: string[] = [];
  pedidos: any;
  estadoFiltrado: string = '';
  bodegaFiltrada: any;

  formatPrice(price: number): string {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  ionViewWillEnter() {
    this.getPedidos();
  }

  async getPedidos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getPedidos().subscribe({
      next: (data) => {
        console.log(data);
        this.pedidos = data.registro.pedidos;
        this.pedidos.forEach((pedido: any) => {
          if (!this.bodegas.includes(pedido.bodega_info.nombre)) {
            this.bodegas.push(pedido.bodega_info.nombre);
          }
        });
        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
        loading.dismiss();
      },
    });
  }

  filtrarPedidosPorBodega(): any[] {
    if (!this.bodegaFiltrada || this.bodegaFiltrada === 'Todas las bodegas') {
      return this.pedidos;
    } else {
      const bodegaFiltradaLowerCase =
        typeof this.bodegaFiltrada === 'string'
          ? this.bodegaFiltrada.toLowerCase()
          : this.bodegaFiltrada;
      return this.pedidos.filter((pedido: { bodega_info: any }) => {
        if (pedido.bodega_info && pedido.bodega_info.nombre) {
          const nombreBodegaLowerCase = pedido.bodega_info.nombre.toLowerCase();
          return nombreBodegaLowerCase === bodegaFiltradaLowerCase;
        }
        return false;
      });
    }
  }
}
