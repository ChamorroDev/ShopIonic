import { Component, OnInit } from '@angular/core';
import{  FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController,AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { ClProveedor,ResClProveedor } from '../../../model/ClProveedor';
import { ProveedorServiceService } from '../proveedores-servicio.service';



@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: ProveedorServiceService,
    private router: Router) { }


    resClProveedor:ResClProveedor = new ResClProveedor({});
    proveedor:ClProveedor={
      id: 1, rut: '', nombre: '', created: new Date(), edited: new Date(), actived: 1,
      dv: '',
      email: '',
      telefono: ''
    };
    proveedorForm!:FormGroup;

  ngOnInit() {
    this.proveedorForm= this.formBuilder.group({
      "pro_rut":[null, Validators.required],
      "pro_dv":[null, Validators.required],
      "pro_nombre":[null, Validators.required],
      "pro_email":[null, Validators.required],
      "pro_telefono":[null, Validators.required],

    });
  }
  async onFormSubmit(form:NgForm){
    console.log(this.proveedor)
    this.proveedor.actived=1;
    this.proveedor.created= new Date();
    this.proveedor.edited= new Date();
    const loading = await this.loadingController.create({
      message:'Guardando...'
    });
    await loading.present();
    await this.restApi.addProveedor(this.proveedor)
    .subscribe({
      next:(res) => {
        loading.dismiss();
        if(res == null){
          return
        }
        this.router.navigate(['/perfil/proveedores']);
      }
      , complete: () => { }
      , error: (err) => {
        loading.dismiss();
      }
    });
  }

}
