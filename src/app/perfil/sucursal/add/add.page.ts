import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClSucursal} from '../../../model/ClSucursal';
import { SucursalServicioService } from '../sucursal-servicio.service';
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
    public restApiCiudad: CiudadServicioService,
    public restApi: SucursalServicioService,
    private router: Router,
    ) { }
    
    sucursalForm!: FormGroup;
    regiones: ClRegion[] = [];
    ciudades: ClCiudad[] = [];
    sucursal: ClSucursal = new ClSucursal({});
    id: any = '';
    
    ciudadesFiltradas: ClCiudad[] = [];

    ngOnInit() {
      this.getCiudadesRegiones();
      this.sucursalForm = this.formBuilder.group({
        'sucursal_name': [null, Validators.required],
        'sucursal_direccion': [null, Validators.required],
        'sucursal_enumeracion': [null, Validators.required],
        'sucursal_ciudad': [null, Validators.required],
        'sucursal_region': [null, Validators.required],

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

    async onFormSubmit(form:NgForm) {
      const sucursalCiudadControl = this.sucursalForm.get('sucursal_ciudad');
      if (sucursalCiudadControl) {
        this.sucursal.ciudad = sucursalCiudadControl.value;
      }
      const loading = await this.loadingController.create({
        message: 'Guardando...'
      });
      await loading.present();
      await this.restApi.addSucursal(this.sucursal)
        .subscribe({
          next: (res) => {
            loading.dismiss(); 
            if (res== null){ 
              return
            }
            
            this.router.navigate(['perfil/sucursal']);
          }
          , complete: () => { }
          , error: (err) => {
            loading.dismiss(); 
          }
        });
    }
  }




