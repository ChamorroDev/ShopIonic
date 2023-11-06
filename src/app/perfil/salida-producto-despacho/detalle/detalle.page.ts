import { Component, OnInit } from '@angular/core';
import { SalidaServicioService } from '../salida-servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  id: any;
  tipo: any;
  constructor(
    public restApi: SalidaServicioService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.route.queryParams.subscribe((params) => {
      this.tipo = params['tipo'];
    });
  }
  ionViewWillEnter() {
    this.getProductos();
  }
  producto: any;
  bodegas: any;
  total: any;
  cantidad: number | undefined;
  bodegaId: number | undefined;
  items: any[] = [];
  lista_camioneros: any[] = [];
  selectedEmpleado: any;
  cargar: boolean = false;

  agregarAlCarrito(item: any) {
    this.items.push(item);
  }

  onEmpleadoChange() {
    // Puedes utilizar 'this.selectedEmpleado' para realizar operaciones con el empleado seleccionado
    console.log('Empleado seleccionado:', this.selectedEmpleado);
    // Realiza las operaciones adicionales que necesites aquí
  }

  guardarAlCarrito(bodega: any, producto: any) {
    const item = {
      bodegaId: bodega,
      cantidad: this.cantidad,
      producto: producto,
    };
    this.agregarAlCarrito(item);
    this.cantidad = 0;
    this.bodegaId = 0;
    console.log(this.items);
  }

  recortarTitulo(titulo: string, limite: number): string {
    if (titulo.length > limite) {
      return titulo.substring(0, limite) + '...';
    } else {
      return titulo;
    }
  }

  formatPrice(price: number): string {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  async getProductos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    const data = { tipo_documento: this.tipo };
    await loading.present();
    await this.restApi.getProducto(this.id, data).subscribe({
      next: (res) => {
        this.producto = res.registro.lista_productos;
        this.lista_camioneros = res.registro.lista_camioneros;

        console.log(res);

        loading.dismiss();
        this.cargar = true;
      },
      complete: () => {},
      error: (err) => {
        console.log('Err:' + err);
        loading.dismiss();
      },
    });
  }

  async desactivar() {
    this.presentAlertConfirm();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '¡Mensaje de confirmación!',
      message: '¿Está seguro los productos agregado al despacho?',
      buttons: [
        {
          text: 'Cancelar ',
          handler: () => {},
        },
        {
          text: 'Aceptar ',
          handler: () => {
            this.send_Productos();
          },
        },
      ],
    });
    await alert.present();
  }
  async alertExito() {
    const alert = await this.alertController.create({
      header: '¡Guia creada!',
      message: 'Ya puede ir a retirar productos a bodega para despachar',
      buttons: [
        {
          text: 'Aceptar ',

          handler: () => {
            this.router.navigate(['/perfil/salida-producto-despacho']);
          },
        },
      ],
    });
    await alert.present();
  }

  async send_Productos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    const data = {
      tipo_documento: this.tipo,
      numero: this.id,
      productos: this.items,
      usuario: this.selectedEmpleado,
    };
    await loading.present();
    await this.restApi
      .send_Producto(localStorage.getItem('rut'), data)
      .subscribe({
        next: (res) => {
          this.alertExito();
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
