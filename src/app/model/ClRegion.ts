export class ClRegion {
    id: number;
    nombre: string;
    created: Date;
    edited: Date;
  
    constructor(obj: any) {
      this.id = obj && obj.id || null;
      this.nombre = obj && obj.nombre || '';
      this.created = obj && new Date(obj.created) || null;
      this.edited = obj && new Date(obj.edited) || null;
    }
  }
  
  export class ResClRegion {
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
  
  
  