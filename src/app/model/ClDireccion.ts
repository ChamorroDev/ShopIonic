export class ClDireccion {
    id: number;
    calle: string;
    numero: string;
    cliente: Number;
    ciudad: string;
    ciudad_nombre: string;
    region_nombre: string;
    created: Date;
    edited: Date;
    actived: string;
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.calle = obj && obj.calle || null
          this.numero = obj && obj.numero || null
          this.cliente = obj && obj.cliente || null
          
          this.ciudad_nombre = obj && obj.ciudad_nombre || null
          this.region_nombre = obj && obj.region_nombre || null
          
          this.ciudad = obj && obj.ciudad || null
          this.created = obj && obj.created || null
          this.edited = obj && obj.edited || null
          this.actived = obj && obj.actived || null
      }
  }

export class ResClDireccion {
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