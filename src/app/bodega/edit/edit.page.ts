import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClBodega,ResCLBodega } from '../../../model/ClBodega';
import { BodegaServiceService } from '../bodega-servicio.service';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(public restApi: BodegaServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }
    
    bodegaForm!: FormGroup;
    resCLBodega: ResCLBodega= new ResCLBodega({});

    bodega:ClBodega ={id:8,nombre:'',direccion:'',created:new Date(),edited:new Date(),actived:""};
    id:any = '';

    ngOnInit() {
      this.getBodega(this.route.snapshot.params['id']);
      this.bodegaForm = this.formBuilder.group({
        'bodega_nombre':[null,Validators.required],
        'bodega_activo':[this.bodega.actived,Validators.required],
      });
    }
    async getBodega(id:number){
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.restApi.getBodega(id+"")
        .subscribe({
          next:(date) =>{
            this.resCLBodega=date;
            this.bodega = this.resCLBodega.registro;
            this.id = this.bodega.id;
            console.log(this.bodega)
            this.bodegaForm.setValue({
              bodega_name:this.bodega.nombre,
              bodega_activo: this.bodega.actived
            });
            loading.dismiss();
          }
          ,  complete: () => { }
          , error: (err) => {
            console.log(err);
            loading.dismiss();
          }
        })
    }
    async onFormSubmit(form: NgForm) {
      this.bodega.id = this.id;
      await this.restApi.updateBodega(this.id, this.bodega)
        .subscribe({
          next: (res) => {
            let id = res['id'];
            this.router.navigate(['/perfil/bodega' ]);
          }
          , complete: () => { }
          , error: (err) => { console.log(err); }
        })
  
      }

}
