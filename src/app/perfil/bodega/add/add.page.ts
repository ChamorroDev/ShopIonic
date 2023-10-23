import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ClBodega,ResCLBodega } from '../../../model/ClBodega';
import { BodegaServiceService } from '../bodega-servicio.service';

import { LoadingController,AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { ClCiudad } from '../../../model/ClCiudad';
import { ClRegion } from '../../../model/ClRegion';
import { CiudadServicioService } from '../../ciudad/ciudad-servicio.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: BodegaServiceService,
    public restApiCiudad: CiudadServicioService,

    private router: Router,) { }

    resClBodega: ResCLBodega= new ResCLBodega({});
    bodegaForm!: FormGroup;
    bodega:ClBodega =new ClBodega({});
    regiones: ClRegion[] = [];
    ciudades: ClCiudad[] = [];
    id: any = '';
    
    ciudadesFiltradas: ClCiudad[] = [];

  ngOnInit() {
    this.getCiudadesRegiones();
    this.bodegaForm = this.formBuilder.group({
      'bodega_name' : [null, Validators.required],
      'bodega_enumeracion' : [null, Validators.required],
      'bodega_direccion' : [null, Validators.required],
      'bodega_region' : [null, Validators.required],
      'bodega_ciudad' : [null, Validators.required],

    });
  }

  filtrarCiudadesPorRegion(event: any) {
    const regionId = event.target.value;
    this.ciudadesFiltradas = this.ciudades.filter(ciudad => ciudad.region === regionId);
  }

  async getCiudadesRegiones() {      
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();
    await this.restApiCiudad.getTodo()
      .subscribe({
        next: (res) => {
            this.ciudades = res.registro.regCiudad;
            this.regiones = res.registro.regRegion;
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss(); 
        }
      })
  }

  async onFormSubmit(form:NgForm){
    const bodegaCiudadControl = this.bodegaForm.get('bodega_ciudad');
    if (bodegaCiudadControl) {
      this.bodega.ciudad = bodegaCiudadControl.value;
    }

    const loading = await this.loadingController.create({
      message:'Guardando...'
    });
    await loading.present();
    await this.restApi.addBodega(this.bodega)
      .subscribe({
        next: (res) => {
          loading.dismiss();
          if (res== null){
            return
          }

          this.router.navigate(['/perfil/bodega']);
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss();
        }
      });

  }

}
