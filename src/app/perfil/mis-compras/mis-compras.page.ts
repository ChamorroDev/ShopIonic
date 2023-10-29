import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasServicioService } from './compras-servicio.service';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.page.html',
  styleUrls: ['./mis-compras.page.scss'],
})
export class MisComprasPage implements OnInit {
  constructor(
    public restApi: ComprasServicioService,
    public loadingController: LoadingController,
    public router: Router
  ) {}
  rut: string | null = localStorage.getItem('rut');
  lista_compras: any;
  ngOnInit() {
    this.getCompras();
  }

  ionViewWillEnter() {
    this.getCompras();
  }

  formatPrice(price: number): string {
    return '$ ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  obtenerRutaDetalle(compra: any) {
    if (compra.Tipo === 'Factura') {
      return ['/perfil/mis-compras/detalle-factura', compra.id];
    } else if (compra.Tipo === 'Boleta') {
      return ['/perfil/mis-compras/detalle-boleta', compra.id];
    }
    return ['/otra-ruta', compra.id];
  }
  async getCompras() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getCompras(this.rut).subscribe({
      next: (res) => {
        this.lista_compras = res.registro;
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
