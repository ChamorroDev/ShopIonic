import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarOrdenPageRoutingModule } from './generar-orden-routing.module';

import { GenerarOrdenPage } from './generar-orden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarOrdenPageRoutingModule
  ],
  declarations: [GenerarOrdenPage]
})
export class GenerarOrdenPageModule {}
