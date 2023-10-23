import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CLGenero,ResCLGenero } from '../../../model/CLGenero';
import { GeneroServiceService  } from '../genero-servicio.service';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(public restApi: GeneroServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }

    generoForm!: FormGroup;
    resCLGenero: ResCLGenero= new ResCLGenero({});

    genero:CLGenero ={ id: 1, name: '',created: new Date(),edited: new Date(),actived:""};
    id:any = '';


  ngOnInit() {
    this.getGenero(this.route.snapshot.params['id']);
    this.generoForm = this.formBuilder.group({
      'genero_name':[null,Validators.required],
      'genero_activo':[this.genero.actived,Validators.required],
    });
  }
  async getGenero(id:number){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.restApi.getGenero(id+"")
      .subscribe({
        next:(date) =>{
          this.resCLGenero=date;
          this.genero = this.resCLGenero.registro;
          this.id = this.genero.id;
          console.log(this.genero)
          this.generoForm.setValue({
            genero_name:this.genero.name,
            genero_activo: this.genero.actived
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
    this.genero.id = this.id;
    await this.restApi.updateGenero(this.id, this.genero)
      .subscribe({
        next: (res) => {
          let id = res['id'];
          this.router.navigate(['/perfil/genero' ]);
        }
        , complete: () => { }
        , error: (err) => { console.log(err); }
      })

    }

}
