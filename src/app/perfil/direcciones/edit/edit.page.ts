import { Component, OnInit } from '@angular/core';
import{  FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClDireccion,ResClDireccion } from '../../../model/ClDireccion';
import { CiudadServicioService } from '../../ciudad/ciudad-servicio.service';
import { DireccionServicioService } from '../direccion-servicio.service';
import { ActivatedRoute,Router } from '@angular/router';
import { LoadingController,AlertController } from '@ionic/angular';
import { ClRegion } from "../../../model/ClRegion";
import { ClCiudad } from "../../../model/ClCiudad";
import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: CiudadServicioService,
    public route: ActivatedRoute,
    private restApiDirs: DireccionServicioService,
    private router: Router,) { }



  direccionForm!: FormGroup;

  ngOnInit() {
    this.direccionForm = this.formBuilder.group({
      "dir_calle" : [null, Validators.required],
      "dir_numero" : [null, Validators.required],
      "selectedCiudad" : [null, Validators.required],
      "selectedRegion" : [null, Validators.required],
    });
    this.getCiudadesRegiones();
    this.getDirecion(this.route.snapshot.params['id']);  
    
  }

    ciudades: ClCiudad[] = [];
    regiones: ClRegion[] = [];
    resClSucursal: ResClDireccion= new ResClDireccion({});
    direccion: ClDireccion= new ClDireccion({});


    ciudadesFiltradas: ClCiudad[] = [];
    city: ClCiudad = new ClCiudad({});

    regionSeleccionada: number=0;
    ciudadSeleccionada: number=0;

    ionViewWillEnter() {
      this.getDirecion(this.route.snapshot.params['id']);
    }

    filtrarCiudades() {
      const selectedRegionValue = this.direccionForm.get('selectedRegion')!.value;
      this.ciudadesFiltradas = this.ciudades.filter(ciudad => ciudad.region === selectedRegionValue);
   
      this.direccionForm.get('selectedCiudad')!.setValue(null); 
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

    ciudadSelect: any = '';
    regionSelect: any = '';
    
    async getDirecion(id:number){
      const loading = await this.loadingController.create({
        message:'loading...'
      });
      await loading.present();
      await this.restApiDirs.getDireccion(id + "")
      .subscribe({
        next:(data) =>{
          this.resClSucursal=data;
          this.direccion=this.resClSucursal.registro;

          this.ciudadSelect = this.ciudades.find(ciudad => ciudad.id == parseInt(this.direccion.ciudad));

          if (this.ciudadSelect) {
            this.regionSelect = this.regiones.find(region => region.id == this.ciudadSelect.region);
          }
          if (this.regionSelect) {
            this.ciudadesFiltradas = this.ciudades.filter(ciudad => ciudad.region == this.regionSelect.id);
          }

          this.regionSeleccionada=1;
          this.direccionForm.setValue({
            dir_calle:this.direccion.calle,
            dir_numero:this.direccion.numero,
            selectedRegion:1,
            selectedCiudad:this.direccion.ciudad

          });


     

          loading.dismiss();
        }
        ,complete:()=>{}
        ,error:(err) =>{
          console.log(err);
          loading.dismiss();
        }
      })
    }

    async onFormSubmit(form:NgForm){
      this.direccion.cliente=parseInt(globalData.RUT_CLIENTE, 10);;

      this.direccion.ciudad=(this.direccionForm.get('selectedCiudad')!.value)
      this.direccion.calle=(this.direccionForm.get('dir_calle')!.value)
      this.direccion.numero=(this.direccionForm.get('dir_numero')!.value)


  
      const loading = await this.loadingController.create({
        message:'Guardando...'
      });
      await loading.present();
      await this.restApiDirs.updateDireccion(this.direccion.id,this.direccion)
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
