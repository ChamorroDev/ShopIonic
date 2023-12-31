import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasServicioService } from '../compras-servicio.service';
import { ClCompra, ClDetalleCompra } from '../../../model/ClCompra';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.page.html',
  styleUrls: ['./detalle-factura.page.scss'],
})
export class DetalleFacturaPage implements OnInit {
  constructor(
    public restApi: ComprasServicioService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  compra: ClCompra = new ClCompra({});
  detallecompra: ClDetalleCompra[] = [];

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
    await this.restApi.getFactura(this.route.snapshot.params['id']).subscribe({
      next: (res) => {
        console.log(res.registro);
        this.compra = res.registro.Factura;
        this.detallecompra = res.registro.FacturaDetalle;
        console.log(this.detallecompra);

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
