import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProductoServiceService } from '../producto-servicio.service';
import { ClCategoria} from '../../../model/ClCategoria';
import { HttpClient } from '@angular/common/http';
import { ClProducto,ResClProducto,ClMarca,ClTipoProductoAtributo,ClAtributo } from '../../../model/ClProducto';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  constructor(
              private formBuilder: FormBuilder,
              public loadingController: LoadingController,
              private restApi: ProductoServiceService,
              private router: Router,
              private http: HttpClient,) { }

    productoForm!: FormGroup;
    categoriasProducto: any[] = [];
    categorias: ClCategoria[] = [];  
    producto: ClProducto = new ClProducto({}); 
    resClProducto: ResClProducto= new ResClProducto({});
    marcas: any[] = [];
    listaAtributos :ClAtributo[] = [];
    atributosArray: { nombreAtributo: string, valorAtributo: string }[] = []; 

  ngOnInit() {
    this.getProductosData();
    this.productoForm = this.formBuilder.group({
      'prod_name': [null],
      'prod_desc': [null],
      'prod_marca': [null],
      'prod_modelo': [null],
      'prod_categorias': [null],
      'tipo_atributo': [null],

    });
  }
  agregarFilaAtributo() {
    this.atributosArray.push({ nombreAtributo: '', valorAtributo: '' });
  }
  eliminarAtributo(index: number) {
    this.atributosArray.splice(index, 1);
  }
  actualizarNombreAtributo(event: any, index: number) {
    const nuevoNombre = event.detail.value; 
    this.atributosArray[index].nombreAtributo = nuevoNombre; 
  }
  actualizarValorAtributo(event: any, index: number) {
    const nuevoValor = event.detail.value; 
    this.atributosArray[index].valorAtributo = nuevoValor; 
  }

  imageData: any; 
  fotos: any[] = [];

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.getBase64(file).then(data => {
      this.imageData = data;
      this.fotos.push(data.toString());
    });
  }
  eliminarFoto(index: number) {
    this.fotos.splice(index, 1);
  }
  getBase64(file: File): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result!);
      reader.onerror = error => reject(error);
    });
  }
  

  async getProductosData() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getProductosData()
      .subscribe({
        next: (res) => { 
          this.resClProducto =res;
          this.categorias = this.resClProducto.registro.regCategoria;
          this.marcas = this.resClProducto.registro.regMarca;
          this.listaAtributos = this.resClProducto.registro.regAtributo;
          loading.dismiss();}
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();}})
  }
  

  async onFormSubmit(form: NgForm) {
    this.producto.categorias=this.productoForm.get('prod_categorias')?.value
    const body = {
      producto: this.producto,
      atributos: this.atributosArray,
      foto:this.fotos
    };
    console.log(this.producto)
    await this.restApi.addProducto(body)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/perfil/producto/']);
        }
        , complete: () => { }
        , error: (err) => { console.log(err); }
      });
    
   
  }
}



