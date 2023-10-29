import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClProveedor, ResClProveedor } from '../../../model/ClProveedor';
import { ProveedorServiceService } from '../proveedores-servicio.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  constructor(
    public restApi: ProveedorServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

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
  proveedorForm!: FormGroup;

  ngOnInit() {
    this.getProveedor(this.route.snapshot.params['id']);

    this.proveedorForm = this.formBuilder.group({
      pro_rut: [null, Validators.required],
      pro_dv: [null, Validators.required],
      pro_nombre: [null, Validators.required],
      pro_email: [null, Validators.required],
      pro_telefono: [null, Validators.required],
    });
  }

  async getProveedor(id: number) {
    const loading = await this.loadingController.create({
      message: 'loading...',
    });
    await loading.present();
    await this.restApi.getProveedor(id + '').subscribe({
      next: (data) => {
        this.proveedor = data.registro;
        this.proveedorForm.setValue({
          pro_rut: this.proveedor.rut,
          pro_dv: this.proveedor.dv,
          pro_nombre: this.proveedor.nombre,
          pro_email: this.proveedor.email,
          pro_telefono: this.proveedor.telefono,
        });
        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
        loading.dismiss();
      },
    });
  }

  async onFormSubmit(form: NgForm) {
    console.log(this.proveedor);
    this.proveedor.actived = 1;
    this.proveedor.created = new Date();
    this.proveedor.edited = new Date();
    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();
    await this.restApi
      .updateProveedor(this.proveedor.id, this.proveedor)
      .subscribe({
        next: (res) => {
          loading.dismiss();
          if (res == null) {
            return;
          }
          this.router.navigate(['/perfil/proveedores']);
        },
        complete: () => {},
        error: (err) => {
          loading.dismiss();
        },
      });
  }
}
