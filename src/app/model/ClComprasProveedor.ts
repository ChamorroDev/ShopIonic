export class ClComprasProveedor {
    id: number;
    usuario: string;
    proveedor: Number; 
    precio: Number;
    cantidad: Number;
    bodega:Number;
    created:Date;
    constructor(obj: any) {
      this.id = obj && obj.id || null;
      this.usuario = obj && obj.usuario || '';
      this.proveedor = obj && obj.proveedor || null; 
      this.precio = obj && obj.precio || null; 
      this.cantidad = obj && obj.cantidad || null; 
      this.bodega = obj && obj.bodega || null; 
      this.created = obj && obj.created || null; 

    }
  }