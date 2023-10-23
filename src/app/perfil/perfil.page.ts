import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../login/auth-service.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthServiceService, 
    ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    
  }

  logout() {
        this.authService.logout()
        this.router.navigate(['/login']);

      } 


}
