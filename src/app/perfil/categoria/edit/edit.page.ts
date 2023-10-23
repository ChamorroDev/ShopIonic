import { LoadingController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClCategoria,ResClCategoria } from '../../../model/ClCategoria';
import { CategoryServiceService } from '../categoria-servicio.service';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {

  constructor(public restApi: CategoryServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder ) { }

    categoriaForm!: FormGroup;
    resClCategoria: ResClCategoria= new ResClCategoria({});
    
    categoria: ClCategoria = { id: 1, name: '',created: new Date(),edited: new Date(),actived:""};
    id: any = '';

    ngOnInit() {
      this.getCategoria(this.route.snapshot.params['id']);
      this.categoriaForm = this.formBuilder.group({
        'categoria_name': [null, Validators.required],
        'categoria_activo': [this.categoria.actived, Validators.required],


      });
    }
    async getCategoria(id: number) {
   
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.restApi.getCategoria(id + "")
        .subscribe({
          next: (data) => {
            this.resClCategoria=data;
            this.categoria = this.resClCategoria.registro;
            this.id = this.categoria.id;
            
            this.categoriaForm.setValue({
              categoria_name: this.categoria.name,
              categoria_activo: this.categoria.actived

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
    this.categoria.id = this.id;
    await this.restApi.updateCategoria(this.id, this.categoria)
      .subscribe({
        next: (res) => {
          let id = res['id'];
          this.router.navigate(['/perfil/categoria' ]);
        }
        , complete: () => { }
        , error: (err) => { console.log(err); }
      })

    }
}
  


