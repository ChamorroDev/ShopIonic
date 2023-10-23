import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'footer-menu',
  templateUrl: './bar-footer-menu.component.html',
  styleUrls: ['./bar-footer-menu.component.scss'],
})
export class BarFooterMenuComponent  {
  constructor(private router: Router) {}

  isFolderRoute() {
    return this.router.isActive('/folder', true);
    
  }

  isPerfilRoute() {
    return this.router.isActive('/perfil', true);
    
  }
  isCarroRoute() {
    return this.router.isActive('/folder/carro', true);
    
  }
}
