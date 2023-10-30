import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ProductoServiceService } from '../../producto/producto-servicio.service';
import { ProveedorServiceService } from '../proveedores-servicio.service';

import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClProducto } from '../../../model/ClProducto';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.page.html',
  styleUrls: ['./add-producto.page.scss'],
})
export class AddProductoPage implements OnInit {
  proveedorForm!: FormGroup;
  productos: ClProducto[] = [];
  productoSelect: any;

  id: any = this.route.snapshot.params['id'];
  precio: any = 0;

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: ProductoServiceService,
    private restApiProve: ProveedorServiceService,

    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getProductos();
    this.proveedorForm = this.formBuilder.group({
      proveedor_producto: [null, Validators.required],
      proveedor_precio: [null, Validators.required],
    });
  }
  ionViewWillEnter() {
    this.getProductos();
  }

  async getProductos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getProductos().subscribe({
      next: (res) => {
        this.productos = res.registro.regProducto;

        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        loading.dismiss();
      },
    });
  }

  async onFormSubmit(form: NgForm) {
    const data = {
      proveedor: this.route.snapshot.params['id'],
      producto: this.productoSelect,
      precio: this.precio,
    };
    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();
    await this.restApiProve.addproductoproveedor(data).subscribe({
      next: (res) => {
        loading.dismiss();
        if (res == null) {
          return;
        }
        this.router.navigate(['/perfil/proveedores/detail', this.id]);
      },
      complete: () => {},
      error: (err) => {
        loading.dismiss();
      },
    });
  }
}
