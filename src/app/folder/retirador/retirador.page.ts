import { Component, OnInit } from '@angular/core';
import{  FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController,AlertController } from '@ionic/angular';
import { CarroServicioService } from '../carro/carro-servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-retirador',
  templateUrl: './retirador.page.html',
  styleUrls: ['./retirador.page.scss'],
})
export class RetiradorPage implements OnInit {
  
  rutParte1: string = "";
  rutParte2: string = "";

  constructor(
    public restApi: CarroServicioService,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public router: Router

    ) { }
  
    retiroForm!: FormGroup;

  ngOnInit() {
    this.retiroForm = this.formBuilder.group({
      "rut" : [null, Validators.required],
      "nombre" : [null, Validators.required],
      "apellido" : [null, Validators.required],

    });
  }

  separarRut() {
    const rutControl = this.retiroForm.get('rut');
    if (rutControl) {
      const rutCompleto = rutControl.value;
      const partesRut = rutCompleto.split('-');
      if (partesRut.length === 2) {
        this.rutParte1 = partesRut[0];
        this.rutParte2 = partesRut[1];
      } else {
        alert("Reingrese su rut")
      }
    }

    
  }
  async onFormSubmit(form:NgForm) {
    
    const postData = {
      rut:parseInt(globalData.RUT_CLIENTE, 10),
      nombre:this.retiroForm.get('nombre')!.value,
      retiraRUT:this.rutParte1,
      dv:this.rutParte2,
      apellido:this.retiroForm.get('apellido')!.value,
    };
    const loading = await this.loadingController.create({
      message: 'Guardando...'
    });
    await loading.present();
    await this.restApi.addRetirador(postData)
      .subscribe({
        next: (res) => {
              this.router.navigate(['/folder/forma-pagar']);
              loading.dismiss();
            }
        , complete: () => { }
        , error: (err) => { console.log(err); loading.dismiss();}
      });


  }
  

}
