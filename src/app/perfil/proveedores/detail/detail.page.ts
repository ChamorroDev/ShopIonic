import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { ClProveedor, ResClProveedor } from '../../../model/ClProveedor';
import { ClBodega } from '../../../model/ClBodega';

import { ProveedorServiceService } from '../proveedores-servicio.service';
import { ClProducto } from 'src/app/model/ClProducto';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  constructor(
    public restApi: ProveedorServiceService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.getProveedor(this.route.snapshot.params['id']);
  }
  ionViewWillEnter() {
    this.getProveedor(this.route.snapshot.params['id']);
  }

  resClProveedor: ResClProveedor = new ResClProveedor({});
  proveedor: ClProveedor = {
    id: 1,
    rut: '',
    nombre: '',
    created: new Date(),
    edited: new Date(),
    actived: 1,
    dv: '',
    email: '',
    telefono: '',
  };
  bodegas: ClBodega[] = [];
  productos: ClProducto[] = [];

  async getProveedor(id: number) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getProveedor(id + '').subscribe({
      next: (data) => {
        this.proveedor = data.registro.proveedor;
        this.bodegas = data.registro.bodegas;
        this.productos = data.registro.productos;

        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
        loading.dismiss();
      },
    });
  }
}
