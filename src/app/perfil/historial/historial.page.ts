import { Component, OnInit } from '@angular/core';
interface Historial {
  name: string;
  description: string;
  image: string;
  user: string;
}
@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  constructor() { }
  historial: Historial[] = [
    { name: 'Producto 1',user:'papu', description: 'Descripción del Producto 1', image: 'https://via.placeholder.com/100' },
    { name: 'Producto 1',user:'papu', description: 'Descripción del Producto 1', image: 'https://via.placeholder.com/100' },
    { name: 'Producto 1',user:'papu', description: 'Descripción del Producto 1', image: 'https://via.placeholder.com/100' },
    { name: 'Producto 1',user:'papu', description: 'Descripción del Producto 1', image: 'https://via.placeholder.com/100' },
    { name: 'Producto 1',user:'papu', description: 'Descripción del Producto 1', image: 'https://via.placeholder.com/100' },
    { name: 'Producto 1',user:'papu', description: 'Descripción del Producto 1', image: 'https://via.placeholder.com/100' }


  ];
  ngOnInit() {
  }

}
