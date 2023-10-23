export class CLMarca{
  id: number;
  nombre: string;
  created: Date;
  edited: Date;
  actived: number;
    constructor(obj:any){
      this.id= obj && obj.id || null
      this.nombre = obj && obj.nombre || null
      this.created = obj && obj.created || null
      this.edited = obj && obj.edited || null
      this.actived = obj && obj.actived || null
    }
}

export class ResCLMarca{
  msg:string;
  count:number;
  OK:boolean;
  registro:any;

  constructor(obj: any){
    this.msg = obj && obj.msg || null;
    this.count = obj && obj.count || null;
    this.OK = obj && obj.OK || null;
    this.registro = obj && obj.registro || null;
  }
}
