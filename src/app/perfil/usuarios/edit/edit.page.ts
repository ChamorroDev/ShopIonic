import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


import { ClUsuario} from '../../../model/ClUsuario';
import { UsuarioServicioService } from '../usuario-servicio.service';
import { globalData } from 'src/app/constants/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  usuarioForm!: FormGroup;
  usuario:ClUsuario =new ClUsuario({});
  id: any = parseInt(globalData.RUT_CLIENTE, 10);

  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
     private restApi: UsuarioServicioService,
     private router: Router,
    ) { }

    ngOnInit() {
      this.getUsuario(this.route.snapshot.params['id']);
      this.usuarioForm = this.formBuilder.group({
        "user_nombre" : [null, Validators.required],
        "user_appaterno" : [null, Validators.required],
        "user_apmaterno" : [null, Validators.required],
        "user_email" : [null, Validators.required],
  
      });
    }

    async getUsuario(id: number) {
      const loading = await this.loadingController.create({
        message: 'Cargando...'
      });
      await loading.present();
      await this.restApi.getUsuario(id + "")
        .subscribe({
          next: (data) => {
            this.usuario.created=data.created;
            this.id = data.rut;
            this.usuarioForm.setValue({

              user_nombre: data.nombre,
              user_appaterno: data.appaterno,
              user_apmaterno: data.apmaterno,
              user_email: data.email,

            });
            loading.dismiss();
          }
          , complete: () => { }
          , error: (err) => {
            console.log(err);
            loading.dismiss();
          }
        })
  }

  async onFormSubmit(form: NgForm) {
      this.usuario.rut = this.id;
      
      await this.restApi.updateUsuario(this.id, this.usuario)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/perfil/usuarios' ]);
          }
          , complete: () => { }
          , error: (err) => { console.log(err); }
        });
  }

}
