import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ClCliente } from '../../../model/ClUsuario';
import { ClientesServicioService } from '../../clientes/clientes-servicio.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CLGenero,ResCLGenero } from '../../../model/CLGenero';
import { GeneroServiceService } from '../../genero/genero-servicio.service';

import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    public restApi: ClientesServicioService,
    public restApiGenero: GeneroServiceService

    , public loadingController: LoadingController
    , public router: Router,
    private navCtrl: NavController,
    private formBuilder: FormBuilder

  ) {

   }

  ngOnInit() {
    this.clienteForm=this.formBuilder.group({
      'cliente_nombres':[null,Validators.required],
      'cliente_apmaterno':[null,Validators.required],
      'cliente_appaterno':[null,Validators.required],
      'cliente_email':[null,Validators.required],
      'cliente_telefono':[null,Validators.required],
      'cliente_genero':[null,Validators.required],
      
    });
    this.getGeneros();

    this.getCliente();

  }
  ionViewWillEnter() {
    this.getCliente();
  }
  generos:CLGenero[] = [];
  cliente: ClCliente = new ClCliente({});
  clienteForm!: FormGroup;
  imageData: any; 

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.getBase64(file).then(data => {
      this.imageData = data;
      this.cliente.foto = data.toString();
    });
  }
  getBase64(file: File): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result!);
      reader.onerror = error => reject(error);
    });
  }

  async getGeneros() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApiGenero.getGeneros()
      .subscribe({
        next: (res) => {
          this.generos = res.registro;
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }
  generoSelect: any = '';

    

    getBase64FromImageUrl(url: string) {
        return new Promise<string | ArrayBuffer>((resolve, reject) => {
            let img = new Image();
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = () => {
                let canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                let ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    let dataURL = canvas.toDataURL('image/png');
                    resolve(dataURL);
                } else {
                    reject('Error getting base64 from image url');
                }
            };
            img.src = url;
        });
    }

  async getCliente() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getCliente(globalData.RUT_CLIENTE)
      .subscribe({
        next: (res) => { 
          this.cliente = res.registro;
          this.generoSelect = this.generos.find(genero => genero.id === this.cliente.genero);
          this.getBase64FromImageUrl(this.cliente.foto)
                    .then(base64data => {
                        this.cliente.foto = base64data.toString();
                        this.imageData= base64data.toString();
                    });
          
          this.clienteForm.setValue({
            cliente_nombres:this.cliente.nombre,
            cliente_apmaterno:this.cliente.apmaterno,
            cliente_appaterno:this.cliente.appaterno,
            cliente_email:this.cliente.email,
            cliente_telefono:this.cliente.telefono,
            cliente_genero:this.cliente.genero,
            

          });
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }

  async onFormSubmit(form: NgForm){


    this.cliente.foto = this.imageData; 
    
    await this.restApi.addUsuario(this.cliente)
    .subscribe({
      next:(res)=>{
        this.router.navigate(['/perfil/cuenta']);
      }
      ,complete:() =>{}
      ,error:(err)=> {console.log(err); }
    })
  }

}
