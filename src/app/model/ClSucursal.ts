
export class ClSucursal {
  id: number;
  nombre: string;
  direccion: string;
  numeracion: string;
  ciudad: number; 
  ciudad_nombre:string;
  created: Date;
  edited: Date;

  constructor(obj: any) {
    this.id = obj && obj.id || null;
    this.nombre = obj && obj.nombre || null;
    this.direccion = obj && obj.direccion || null;
    this.numeracion = obj && obj.numeracion || null;
    this.ciudad = obj && obj.ciudad || null; 
    this.ciudad_nombre = obj && obj.ciudad_nombre || null; 

    this.created = obj && obj.created || null;
    this.edited = obj && obj.edited || null;
  }
}

export class ResClSucursal {
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
