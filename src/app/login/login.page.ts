import { Component, OnInit } from '@angular/core';
import{  FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { LoadingController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService, 
    public loadingController: LoadingController,
    private router: Router) { }
  usuarioForm!:FormGroup;
  usuario:any;
  clave:any;


  ngOnInit() {
    localStorage.setItem('username', "Invitado");

    this.usuarioForm = this.formBuilder.group({
      'usuario': [null,Validators.required],
      'clave': [null,Validators.required]
  });
  }

  async onFormSubmit(form:NgForm) {
        const val = this.usuarioForm.value;
        const loading = await this.loadingController.create({
          message:'Cargando...'
        });
        await loading.present();
        console.log(this.usuarioForm.get('usuario')!.value,)
        this.authService.login(this.usuarioForm.get('usuario')!.value, this.usuarioForm.get('clave')!.value)
            .subscribe(
                (res) => {
                  console.log(res)
                  loading.dismiss();
                  if (res.msg === 'error') {
                    alert('Error al ingresar los datos');
                  } else {
                    loading.dismiss();

                    this.router.navigate(['/perfil']);
                    
                  }
                }
            );
    
}

}
