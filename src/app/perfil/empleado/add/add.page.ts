import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmpleadoServicioService } from '../empleado-servicio.service';
import { ClEmpleado,ResEmpleado } from '../../../model/ClEmpleado';
import { CLCargo,ResCLCargo } from '../../../model/ClCargo';
import { CLGenero,ResCLGenero } from '../../../model/CLGenero';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: EmpleadoServicioService,
    private router: Router,
    private http: HttpClient) { }

    empleadoForm!:FormGroup;
    resClEmpleado: ResEmpleado = new ResEmpleado({});
    listagenero:CLGenero [] = [];
    listacargo: CLCargo [] = [];
    empleado:ClEmpleado={id:1,rut:'',dv:'',nombre:'',appaterno:'',apmaterno:'',email:'',telefono:'',sueldo:1,genero:1,cargo:2,fechaNacimiento:new Date(),edited:new Date(),created:new Date()};

  ngOnInit() {
     this.getCargoGenero()
    this.empleadoForm=this.formBuilder.group({
      "emp_rut": [null],
      "emp_dv":[null],
      "emp_nombre":[null],
      "emp_appaterno":[null],
      "emp_apmaterno":[null],
      "emp_email":[null],
      "emp_telefono":[null],
      "emp_fechaNacimiento":[null],
      "emp_genero":[null],
      "emp_cargo":[null],
      "emp_sueldo":[null]
    });
  }

  async getCargoGenero() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getCargoGenero()
      .subscribe({
        next: (res) => {
          this.listagenero = res.registro.GeneroLista;
          this.listacargo = res.registro.CargoLista;
          loading.dismiss();}
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();}})
  }
  async onFormSubmit(form:NgForm){
    this.empleado.created= new Date();
    this.empleado.edited= new Date();
    const loading = await this.loadingController.create({
      message:'Guardando...'
    });
    await loading.present();
    await this.restApi.addEmpleado(this.empleado)
    .subscribe({
      next:(res) => {
        loading.dismiss();
        if(res == null){
          return
        }
        this.router.navigate(['/perfil/empleado']);
      }
      , complete: () => { }
      , error: (err) => {
        loading.dismiss();
      }
    });




  }
}
