export class ClProveedor{
  id:number;
  rut:string;
  dv:string;
  nombre:string;  
  email:string;  
  telefono:string;  
  actived:number;
  edited:Date;
  created:Date;
  constructor(obj:any){
    this.id= obj && obj.id || null
    this.rut=obj && obj.rut || null
    this.nombre = obj && obj.nombre || null
    this.dv = obj && obj.dv || null
    this.email = obj && obj.email || null
    this.telefono = obj && obj.telefono || null
    this.created = obj && obj.created || null
    this.edited = obj && obj.edited || null
    this.actived = obj && obj.actived || null
  }
} 

export class ResClProveedor{

    msg:string;
    count:number;
    OK:boolean;
    registro:any;

    constructor(obj: any){
        this.msg = obj && obj.msg || null;
        this.count = obj && obj.count || null;
        this.OK = obj && obj.OK || false;
        this.registro = obj && obj.registro || null;
      }

}