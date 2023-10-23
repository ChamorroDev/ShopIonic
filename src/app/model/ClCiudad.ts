export class ClCiudad {
    id: number;
    nombre: string;
    region: number; 
    created: Date;
    edited: Date;
  
    constructor(obj: any) {
      this.id = obj && obj.id || null;
      this.nombre = obj && obj.nombre || '';
      this.region = obj && obj.region || null; 
      this.created = obj && new Date(obj.created) || null;
      this.edited = obj && new Date(obj.edited) || null;
    }
  }
  