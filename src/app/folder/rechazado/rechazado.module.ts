import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechazadoPageRoutingModule } from './rechazado-routing.module';

import { RechazadoPage } from './rechazado.page';
import { ComponentsModule } from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechazadoPageRoutingModule,ComponentsModule
  ],
  declarations: [RechazadoPage]
})
export class RechazadoPageModule {}
