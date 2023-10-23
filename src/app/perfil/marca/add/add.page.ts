import { Component, OnInit } from '@angular/core';
import{  FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { CLMarca,ResCLMarca } from '../../../model/CLMarca';

import { MarcaServiceService } from '../marca-servicio.service';
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
    private restApi: MarcaServiceService,
    private router: Router,) { }

    resClMarca: ResCLMarca = new ResCLMarca({});
    marca:CLMarca={ id:9,nombre:'',created:new Date(),edited:new Date(),actived:1};
    marcaForm!: FormGroup;

  ngOnInit() {
    this.marcaForm = this.formBuilder.group({
      "prod_name" : [null, Validators.required]
    });
  }
  async onFormSubmit(form:NgForm){
    this.marca.actived= 1;
    this.marca.created=new Date();
    this.marca.edited= new Date();
    const loading = await this.loadingController.create({
      message:'Guardando...'
    });
    await loading.present();
    await this.restApi.addMarca(this.marca)
      .subscribe({
        next:(res) => {
          loading.dismiss();
          if(res == null){
            return
          }
          this.router.navigate(['/perfil/marca']);
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss();
        }
      });

  }













}
