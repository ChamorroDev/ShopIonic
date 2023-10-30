import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ClBodega, ResCLBodega } from '../../../model/ClBodega';
import { ProveedorServiceService } from '../proveedores-servicio.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClCiudad } from '../../../model/ClCiudad';
import { ClRegion } from '../../../model/ClRegion';
import { CiudadServicioService } from '../../ciudad/ciudad-servicio.service';

@Component({
  selector: 'app-add-bodega',
  templateUrl: './add-bodega.page.html',
  styleUrls: ['./add-bodega.page.scss'],
})
export class AddBodegaPage implements OnInit {
  resClBodega: ResCLBodega = new ResCLBodega({});
  bodegaForm!: FormGroup;
  bodega: ClBodega = new ClBodega({});
  regiones: ClRegion[] = [];
  ciudades: ClCiudad[] = [];
  id: any = this.route.snapshot.params['id'];
  ciudadesFiltradas: ClCiudad[] = [];
  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: ProveedorServiceService,
    public restApiCiudad: CiudadServicioService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCiudadesRegiones();
    this.bodegaForm = this.formBuilder.group({
      bodega_name: [null, Validators.required],
      bodega_enumeracion: [null, Validators.required],
      bodega_direccion: [null, Validators.required],
      bodega_region: [null, Validators.required],
      bodega_ciudad: [null, Validators.required],
    });
  }

  filtrarCiudadesPorRegion(event: any) {
    const regionId = event.target.value;
    this.ciudadesFiltradas = this.ciudades.filter(
      (ciudad) => ciudad.region === regionId
    );
  }

  async getCiudadesRegiones() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApiCiudad.getTodo().subscribe({
      next: (res) => {
        this.ciudades = res.registro.regCiudad;
        this.regiones = res.registro.regRegion;
        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        loading.dismiss();
      },
    });
  }

  async onFormSubmit(form: NgForm) {
    const bodegaCiudadControl = this.bodegaForm.get('bodega_ciudad');
    if (bodegaCiudadControl) {
      this.bodega.ciudad = bodegaCiudadControl.value;
    }

    const data = {
      proveedor: this.route.snapshot.params['id'],
      bodega: this.bodega,
    };
    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();
    await this.restApi.addbodegaproveedor(data).subscribe({
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
