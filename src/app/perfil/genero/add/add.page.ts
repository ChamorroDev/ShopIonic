import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { CLGenero, ResCLGenero } from '../../../model/CLGenero';
import { GeneroServiceService } from '../genero-servicio.service';

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
    private restApi: GeneroServiceService,
    private router: Router,) { }

    resClGenero: ResCLGenero= new ResCLGenero({});
    generoForm!: FormGroup;
    genero:CLGenero ={id:9,name:'',created:new Date(),edited:new Date(),actived:"1"};


  ngOnInit() {
    this.generoForm = this.formBuilder.group({
      "prod_name" : [null, Validators.required]
    });
  }

  async onFormSubmit(form:NgForm){
    const loading = await this.loadingController.create({
      message:'Guardando...'
    });
    await loading.present();
    await this.restApi.addGenero(this.genero)
      .subscribe({
        next: (res) => {
          loading.dismiss();
          if (res== null){
            return
          }

          this.router.navigate(['/perfil/genero']);
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss();
        }
      });

  }




}
