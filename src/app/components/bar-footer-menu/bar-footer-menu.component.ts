import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { globalData } from 'src/app/constants/user';
import { AuthServiceService } from '../../login/auth-service.service';

@Component({
  selector: 'footer-menu',
  templateUrl: './bar-footer-menu.component.html',
  styleUrls: ['./bar-footer-menu.component.scss'],
})
export class BarFooterMenuComponent {
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  isFolderRoute() {
    return this.router.isActive('/folder', true);
  }
  isComprasRoute() {
    return this.router.isActive('/perfil/mis-compras', true);
  }

  isPerfilRoute() {
    return this.router.isActive('/perfil', true);
  }
  isCarroRoute() {
    return this.router.isActive('/folder/carro', true);
  }
  isPRoute() {
    return this.router.isActive('/login', true);
  }
  isRRoute() {
    return this.router.isActive('/registrarse', true);
  }
  ngOnInit() {
    this.isUserLoggedIn();
  }

  ionViewWillEnter() {
    this.isUserLoggedIn();
  }

  username: string = '';

  isUserLoggedIn() {
    this.username = this.authService.whoLogin();

    if (this.username == 'Invitado') {
      return false;
    }
    return true;
  }
}
