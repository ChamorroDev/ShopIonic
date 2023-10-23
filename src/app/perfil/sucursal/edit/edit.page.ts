import { LoadingController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClSucursal,ResClSucursal} from '../../../model/ClSucursal';
import { SucursalServicioService } from '../sucursal-servicio.service';

import { ClCiudad } from '../../../model/ClCiudad';
import { ClRegion } from '../../../model/ClRegion';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {

  constructor(

    public restApi: SucursalServicioService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder ) { }

    sucursalForm!: FormGroup;
    regiones: ClRegion[] = [];
    ciudades: ClCiudad[] = [];
    sucursal: ClSucursal = new ClSucursal({});
    id: any = '';
    ciudadSelect: any = '';
    regionSelect: any = '';
    ciudadesFiltradas: ClCiudad[] = [];
    resClSucursal: ResClSucursal= new ResClSucursal({});



    ngOnInit() {
    
      this.getSucursal(this.route.snapshot.params['id']);
      
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
    

 
    async getSucursal(id: string) {      
      const loading = await this.loadingController.create({ message: 'Loading...' });
      await loading.present();
      await this.restApi.getSucursal(id )
        .subscribe({
          next: (res) => {

              this.ciudades = res.registro.regCiudadesList;
              this.regiones = res.registro.regRegionList;
              this.sucursal = res.registro.regSucursalList;
              console.log( "hola")

              console.log( this.sucursal)

              this.ciudadSelect = this.ciudades.find(ciudad => ciudad.id == this.sucursal.ciudad);

              if (this.ciudadSelect) {
                this.regionSelect = this.regiones.find(region => region.id == this.ciudadSelect.region);
              }
              if (this.regionSelect) {
                this.ciudadesFiltradas = this.ciudades.filter(ciudad => ciudad.region == this.regionSelect.id);
              }


              this.sucursalForm.setValue({
                sucursal_name: this.sucursal.nombre,
                sucursal_direccion: this.sucursal.direccion,
                sucursal_enumeracion: this.sucursal.numeracion,
                sucursal_ciudad: this.ciudadSelect.id, 
                sucursal_region: this.regionSelect.id
              });
            
              
            loading.dismiss();
          }
          , complete: () => { }
          , error: (err) => {
            loading.dismiss(); 
          }
        })
    }
    
    
    
    async onFormSubmit(form: NgForm) {
  
      this.sucursal.id = this.id;
      const sucursalCiudadControl = this.sucursalForm.get('sucursal_ciudad');
      if (sucursalCiudadControl) {
        this.sucursal.ciudad = sucursalCiudadControl.value;
      }
      await this.restApi.updateSucursal(this.route.snapshot.params['id'], this.sucursal)
        .subscribe({
          next: (res) => {
            this.router.navigate(['perfil/sucursal' ]);
          }
          , complete: () => { }
          , error: (err) => { console.log(err); }
        })
  
      }
}
  



