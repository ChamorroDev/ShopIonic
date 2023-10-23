
export class ClEmpleado {
  id: number;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  correo_electronico: string;
  telefono: string;
  sucursal: number; 
  created: Date;
  edited: Date;

  constructor(obj: any) {
    this.id = obj && obj.id || null;
    this.nombre = obj && obj.nombre || null;
    this.appaterno = obj && obj.appaterno || null;
    this.apmaterno = obj && obj.apmaterno || null;
    this.correo_electronico = obj && obj.correo_electronico || null;
    this.telefono = obj && obj.telefono || null;
    this.sucursal = obj && obj.sucursal || null; 
    this.created = obj && obj.created || null;
    this.edited = obj && obj.edited || null;
  }
}
