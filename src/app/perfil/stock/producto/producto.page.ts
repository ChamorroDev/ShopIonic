import { Component, OnInit } from '@angular/core';
import { StockServicioService } from '../stock-servicio.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  constructor(
    public restApi: StockServicioService,
    public loadingController: LoadingController,
    public router: Router
  ) {}

  ngOnInit() {
    this.getProductos();
  }
  ionViewWillEnter() {
    this.getProductos();
  }
  productos: any;
  recortarTitulo(titulo: string, limite: number): string {
    if (titulo.length > limite) {
      return titulo.substring(0, limite) + '...';
    } else {
      return titulo;
    }
  }

  async getProductos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getProductos().subscribe({
      next: (res) => {
        this.productos = res.registro;
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
