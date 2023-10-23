import { Component, OnInit } from '@angular/core';
import { LoadingController,AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { CLMarca,ResCLMarca } from '../../../model/CLMarca';
import { MarcaServiceService } from '../marca-servicio.service';




@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(public restApi: MarcaServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }

    marcaForm!: FormGroup;
    resClMarca: ResCLMarca=new ResCLMarca({});

    marca:CLMarca ={id:1 ,nombre:'',created: new Date(),edited: new Date(),actived:1};
    id: any ='';

  ngOnInit() {
    this.getMarca(this.route.snapshot.params['id']);
    this.marcaForm=this.formBuilder.group({
      'marca_nombre':[null,Validators.required],
      'marca_activo':[this.marca.actived,Validators.required],
    });
  }
  async getMarca(id:number){
    const loading = await this.loadingController.create({
      message:'loading...'
    });
    await loading.present();
    await this.restApi.getMarca(id + "")
    .subscribe({
      next:(data) =>{
        this.resClMarca=data;
        this.marca=this.resClMarca.registro;
        this.id=this.marca.id;
        console.log(this.marca);
        this.marcaForm.setValue({
          marca_nombre:this.marca.nombre,
          marca_activo:this.marca.actived
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
  async onFormSubmit(form: NgForm){
    this.marca.id=this.id;
    await this.restApi.updateMarca(this.id,this.marca)
    .subscribe({
      next:(res)=>{
        let id = res['id'];
        this.router.navigate(['/perfil/marca']);
      }
      ,complete:() =>{}
      ,error:(err)=> {console.log(err); }
    })
  }



}
