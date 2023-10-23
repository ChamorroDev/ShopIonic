import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClAtributo,ResClAtributo } from '../../../model/ClAtributo';
import { AtributoServiceService  } from '../atributo-servicio.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(public restApi: AtributoServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }

    atributoForm!: FormGroup;
    resCLAtributo: ResClAtributo= new ResClAtributo({});

    atributo:ClAtributo ={ id: 1, nombre: '',created: new Date(),edited: new Date()};
    id:any = '';


  ngOnInit() {
    this.getAtributo(this.route.snapshot.params['id']);
    this.atributoForm = this.formBuilder.group({
      'atributo_name':[null,Validators.required],
    });
  }
  async getAtributo(id:number){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.restApi.getAtributo(id+"")
      .subscribe({
        next:(date) =>{
          this.resCLAtributo=date;
          this.atributo = this.resCLAtributo.registro;
          this.id = this.atributo.id;
          console.log(this.atributo)
          this.atributoForm.setValue({
            atributo_name:this.atributo.nombre,
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
    this.atributo.id = this.id;
    await this.restApi.updateAtributo(this.id, this.atributo)
      .subscribe({
        next: (res) => {
          let id = res['id'];
          this.router.navigate(['/perfil/atributo' ]);
        }
        , complete: () => { }
        , error: (err) => { console.log(err); }
      })

    }

}

