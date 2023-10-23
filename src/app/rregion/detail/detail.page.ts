import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ClRegion} from '../../model/ClRegion';
import { ResClRegion} from '../../model/ClRegion';
import { RregionServicioService } from '../rregion-servicio.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  constructor(
    public restApi: RregionServicioService
    , public loadingController: LoadingController
    , public alertController: AlertController
    , public route: ActivatedRoute
    , public router: Router
  ) { }
  resClRegion: ResClRegion= new ResClRegion({});

  
  sucursales: ClRegion[] = [];
  sucursal: ClRegion= new ClRegion({});



  ngOnInit() {
    this.getSucursal()
  }
  

  async getSucursal() {
    const loading = await this.loadingController.create({ message: 'Loading...' });
    await loading.present();
    await this.restApi.getSucursal(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          this.resClRegion = res;
     
          
          this.sucursal = this.resClRegion.registro;
          this.sucursal.created=new Date(this.sucursal.created);
          this.sucursal.edited=new Date(this.sucursal.edited);

          loading.dismiss();

        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss(); 
        }
      })
  }

   
    

}


