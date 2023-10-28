import { Component, OnInit } from '@angular/core';
import { CLCargo,ResCLCargo } from '../../../model/ClCargo';
import { CargoServiceService } from '../cargo-servicio.service';
import{  FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
    private restApi: CargoServiceService,
    private router: Router,) { }

    resCLCargo:ResCLCargo= new ResCLCargo({});
    cargo:CLCargo={id:5,codigo:'',nombre:'',created:new Date(),edited:new Date(),actived:1}
    cargoForm!:FormGroup;
  ngOnInit() {
    this.cargoForm = this.formBuilder.group({
      "car_nombre": [null, Validators.required],
      "car_codigo": [null, Validators.required]
    });
  }
  async onFormSubmit(form:NgForm){
    this.cargo.actived=1;
    this.cargo.created= new Date();
    this.cargo.edited= new Date();
    const loading = await this.loadingController.create({
      message:'Guardando...'
    });
    await loading.present();
    await this.restApi.addCargo(this.cargo)
    .subscribe({
      next:(res) => {
        loading.dismiss();
        if(res == null){
          return
        }
        this.router.navigate(['/perfil/cargo']);
      }
      , complete: () => { }
      , error: (err) => {
        loading.dismiss();
      }
    });
  }
}
