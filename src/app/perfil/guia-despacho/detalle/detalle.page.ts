import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { GuiaDespachoServicioService } from '../guia-despacho-servicio.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  constructor(
    public restApi: GuiaDespachoServicioService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  info: any;
  guia: any;
  cargar: boolean = false;

  ngOnInit() {}

  ionViewWillEnter() {
    this.getGuiaDespacho(this.route.snapshot.params['id']);
  }

  async getGuiaDespacho(id: number) {
    const loading = await this.loadingController.create({
      message: 'loading...',
    });
    await loading.present();
    await this.restApi.getGuiaDespacho(id).subscribe({
      next: (data) => {
        console.log(data);

        this.info = data.registro.detalle;
        this.guia = data.registro.guia;

        loading.dismiss();
        this.cargar = true;
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
        loading.dismiss();
      },
    });
  }
}
