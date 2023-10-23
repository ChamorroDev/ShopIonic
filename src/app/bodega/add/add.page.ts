import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ClBodega,ResCLBodega } from '../../../model/ClBodega';
import { BodegaServiceService } from '../bodega-servicio.service';

import { LoadingController,AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: BodegaServiceService,
    private router: Router,) { }

    resClBodega: ResCLBodega= new ResCLBodega({});
    bodegaForm!: FormGroup;
    bodega:ClBodega ={id:12 ,nombre:'',direccion:'',created:new Date(),edited:new Date(),actived:""};


  ngOnInit() {
    this.bodegaForm = this.formBuilder.group({
      'bod_nombre' : [null, Validators.required]
    });
  }

  async onFormSubmit(form:NgForm){
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
