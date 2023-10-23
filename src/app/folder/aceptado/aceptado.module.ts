import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AceptadoPageRoutingModule } from './aceptado-routing.module';

import { AceptadoPage } from './aceptado.page';
import { ComponentsModule } from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AceptadoPageRoutingModule,ComponentsModule
  ],
  declarations: [AceptadoPage]
})
export class AceptadoPageModule {}
