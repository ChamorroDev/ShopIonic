import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosProveedorServicioService } from './pedidos-proveedor-servicio.service';
import { ClTarjeta } from '../../model/ClTarjeta';
import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-pedidos-proveedor',
  templateUrl: './pedidos-proveedor.page.html',
  styleUrls: ['./pedidos-proveedor.page.scss'],
})
export class PedidosProveedorPage implements OnInit {
  constructor(
    public restApi: PedidosProveedorServicioService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.getPedidos();
  }

  estados: string[] = [];
  pedidos: any;
  estadoFiltrado: string = '';
  pedidosFiltrados: any;

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
        this.pedidosFiltrados = this.pedidos;
        this.pedidos.forEach((pedido: { estado_nombre: string }) => {
          if (!this.estados.includes(pedido.estado_nombre)) {
            this.estados.push(pedido.estado_nombre);
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

  filtrarPedidosPorEstado(): any[] {
    if (!this.estadoFiltrado || this.estadoFiltrado === 'Todos') {
      return this.pedidos;
    } else {
      return this.pedidos.filter(
        (pedido: { estado_nombre: string }) =>
          pedido.estado_nombre.toLowerCase() ===
          this.estadoFiltrado.toLowerCase()
      );
    }
  }
}
