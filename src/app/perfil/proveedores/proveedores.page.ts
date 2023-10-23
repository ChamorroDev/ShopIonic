import { Component, OnInit } from '@angular/core';

interface Proveedores{
  id:string;
  nombre:string;
  empresa:string;
  articulo:string;
  telefono:string;
  imagen:string;
}

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit { public alertButtons = ['OK'];

  constructor() { }
  proveedor: Proveedores[]=[
    {id:'1',nombre:'Pablo Andres',empresa:'eñvidia',articulo:'Celular ñokia ',telefono:'+569 0430 5483',imagen:'https://via.placeholder.com/100'},
    {id:'1',nombre:'Pablo Andres',empresa:'eñvidia',articulo:'Celular ñokia ',telefono:'+569 0430 5483',imagen:'https://via.placeholder.com/100'},
    {id:'1',nombre:'Pablo Andres',empresa:'eñvidia',articulo:'Celular ñokia ',telefono:'+569 0430 5483',imagen:'https://via.placeholder.com/100'},
  ]

  ngOnInit() {
  }

}
