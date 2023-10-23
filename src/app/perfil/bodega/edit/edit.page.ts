import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClBodega,ResCLBodega } from '../../../model/ClBodega';
import { BodegaServiceService } from '../bodega-servicio.service';
import { ClCiudad } from '../../../model/ClCiudad';
import { ClRegion } from '../../../model/ClRegion';
import { CiudadServicioService } from '../../ciudad/ciudad-servicio.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(public restApi: BodegaServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }
    
    bodegaForm!: FormGroup;
    resCLBodega: ResCLBodega= new ResCLBodega({});

    bodega: ClBodega = new ClBodega({
      id: null,
      nombre: '',
      direccion: '',
      ciudad: null,
      numeracion: '',
      created: null,
      edited: null,
      ciudad_nombre: ''
  });
    id:any = '';
    regiones: ClRegion[] = [];
    ciudades: ClCiudad[] = [];
    ciudadSelect: any = '';
    regionSelect: any = '';
    ciudadesFiltradas: ClCiudad[] = [];

    ngOnInit() {
      this.getBodega(this.route.snapshot.params['id']);
      this.bodegaForm = this.formBuilder.group({
        'bodega_name':[null,Validators.required],
        'bodega_direccion':[null,Validators.required],
        'bodega_numeracion':[null,Validators.required],
        'bodega_ciudad':[null,Validators.required],
        'bodega_region':[null,Validators.required],
      });
    }

    ionViewWillEnter() {
      this.getBodega(this.route.snapshot.params['id']);

    }

    filtrarCiudadesPorRegion(event: any) {
      const regionId = event.target.value;
      this.ciudadesFiltradas = this.ciudades.filter(ciudad => ciudad.region === regionId);
    }


    async getBodega(id:number){
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.restApi.getBodega(id+"")
        .subscribe({
          next:(date) =>{
            this.resCLBodega=date;
            this.bodega = this.resCLBodega.registro.regBodegaList;
            this.regiones = this.resCLBodega.registro.regRegionList;
            this.ciudades = this.resCLBodega.registro.regCiudadesList;
            this.ciudadSelect = this.ciudades.find(ciudad => ciudad.id == this.bodega.ciudad);

            if (this.ciudadSelect) {
              this.regionSelect = this.regiones.find(region => region.id == this.ciudadSelect.region);
            }
            if (this.regionSelect) {
              this.ciudadesFiltradas = this.ciudades.filter(ciudad => ciudad.region == this.regionSelect.id);
            }
            this.id = this.bodega.id;
            this.bodegaForm.setValue({
              bodega_name: this.bodega.nombre,
              bodega_direccion: this.bodega.direccion,
              bodega_numeracion: this.bodega.numeracion,
              bodega_ciudad: this.bodega.ciudad, 
              bodega_region: this.bodega.id
            });
            loading.dismiss();
          }
          ,  complete: () => { }
          , error: (err) => {
            console.log(err);
            loading.dismiss();
          }
        })
    }


    async onFormSubmit(form: NgForm) {
      this.bodega.id = this.id;
      this.bodega.id = this.id;
      const bodegaCiudadControl = this.bodegaForm.get('bodega_ciudad');
      if (bodegaCiudadControl) {
        this.bodega.ciudad = bodegaCiudadControl.value;
      }
      await this.restApi.updateBodega(this.id, this.bodega)
        .subscribe({
          next: (res) => {
            let id = res['id'];
            this.router.navigate(['/perfil/bodega' ]);
          }
          , complete: () => { }
          , error: (err) => { console.log(err); }
        })
  
      }

}
