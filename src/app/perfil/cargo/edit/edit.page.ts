import { Component, OnInit } from '@angular/core';
import { LoadingController,AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CLCargo,ResCLCargo } from '../../../model/CLCargo';
import { CargoServiceService } from '../cargo-servicio.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(public restApi:CargoServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }

    cargoForm!: FormGroup;
    resCLCargo:ResCLCargo= new ResCLCargo({});

    cargo:CLCargo={id:3,codigo:'',nombre:'',created:new Date(),edited:new Date(),actived:1}
    id: any ='';


  ngOnInit() {
    this.getCargo(this.route.snapshot.params['id']);
    this.cargoForm=this.formBuilder.group({
      'cargo_nombre':[null,Validators.required],
      'cargo_activo':[null,Validators.required],
      'cargo_codigo': [null, Validators.required]
    });
  }
  async getCargo(id:number){
    const loading = await this.loadingController.create({
      message:'loading...'
    });
    await loading.present();
    await this.restApi.getCargo(id + "")
    .subscribe({
      next:(data) =>{
        this.cargo=data.registro;
        this.id=this.cargo.id;
        console.log(this.cargo.nombre);
        this.cargoForm.setValue({
          cargo_nombre:this.cargo.nombre,
          cargo_activo:this.cargo.actived,
          cargo_codigo:this.cargo.codigo
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
    this.cargo.id=this.id;
    await this.restApi.updateCargo(this.id,this.cargo)
    .subscribe({
      next:(res)=>{
        let id = res['id'];
        this.router.navigate(['/perfil/cargo']);
      }
      ,complete:() =>{}
      ,error:(err)=> {console.log(err); }
    })
  }
}
