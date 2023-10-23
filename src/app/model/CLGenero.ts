export class CLGenero{
  id: number;
  name: string;
  created: Date;
  edited: Date;
  actived: string;
    constructor(obj:any){
      this.id= obj && obj.id || null
      this.name = obj && obj.name || null
      this.created = obj && obj.created || null
      this.edited = obj && obj.edited || null
      this.actived = obj && obj.actived || null
    }
}

export class ResCLGenero{
  msg:string;
  count:number;
  OK:boolean;
  registro:any;

  constructor(obj: any){
    this.msg = obj && obj.msg || null;
    this.count = obj && obj.count || 0;
    this.OK = obj && obj.OK || false;
    this.registro = obj && obj.registro || null;
  }
}
