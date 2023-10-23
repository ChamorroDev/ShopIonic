export class ClAtributo{
    id: number;
    nombre: string;
    created: Date;
    edited: Date;
      constructor(obj:any){
        this.id= obj && obj.id || null
        this.nombre = obj && obj.nombre || null
        this.created = obj && obj.created || null
        this.edited = obj && obj.edited || null
      }
  }
  
  export class ResClAtributo{
    msg:string;
    count:number;
    OK:boolean;
    registro:any;
  
    constructor(obj: any){
      this.msg = obj && obj.msg || null;
      this.count = obj && obj.count || 0;
      this.OK = obj && obj.OK || false;
      this.registro = obj && obj.registro || null;
    }
  }
  