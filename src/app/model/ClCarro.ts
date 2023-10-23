


export class ClCarro {
 
    id: number;
    cantidad: number;
    created: Date;
    edited: Date;
    producto: number;
    cliente: number;
    nombre :string;
    precio: number;
    marca :string;
    descripcion:string;

   
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.nombre = obj && obj.nombre || null
          this.cantidad = obj && obj.cantidad || null
          this.producto = obj && obj.producto || null
          this.precio = obj && obj.precio || null
          this.cliente = obj && obj.cliente || null
          this.edited = obj && obj.edited || null;
          this.created = obj && obj.created || null;
          this.descripcion = obj && obj.descripcion || null;

          this.marca = obj && obj.marca || null;


      }
  }



export class ResClCarro {
    msg: string;
    count: number;
    OK: boolean;
    registro: any;
    
    constructor(obj: any) {
      this.msg = obj && obj.msg || null;
      this.count = obj && obj.count || null;
      this.OK = obj && obj.OK || false;
      this.registro = obj && obj.registro || null;
      
    }
  }

