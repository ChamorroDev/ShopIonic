export class ClMarca {
 
  id: number;
  nombre: string;
  created: Date;
  edited: Date;
  actived: boolean;
    constructor(obj: any){
        this.id = obj && obj.id || null
        this.nombre = obj && obj.nombre || null
        this.actived = obj && obj.actived || null;
        this.edited = obj && obj.edited || null;
        this.created = obj && obj.created || null;

    }
}

export class ClAtributo {
 
  id: number;
  nombre: string;
  created: Date;
  edited: Date;
    constructor(obj: any){
        this.id = obj && obj.id || null
        this.nombre = obj && obj.nombre || null
        this.edited = obj && obj.edited || null;
        this.created = obj && obj.created || null;

    }
}

export class ClTipoProductoAtributo {
  atributo_nombre: string;
  atributo_valor: string;
  producto:number;
  created: Date;
  edited: Date;
    constructor(obj: any){
        this.atributo_nombre = obj && obj.atributo_nombre || null
        this.atributo_valor = obj && obj.atributo_valor || null
        this.producto = obj && obj.producto || null
        this.created = obj && obj.created || null;
        this.edited = obj && obj.edited || null;

    }
}


export class ClProducto {
 
    id: number;
    nombre: string;
    descripcion: string;
    marca: number;
    modelo: string;
    precio: number;
    categorias: number[];
    fotos: string[];
    created: Date;
    edited: Date;
    actived: boolean;
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.nombre = obj && obj.nombre || null
          this.descripcion = obj && obj.descripcion || null
          this.marca = obj && obj.marca || null
          this.precio = obj && obj.precio || null
          this.modelo = obj && obj.modelo || null
          this.categorias = obj && obj.categorias || [];
          this.actived = obj && obj.actived || null;
          this.edited = obj && obj.edited || null;
          this.created = obj && obj.created || null;
          this.fotos = obj && obj.fotos || null;
      }
  }



export class ResClProducto {
    msg: string;
    count: number;
    OK: boolean;
    registro: any;
    
    constructor(obj: any) {
      this.msg = obj && obj.msg || null;
      this.count = obj && obj.count || null;
      this.OK = obj && obj.OK || null;
      this.registro = obj && obj.registro || null;
      
    }
  }

