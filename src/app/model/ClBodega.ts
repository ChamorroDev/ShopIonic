export class ClBodega {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: number;
  numeracion: string;
  created: Date;
  edited: Date;
  ciudad_nombre: string;
  region_nombre: string;

  constructor(obj: any) {
    this.id = (obj && obj.id) || null;
    this.nombre = (obj && obj.nombre) || null;
    this.direccion = (obj && obj.direccion) || null;
    this.ciudad = (obj && obj.ciudad) || null;
    this.numeracion = (obj && obj.numeracion) || null;
    this.created = (obj && obj.created) || null;
    this.edited = (obj && obj.edited) || null;
    this.ciudad_nombre = (obj && obj.ciudad_nombre) || null;
    this.region_nombre = (obj && obj.region_nombre) || null;
  }
}

export class ResCLBodega {
  msg: string;
  count: number;
  OK: boolean;
  registro: any;

  constructor(obj: any) {
    this.msg = (obj && obj.msg) || null;
    this.count = (obj && obj.count) || null;
    this.OK = (obj && obj.OK) || null;
    this.registro = (obj && obj.registro) || null;
  }
}
