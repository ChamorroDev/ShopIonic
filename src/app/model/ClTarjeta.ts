
export class ClTarjeta{
    id : number;
    cliente: number;
    nombre: string;
    numero: number;
    csv: number;
    mesvenc: number;
    annovenc:number;
    created:Date;
    edited:Date;
    actived: number;
      constructor(obj:any){
        this.id = obj && obj.id || null
        this.cliente = obj && obj.cliente || null
        this.nombre = obj && obj.nombre || null
        this.numero = obj && obj.numero || null
        this.csv = obj && obj.csv || null
        this.mesvenc = obj && obj.mesvenc || null
        this.annovenc = obj && obj.annovenc || null
        this.created = obj && obj.created || null
        this.edited = obj && obj.edited || null
        this.actived = obj && obj.actived || null
      }
  
  }
  
  export class ResClTarjeta{
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
  