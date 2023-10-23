import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


import { ClUsuario} from '../../../model/ClUsuario';
import { UsuarioServicioService } from '../usuario-servicio.service';
import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})



export class AddPage implements OnInit {

  usuarioForm!: FormGroup;
  usuario:ClUsuario = new ClUsuario({});
  id: any = parseInt(globalData.RUT_CLIENTE, 10);


  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,

     private restApi: UsuarioServicioService,
     private router: Router,
    ) { }


  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      "user_name" : [null, Validators.required],
      "user_appaterno" : [null, Validators.required],
      "user_apmaterno" : [null, Validators.required],
      "user_username" : [null, Validators.required],
      "user_password" : [null, Validators.required],
      "user_email" : [null, Validators.required],

    });
  }
  async onFormSubmit(form:NgForm) {
    this.usuario.rut = this.id;
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.addUsuario(this.usuario)
      .subscribe({
        next: (res) => {
          loading.dismiss();
          if (res== null){ 
            return
          }
          this.router.navigate(['/perfil/usuarios']);
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss();
        }
      });
  }
  }



