import { Data } from "@angular/router";

export class ClEmpleado {
  id: number;
  rut:string;
  dv:string;
  nombre: string;
  genero: Number;
  cargo: Number;
  sueldo:number;
  appaterno: string;
  apmaterno: string;
  email: string;
  telefono: string;
  fechaNacimiento:Data;

  created: Date;
  edited: Date;

  constructor(obj: any) {
    this.id = obj && obj.id || null;
    this.rut = obj && obj.rut || null
    this.dv = obj && obj.dv || null
    this.nombre = obj && obj.nombre || null;
    this.sueldo = obj && obj.sueldo|| null;
    this.genero = obj && obj.genero || null;
    this.cargo = obj && obj.cargo || null;
    this.appaterno = obj && obj.appaterno || null;
    this.apmaterno = obj && obj.apmaterno || null;
    this.email = obj && obj.email || null;
    this.telefono = obj && obj.telefono || null;
    this.fechaNacimiento=obj&& obj.fechaNacimiento || null;
    this.created = obj && obj.created || null;
    this.edited = obj && obj.edited || null;
  }

}

export class ResEmpleado{
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


export class ResEmpleadoEdit{
  apmaterno: string;
​​  ​appaterno: string;
​​  dv: string;​
  email: string;
  fechaNacimiento: string;
  genero: number;
​​  nombre: string;

  rut: string;
  telefono: string;

  constructor(obj: any) {
    this.telefono = obj && obj.telefono || null;
    this.rut = obj && obj.rut || null;
    this.genero = obj && obj.genero || null;
    this.nombre = obj && obj.nombre || null;
    this.email = obj && obj.email || null;
    this.dv = obj && obj.dv || null;
    this.fechaNacimiento = obj && obj.fechaNacimiento || null;
    this.appaterno = obj && obj.appaterno || null;
    this.apmaterno = obj && obj.apmaterno || null;


  }
}

