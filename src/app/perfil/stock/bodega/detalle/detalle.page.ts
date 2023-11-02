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
    this.getBodegas();
  }
  ionViewWillEnter() {
    this.getBodegas();
  }
  productos: any;

  async getBodegas() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi
      .getBodegaDetalle(this.route.snapshot.params['id'])
      .subscribe({
        next: (res) => {
          this.productos = res.registro;
          console.log(res.registro);

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
