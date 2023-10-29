export class ClCompra {
  numero: number;
  estadoPedido_nombre: string;
  forma_pago_nombre: string;
  tipoDespacho_nombre: string;
  retiroPersona_info: number;
  direccion_info: string;
  fecha_emision: string;
  precio_total: number;
  cliente: number;
  sucursal: number;
  retiroPersona: number;
  direccion: number;
  tipoDespacho: number;
  estadoPedido: number;
  forma_pago: number;
  constructor(obj: any) {
    this.numero = (obj && obj.numero) || null;
    this.estadoPedido_nombre = (obj && obj.estadoPedido_nombre) || null;
    this.forma_pago_nombre = (obj && obj.forma_pago_nombre) || null;
    this.tipoDespacho_nombre = (obj && obj.tipoDespacho_nombre) || null;
    this.retiroPersona_info = (obj && obj.retiroPersona_info) || null;
    this.direccion_info = (obj && obj.direccion_info) || null;
    this.fecha_emision = (obj && obj.fecha_emision) || null;
    this.precio_total = (obj && obj.precio_total) || null;
    this.cliente = (obj && obj.cliente) || null;
    this.sucursal = (obj && obj.sucursal) || null;
    this.retiroPersona = (obj && obj.retiroPersona) || null;
    this.direccion = (obj && obj.direccion) || null;
    this.tipoDespacho = (obj && obj.tipoDespacho) || null;
    this.estadoPedido = (obj && obj.estadoPedido) || null;
    this.forma_pago = (obj && obj.forma_pago) || null;
  }
}

export class ClDetalleCompra {
  id: number;
  producto_nombre: string;
  foto_producto: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  factura: number;
  constructor(obj: any) {
    this.id = (obj && obj.id) || null;
    this.producto_nombre = (obj && obj.producto_nombre) || null;
    this.foto_producto = (obj && obj.foto_producto) || null;
    this.cantidad = (obj && obj.cantidad) || null;
    this.precio_unitario = (obj && obj.precio_unitario) || null;
    this.subtotal = (obj && obj.subtotal) || null;
    this.factura = (obj && obj.factura) || null;
  }
}
