
export class ClUsuario {
 
    rut    :  Number;
    dv    : String;
    nombre : String;
    appaterno: String;
    apmaterno: String;
    email : String;
    telefono : String;
    fechaNacimiento : Date;
    actived : Number; 
    edited : Date;
    created : Date;



      constructor(obj: any){
        this.rut = obj && obj.rut || null
        this.dv = obj && obj.dv || null
        this.nombre = obj && obj.nombre || null
        this.appaterno = obj && obj.appaterno || null
        this.apmaterno = obj && obj.apmaterno || null
        this.email = obj && obj.email || null
        this.fechaNacimiento = obj && obj.fechaNacimiento || null
        this.telefono = obj && obj.apmaterntelefonoo || null
        this.actived = obj && obj.actived || null
        this.created = obj && obj.created || null
        this.edited = obj && obj.edited || null

      }
  }

  export class ClCliente {
 
    rut    :  Number;
    dv    : String;
    nombre : String;
    appaterno : String;
    apmaterno : String;
    email : String;
    ciudad_nombre :	String;
    genero_nombre	: String;
    telefono	: String;
    nacimiento :	Date;
    genero    :  number;
    foto : string;
    usuario:string;


      constructor(obj: any){
        this.rut = obj && obj.rut || null
        this.dv = obj && obj.dv || null
        this.nombre = obj && obj.nombre || null
        this.appaterno = obj && obj.appaterno || null
        this.apmaterno = obj && obj.apmaterno || null
        this.email = obj && obj.email || null
        this.telefono = obj && obj.apmaterntelefonoo || null
        this.ciudad_nombre = obj && obj.ciudad_nombre || null
        this.genero_nombre = obj && obj.apmaterntelefonoo || null
        this.telefono = obj && obj.telefono || null
        this.nacimiento = obj && obj.nacimiento || null
        this.genero = obj && obj.genero || null
        this.foto = obj && obj.foto || null
        this.usuario = obj && obj.usuario || null



      }
  }

  export class ClApiResp {
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

  export class ClPersonaFactura {
 
    rut    :  string;
    dv    : String;
    nombre : String;
    direccion	: String;
    numero	: number;




      constructor(obj: any){
        this.rut = obj && obj.rut || null
        this.dv = obj && obj.dv || null
        this.nombre = obj && obj.nombre || null
        this.direccion = obj && obj.direccion || null
        this.numero = obj && obj.numero || null




      }
  }