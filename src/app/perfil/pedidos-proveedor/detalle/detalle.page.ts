import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosProveedorServicioService } from '../pedidos-proveedor-servicio.service';
import { globalData } from 'src/app/constants/user';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  constructor(
    public restApi: PedidosProveedorServicioService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.getPedidos();
  }
  estados: string[] = ['Por confirmar', 'Confirmar pedido', 'Cancelar pedido'];
  pedido: any;

  formatPrice(price: number): string {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  async getPedidos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getPedido(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        console.log(data);
        this.pedido = data.registro.pedidos;
        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
        loading.dismiss();
      },
    });
  }

  async desactivar() {
    this.presentAlertConfirm('Confirme los cambios, de lo cantrario Cancele');
  }
  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      message: msg,
      buttons: [
        {
          text: 'Cancelar ',
          handler: () => {},
        },
        {
          text: 'Aceptar cambios ',
          handler: () => {
            this.onFormSubmit();
          },
        },
      ],
    });
    await alert.present();
  }

  async onFormSubmit() {
    const data = {
      id: this.pedido.id,
      obs: this.pedido.obs,
      estado: this.pedido.estado_nombre,
    };
    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();
    await this.restApi.savePedido(this.pedido.id, data).subscribe({
      next: (res) => {
        loading.dismiss();
        if (res == null) {
          return;
        }

        this.router.navigate(['/perfil/pedidos-proveedor/']);
      },
      complete: () => {},
      error: (err) => {
        loading.dismiss();
      },
    });
  }
}
