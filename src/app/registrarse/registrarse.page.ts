import { Component, OnInit } from '@angular/core';
import { CLGenero } from '../model/CLGenero';
import { GeneroServiceService } from '../perfil/genero/genero-servicio.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesServicioService } from '../perfil/clientes/clientes-servicio.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  public alertButtons = ['OK'];

  showPassword: boolean = false;
  generolista: CLGenero[] = [];
  showPassword1: boolean = false;
  usuarioForm!: FormGroup;
  rut: string = '19431138';
  rutn: number = 19431138;
  dv: string = '9';
  user: string = 'admin';
  clave: string = 'admin';
  nombre: string = 'nombre admin';
  appaterno: string = 'adminpater';
  apmaterno: string = 'adminmater';
  telefono: string = 'admin';
  email: string = 'admin';
  genero: number = 1;
  foto: string = '';

  constructor(
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    public restApi: GeneroServiceService,
    public restApiCliente: ClientesServicioService,
    public loadingController: LoadingController,
    public router: Router
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  togglePassword1(): void {
    this.showPassword1 = !this.showPassword1;
  }
  ngOnInit() {
    this.getGeneros();
    this.usuarioForm = this.formBuilder.group({
      user: [null, Validators.required],
      rut: [null, Validators.required],
      clave: [null, Validators.required],
      nombre: [null, Validators.required],
      appaterno: [null, Validators.required],
      apmaterno: [null, Validators.required],
      telefono: [null, Validators.required],
      email: [null, Validators.required],
      genero: [null, Validators.required],
    });
  }
  ionViewWillEnter() {
    this.getGeneros();
  }

  async getGeneros() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.restApi.getGeneros().subscribe({
      next: (res) => {
        console.log(res);
        this.generolista = res.registro;
        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        console.log('Err:' + err);
        loading.dismiss();
      },
    });
  }

  separarRut() {
    const rutControl = this.usuarioForm.get('rut');
    if (rutControl) {
      const rutCompleto = rutControl.value;
      const partesRut = rutCompleto.split('-');
      if (partesRut.length === 2) {
        this.rutn = parseInt(partesRut[0]);
        this.dv = partesRut[1];
      } else {
        alert('Reingrese su rut');
      }
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login/']);
          },
        },
      ],
    });

    await alert.present();
  }

  async onFormSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Creando perfil...',
    });

    const data = {
      rut: this.rutn,
      dv: this.dv,
      user: this.user,
      clave: this.clave,
      nombre: this.nombre,
      appaterno: this.appaterno,
      apmaterno: this.apmaterno,
      telefono: this.telefono,
      email: this.email,
      genero: this.genero,
      foto: this.foto,
    };

    await loading.present();
    await this.restApiCliente.registerCliente(data).subscribe({
      next: (res) => {
        loading.dismiss();
        this.presentAlert(
          'Registro exitoso',
          '¡Tu cuenta ha sido creada exitosamente!'
        );
      },
      complete: () => {},
      error: (err) => {
        loading.dismiss();
        console.log(err);
        this.presentAlert('Problemas', '¡Tu cuenta no se pudo crear!');
      },
    });
  }
}
