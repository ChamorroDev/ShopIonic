import { Component, OnInit } from '@angular/core';
import { LoadingController,AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ClEmpleado,ResEmpleado,ResEmpleadoEdit } from '../../../model/ClEmpleado';

import { EmpleadoServicioService } from '../empleado-servicio.service';
import { CLCargo,ResCLCargo } from '../../../model/ClCargo';
import { CLGenero,ResCLGenero } from '../../../model/CLGenero';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(public restApi:EmpleadoServicioService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }

    respuesta:any;
    empleadoForm!:FormGroup;
    resClEmpleado: ResEmpleado = new ResEmpleado({});
    listagenero:CLGenero [] = [];
    listacargo: CLCargo [] = [];
    empleado:ClEmpleado={id:1,rut:'',dv:'',nombre:'',appaterno:'',apmaterno:'',email:'',telefono:'',sueldo:1,genero:1,cargo:2,fechaNacimiento:new Date(),edited:new Date(),created:new Date()};
    id:any=''

  ngOnInit() {
    this.getEmpleado(this.route.snapshot.params['id']);
    this.empleadoForm=this.formBuilder.group({
      'emp_rut': [null],
      'emp_dv':[null],
      'emp_nombre':[null],
      'emp_appaterno':[null],
      'emp_apmaterno':[null],
      'emp_email':[null],
      'emp_telefono':[null],
      'emp_fechaNacimiento':[null],
      'emp_genero':[null],
      'emp_cargo':[null],
      'emp_sueldo':[null]
    });
  }

  async getEmpleado(id:number){
    const loading = await this.loadingController.create({
      message:'loading...'
    });
    await loading.present();
    await this.restApi.updateEmpleado(id )
    .subscribe({
      next:(data) =>{
        this.listacargo=data.registro.CargoLista,
        this.listagenero=data.registro.GeneroLista,

        this.respuesta=data.registro.Empleado.rut;
        this.empleado.genero=this.respuesta.genero,
        this.empleado.cargo=data.registro.Empleado.codCargo.id
        console.log(data)

        this.empleadoForm.setValue({
          emp_rut:this.respuesta.rut,
          emp_dv:this.respuesta.dv,
          emp_nombre:this.respuesta.nombre,
          emp_appaterno:this.respuesta.appaterno,
          emp_apmaterno:this.respuesta.apmaterno,
          emp_email:this.respuesta.email,
          emp_telefono:this.respuesta.telefono,
          emp_fechaNacimiento:this.respuesta.fechaNacimiento,
          emp_cargo:data.registro.Empleado.codCargo.id,
          emp_genero:this.respuesta.genero,
          emp_sueldo:data.registro.Empleado.sueldo,

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
    this.empleado.id=this.id;
    await this.restApi.addEmpleado(this.empleado)
    .subscribe({
      next:(res)=>{
        let id = res['id'];
        this.router.navigate(['/perfil/empleado']);
      }
      ,complete:() =>{}
      ,error:(err)=> {console.log(err); }
    })
  }

}
