import { Component, OnInit } from '@angular/core';
import { LoadingController,AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ClTarjeta,ResClTarjeta } from '../../../model/ClTarjeta';
import { TarjetaServiceService } from '../tarjetas-servicio.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor( public restApi: TarjetaServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }

    tarjetaForm!: FormGroup;
    tarjeta:ClTarjeta=new ClTarjeta({});
    id: any ='';

  ngOnInit() {
    this.tarjetaForm = this.formBuilder.group({
      'tarjeta_nombre':[null,Validators.required],
      'tarjeta_numero':[null,Validators.required],
      'tarjeta_csv':[null,Validators.required],
      'tarjeta_mesvenc':[null,Validators.required],
      'tarjeta_annovenc':[null,Validators.required],
      'tarjeta_activo':[null,Validators.required],
    });
    this.getTarjeta(this.route.snapshot.params['id']);
  }
  async getTarjeta(id:number){
    const loading = await this.loadingController.create({
      message:'loading...'
    });
    await loading.present();
    await this.restApi.getTarjeta(id+"")
    .subscribe({
      next:(data) =>{
        this.tarjeta=data.registro;
        this.tarjetaForm.setValue({
          tarjeta_nombre:this.tarjeta.nombre,
          tarjeta_numero:this.tarjeta.numero,
          tarjeta_csv:this.tarjeta.csv,
          tarjeta_mesvenc:this.tarjeta.mesvenc,
          tarjeta_annovenc:this.tarjeta.annovenc,
          tarjeta_activo:this.tarjeta.actived
        });
        loading.dismiss();
      }
      ,complete:() =>{}
      ,error:(err) =>{
        console.log(err);
        loading.dismiss();
      }
    })
  }
  async onFormSubmit(form: NgForm){
    await this.restApi.updateTarjeta(this.tarjeta.id,this.tarjeta)
    .subscribe({
      next:(res)=>{
        this.router.navigate(['/perfil/tarjetas']);
      }
      ,complete:() =>{}
      ,error:(err)=> {console.log(err); }
    })
  }

}
