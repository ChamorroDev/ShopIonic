  import { Component, OnInit } from '@angular/core';
  import { LoadingController, AlertController } from '@ionic/angular';
  import { ActivatedRoute, Router } from '@angular/router';
  import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

  import { ClProducto,ResClProducto,ClMarca,ClTipoProductoAtributo,ClAtributo } from '../../../model/ClProducto';
  import { ProductoServiceService } from '../producto-servicio.service';

  import { ClCategoria} from '../../../model/ClCategoria';
  import { CategoryServiceService } from '../../categoria/categoria-servicio.service';

  @Component({
    selector: 'app-producto-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
  })
  export class EditPage implements OnInit {

    constructor(
      public restApiCat: CategoryServiceService,
      public restApi: ProductoServiceService,
      public loadingController: LoadingController,
      public alertController: AlertController,
      public route: ActivatedRoute,
      public router: Router,
      private formBuilder: FormBuilder) { }
      resClProducto: ResClProducto= new ResClProducto({});
      marca: ClMarca= new ClMarca({});
      marcas: any[] = [];
      tipoProductoAtributo: ClTipoProductoAtributo[] = [];
      listaAtributos :ClAtributo[] = [];
      atributosArray: { nombreAtributo: string, valorAtributo: string }[] = [];

      productoForm!: FormGroup;
      categoriasProducto: any[] = [];
      categorias: ClCategoria[] = [];

      producto: ClProducto = new ClProducto({});  
      id: any = '';
      aux: number = 0;
      cat: any[] = [];

      categoriasSeleccionadasOriginales: number[] = [];

      ngOnInit() {
          this.getProducto(this.route.snapshot.params['id']);
          this.productoForm = this.formBuilder.group({
            'prod_name': [null],
            'prod_desc': [null],
            'prod_marca': [null],
            'prod_modelo': [null],
            'prod_categorias': [null],
            'tipo_atributo': [null]
           
          });
          this.productoForm.get('prod_categorias')?.valueChanges.subscribe((value) => {
          this.categoriasSeleccionadasOriginales = value;});
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
        
        onSelectOpen() {
          this.aux=1;
        }

        imageData: any; 
        fotos: any[] = [];
        fotosLista:any;

        onFileChange(event: any) {
          const file = event.target.files[0];
          this.getBase64(file).then(data => {
            this.imageData = data;
            this.fotosLista.push(data.toString());
          });
        }
        eliminarFoto(index: number) {
          this.fotosLista.splice(index, 1);
        }
        getBase64(file: File): Promise<string | ArrayBuffer> {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result!);
            reader.onerror = error => reject(error);
          });
        }
        
        async getBase64FromUrl(url: string): Promise<string> {
          return fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            }));
        }
       

        async getProducto(id: number) {
          const loading = await this.loadingController.create({
            message: 'Cargando...'
          });
          await loading.present();
          await this.restApi.getProducto(id + "")
            .subscribe({
              next: async (data) => {
                this.resClProducto=data;
                this.producto = this.resClProducto.registro.regProducto;
                this.marca = this.resClProducto.registro.regMarcaDetail;
                this.marcas = this.resClProducto.registro.regMarcaList;
                this.fotos = this.resClProducto.registro.dataFotos;
                this.fotosLista = [];

                for (const foto of this.fotos) {
                  const base64Img = await this.getBase64FromUrl(foto.foto);
                  this.fotosLista.push(base64Img);
                }
                this.categorias = this.resClProducto.registro.regCategoriasList;
                this.tipoProductoAtributo = this.resClProducto.registro.regTipoProductoAtributoDetail;
                this.listaAtributos = this.resClProducto.registro.regAtributoList;
                for (const atributo of this.tipoProductoAtributo) {
                  this.atributosArray.push({ nombreAtributo: atributo.atributo_nombre, valorAtributo: atributo.atributo_valor });
                }

                this.categoriasProducto = this.categorias.filter(categoria => this.producto.categorias.includes(categoria.id as any));
                
                this.productoForm.setValue({
                  prod_name: this.producto.nombre,
                  prod_desc: this.producto.descripcion,
                  prod_marca: this.resClProducto.registro.regMarcaDetail.id,
                  prod_modelo: this.producto.modelo,
                  prod_categorias:this.producto.categorias,
                  tipo_atributo: this.tipoProductoAtributo,

                });
                this.aux=0;
                
                this.cat=this.producto.categorias;
                this.producto.categorias=this.producto.categorias;
                
                if (this.productoForm.get('prod_categorias')?.value.length === 0) {
                  this.productoForm.get('prod_categorias')?.setValue(this.categoriasSeleccionadasOriginales);
                }
                this.categoriasProducto = this.producto.categorias;
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

        const prodCategoriasControl = this.productoForm.get('prod_categorias');
        const categoriasSeleccionadasIDs = prodCategoriasControl?.value || [];
   

   

        if (this.aux==0){
          this.producto.categorias=this.cat;
          const body = {
            producto: this.producto,
            atributos: this.atributosArray,
            fotos:this.fotosLista
          };
          console.log(this.producto)
          await this.restApi.updateProducto(this.producto.id, body)
            .subscribe({
              next: (res) => {
                
                this.router.navigate(['/perfil/producto/detail/' + this.producto.id]);
              }
              , complete: () => { }
              , error: (err) => { console.log(err); }
            });
        }
        else {
          this.producto.categorias = categoriasSeleccionadasIDs;
          const body = {
            producto: this.producto,
            atributos: this.atributosArray
          };
          console.log("soy else",this.producto.categorias);
          this.aux=0;
          await this.restApi.updateProducto(this.producto.id, body)
            .subscribe({
              next: (res) => {
                
                this.router.navigate(['/perfil/producto/detail/' + this.producto.id]);
              }
              , complete: () => { }
              , error: (err) => { console.log(err); }
            });
        }
      }
      
      

      
    
          
  }
