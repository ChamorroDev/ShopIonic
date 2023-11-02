import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionStockServiceService } from '../gestion-stock-service.service';
import { globalData } from 'src/app/constants/user';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-entrada-producto',
  templateUrl: './entrada-producto.page.html',
  styleUrls: ['./entrada-producto.page.scss'],
})
export class EntradaProductoPage implements OnInit {
  constructor(
    public restApi: GestionStockServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.getPedidos();
  }
  ionViewWillEnter() {
    this.getPedidos();
  }
  estados: string[] = [
    'Pedido recibido',
    'Cancelado',
    'Espera del Proveedor',
    'Entrega del proveedor parcial',
  ];
  pedido: any;
  cantidadRecibida: any;

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
      header: '¿Está seguro de la cantidad de producto ingresada?',
      message: msg,
      buttons: [
        {
          text: 'Cancelar ',
          handler: () => {},
        },
        {
          text: 'Aceptar cambios ',
          handler: () => {
            this.saveCambios();
          },
        },
      ],
    });
    await alert.present();
  }
  async presentAlertCorrecta() {
    const alert = await this.alertController.create({
      header: 'Todo Correcto',
      message: 'Se ha aceptado todos los productos correctamente',
      buttons: [
        {
          text: 'Aceptar ',
          handler: () => {
            this.router.navigate(['/perfil/gestion-stock/']);
          },
        },
      ],
    });
    await alert.present();
  }
  async saveCambios() {
    const data = {
      id: this.pedido.id,
      cantidad: this.cantidadRecibida,
      estado: this.pedido.estado_nombre,
    };
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.savePedido(this.pedido.id, data).subscribe({
      next: (data) => {
        loading.dismiss();
        this.presentAlertCorrecta();
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
        loading.dismiss();
      },
    });
  }
}
