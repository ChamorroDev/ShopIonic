import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../login/auth-service.service';

@Component({
  selector: 'header-menu',
  templateUrl: './bar-header-menu.component.html',
  styleUrls: ['./bar-header-menu.component.scss'],
})
export class BarHeaderMenuComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    private authService: AuthServiceService,
    public router: Router,
  ) {}

  storedUsername: string | null = 'Invitado';

  ngOnInit() {
    this.updateStoredUsername();
  }

  ionViewWillEnter() {
    this.updateStoredUsername();
  }

  updateStoredUsername() {
    const username = this.authService.whoLogin();
    this.storedUsername = username ;

  }
  username1: string='';

  isUserLoggedIn() {
    this.username1 = this.authService.whoLogin();

    if(this.username1=='Invitado'){
      return true;
    }
    return false;
  }
}
