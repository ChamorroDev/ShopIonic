import { Component, OnInit } from '@angular/core';
import { StockServicioService } from '../../stock-servicio.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  constructor(
    public restApi: StockServicioService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getProductos();
  }
  ionViewWillEnter() {
    this.getProductos();
  }
  producto: any;
  bodegas: any;
  total: any;
  recortarTitulo(titulo: string, limite: number): string {
    if (titulo.length > limite) {
      return titulo.substring(0, limite) + '...';
    } else {
      return titulo;
    }
  }

  formatPrice(price: number): string {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  async getProductos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getProducto(this.route.snapshot.params['id']).subscribe({
      next: (res) => {
        this.producto = res.registro.producto;
        this.bodegas = res.registro.bodegas;
        this.total = res.registro.total_en_bodegas;

        console.log(res);

        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        console.log('Err:' + err);
        loading.dismiss();
      },
    });
  }
}
