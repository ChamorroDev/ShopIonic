import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { SalidaServicioService } from './salida-servicio.service';

@Component({
  selector: 'app-salida-producto-despacho',
  templateUrl: './salida-producto-despacho.page.html',
  styleUrls: ['./salida-producto-despacho.page.scss'],
})
export class SalidaProductoDespachoPage implements OnInit {
  constructor(
    public restApi: SalidaServicioService,
    public loadingController: LoadingController,

    public router: Router
  ) {}
  public items: any[] = [];
  public filteredItems: any[] = [];
  public selectedBodega: string = 'Todas';

  ngOnInit() {}

  ionViewWillEnter() {
    this.getPedidoParaDespacho();
  }

  filterItems() {
    if (this.selectedBodega === 'Todas') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(
        (item) => item.bodega_info.nombre === this.selectedBodega
      );
    }
  }
  irADetalleConParametros(id: string, tipo: string) {
    this.router.navigate(['/perfil/salida-producto-despacho/detalle/', id], {
      queryParams: { tipo: tipo },
    });
  }

  async getPedidoParaDespacho() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getPedidoParaDespacho().subscribe({
      next: (res) => {
        this.items = res.registro;
        this.filteredItems = this.items;
        console.log(this.items);
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
