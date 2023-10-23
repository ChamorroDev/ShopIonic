import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ClUsuario,ClCliente } from '../../model/ClUsuario';
import { ClientesServicioService } from './clientes-servicio.service';

import { globalData } from 'src/app/constants/user';




@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {public alertButtons = ['OK'];

  constructor(public restApi: ClientesServicioService
    , public loadingController: LoadingController
    , public router: Router,
    private navCtrl: NavController) { }

    
    ngOnInit() {
      this.getClientes();
    }
    clientes: ClCliente[] = [];
    searchCliente: ClCliente[] = [];

    searchClientes(event :any){
      const text = event.target.value;
      this.searchCliente=this.clientes;
      if (text && text.trim() != ''){
        this.searchCliente = this.searchCliente.filter((cliente: any )=>{
          return (cliente.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1); 
        })
      }
    }
    
  
  async getClientes() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getClientes()
      .subscribe({
        next: (res) => { 
          this.clientes = res.registro;

          this.searchCliente=this.clientes;
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
