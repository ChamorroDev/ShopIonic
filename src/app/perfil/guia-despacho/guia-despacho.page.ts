import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { GuiaDespachoServicioService } from './guia-despacho-servicio.service';

@Component({
  selector: 'app-guia-despacho',
  templateUrl: './guia-despacho.page.html',
  styleUrls: ['./guia-despacho.page.scss'],
})
export class GuiaDespachoPage implements OnInit {
  constructor(
    public restApi: GuiaDespachoServicioService,
    public loadingController: LoadingController,
    public router: Router
  ) {}
  public registros: any[] = [];

  ngOnInit() {}

  ionViewWillEnter() {
    this.getGuias();
  }

  async getGuias() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getGuiasDespacho().subscribe({
      next: (res) => {
        this.registros = res.registro;

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
