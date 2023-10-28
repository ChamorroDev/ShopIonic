import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmpleadoServicioService } from './empleado-servicio.service';
import { ClEmpleado,ResEmpleado } from '../../model/ClEmpleado';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
})
export class EmpleadoPage implements OnInit {

  constructor(public restApi: EmpleadoServicioService
    , public loadingController: LoadingController
    , public router: Router
    , private http: HttpClient) { }


    empleado:ClEmpleado[]=[];
    searchEmpleado: ClEmpleado[]=[];
    resClEmpleado:ResEmpleado = new ResEmpleado({});
  ngOnInit() {
    this.getEmpleados();
  }
  ionViewWillEnter() {
    this.getEmpleados();
}

searchEmpleados(event :any){
  const text = event.target.value;
  this.searchEmpleado=this.empleado;
  if (text && text.trim() != ''){
    this.searchEmpleado = this.searchEmpleado.filter((empleado: any )=>{
      return (empleado.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1);
    })
  }
}
async getEmpleados() {
  const loading = await this.loadingController.create({
    message: 'Cargando...'
  });
  await loading.present();
  await this.restApi.getEmpleados()
    .subscribe({
      next: (res) => {
        this.resClEmpleado=res;
        this.empleado = this.resClEmpleado.registro;
        this.searchEmpleado=this.empleado;
        loading.dismiss();
      }
      , complete: () => { }
      , error: (err) => {
        console.log("Err:" + err);
        loading.dismiss();
      }
    })
}




}
