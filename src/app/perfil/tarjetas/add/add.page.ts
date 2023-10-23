import { Component, OnInit } from '@angular/core';
import{  FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ClTarjeta,ResClTarjeta } from '../../../model/ClTarjeta';
import { TarjetaServiceService } from '../tarjetas-servicio.service';

import { LoadingController,AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';

import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})



export class AddPage implements OnInit  {

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: TarjetaServiceService,
    private router: Router,) {
  }

  resCLTarjeta: ResClTarjeta = new ResClTarjeta({});
  tarjetaForm!: FormGroup;
  tarjeta:ClTarjeta= new ClTarjeta({});

  ngOnInit() {
    this.tarjetaForm = this.formBuilder.group({
      "tarjeta_nombre":[null,Validators.required],
      "tarjeta_numero":[null,Validators.required],
      "tarjeta_csv":[null,Validators.required],
      "tarjeta_mesvenc":[null,Validators.required],
      "tarjeta_annovenc":[null,Validators.required]
    });
  }
  async onFormSubmit(form:NgForm){
    this.tarjeta.actived=1;
    this.tarjeta.cliente=parseInt(globalData.RUT_CLIENTE, 10);
    const loading = await this.loadingController.create({
      message:'Guardando...'
    });
    await loading.present();
    await this.restApi.addTarjeta(this.tarjeta)
      .subscribe({
        next: (res) => {
          loading.dismiss();
          if (res== null){
            return
          }

          this.router.navigate(['/perfil/tarjetas']);
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss();
        }
      });
  }


}
