import { Component, OnInit } from '@angular/core';
import{  FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClDireccion,ResClDireccion } from '../../../model/ClDireccion';
import { CiudadServicioService } from '../../ciudad/ciudad-servicio.service';
import { DireccionServicioService } from '../direccion-servicio.service';
import { globalData } from 'src/app/constants/user';

import { LoadingController,AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { ClRegion } from "../../../model/ClRegion";
import { ClCiudad } from "../../../model/ClCiudad";
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: CiudadServicioService,
    private restApiDirs: DireccionServicioService,

    private router: Router,) { }



  direccionForm!: FormGroup;

  ngOnInit() {
    this.getCiudadesRegiones();
    this.direccionForm = this.formBuilder.group({
      "dir_calle" : [null, Validators.required],
      "dir_numero" : [null, Validators.required],
      "selectedCiudad" : [null, Validators.required],
      "selectedRegion" : [null, Validators.required],



    });
  }

    ciudades: ClCiudad[] = [];
    regiones: ClRegion[] = [];
    resClSucursal: ResClDireccion= new ResClDireccion({});
    direccion: ClDireccion= new ClDireccion({});


    ciudadesFiltradas: ClCiudad[] = [];
    regionSeleccionada: number=0;
    ciudadSeleccionada: number=0;

    filtrarCiudades() {
      const selectedRegionValue = this.direccionForm.get('selectedRegion')!.value;
      this.ciudadesFiltradas = this.ciudades.filter(ciudad => ciudad.region === selectedRegionValue);
      this.direccionForm.get('selectedCiudad')!.setValue(null); // Reiniciar la ciudad seleccionada si es necesario
    }









  async getCiudadesRegiones() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getTodo()
      .subscribe({
        next: (res) => {
          this.resClSucursal =res;
          this.regiones = this.resClSucursal.registro.regRegion;
          this.ciudades = this.resClSucursal.registro.regCiudad;


          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }

  async onFormSubmit(form:NgForm){
    this.direccion.cliente=parseInt(globalData.RUT_CLIENTE, 10);;

    const loading = await this.loadingController.create({
      message:'Guardando...'
    });
    await loading.present();
    await this.restApiDirs.addDireccion(this.direccion)
      .subscribe({
        next:(res) => {
          loading.dismiss();

          this.router.navigate(['/perfil/direcciones']);
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss();
        }
      });

  }

}
