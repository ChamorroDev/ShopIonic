import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ClAtributo, ResClAtributo } from '../../../model/ClAtributo';
import { AtributoServiceService } from '../atributo-servicio.service';

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
    private restApi: AtributoServiceService,
    private router: Router,) { }

    resClAtributo: ResClAtributo= new ResClAtributo({});
    atributoForm!: FormGroup;
    atributo:ClAtributo ={id:9,nombre:'',created:new Date(),edited:new Date()};


  ngOnInit() {
    this.atributoForm = this.formBuilder.group({
      "prod_name" : [null, Validators.required]
    });
  }

  async onFormSubmit(form:NgForm){
    console.log(this.atributo)
    this.atributo.created=new Date();
    this.atributo.edited=new Date();
    const loading = await this.loadingController.create({
      message:'Guardando...'
    });
    await loading.present();
    console.log(this.atributo)
    await this.restApi.addAtributo(this.atributo)
      .subscribe({
        next: (res) => {
          loading.dismiss();
          if (res== null){
            return
          }

          this.router.navigate(['/perfil/atributo']);
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss();
        }
      });

  }




}
