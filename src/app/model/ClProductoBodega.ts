export class ClProductoCantidad {
 
    id: number;
    producto: string;
    bodega: string;
    cantidad: Number;
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.producto = obj && obj.producto || null
          this.bodega = obj && obj.bodega || null;
          this.cantidad = obj && obj.cantidad || null;
  
      }
  }