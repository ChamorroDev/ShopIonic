import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasServicioService } from '../compras-servicio.service';

@Component({
  selector: 'app-detalle-boleta',
  templateUrl: './detalle-boleta.page.html',
  styleUrls: ['./detalle-boleta.page.scss'],
})
export class DetalleBoletaPage implements OnInit {
  constructor(
    public restApi: ComprasServicioService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCompras();
  }
  ionViewWillEnter() {
    this.getCompras();
  }

  formatPrice(price: number): string {
    return '$ ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  async getCompras() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getBoleta(this.route.snapshot.params['id']).subscribe({
      next: (res) => {
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
