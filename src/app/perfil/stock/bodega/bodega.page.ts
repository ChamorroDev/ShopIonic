import { Component, OnInit } from '@angular/core';
import { StockServicioService } from '../stock-servicio.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.page.html',
  styleUrls: ['./bodega.page.scss'],
})
export class BodegaPage implements OnInit {
  constructor(
    public restApi: StockServicioService,
    public loadingController: LoadingController,
    public router: Router
  ) {}

  ngOnInit() {
    this.getBodegas();
  }
  ionViewWillEnter() {
    this.getBodegas();
  }
  bodegas: any;

  async getBodegas() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getBodegas().subscribe({
      next: (res) => {
        this.bodegas = res.registro;

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
