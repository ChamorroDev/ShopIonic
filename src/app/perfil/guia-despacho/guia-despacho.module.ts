import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuiaDespachoPageRoutingModule } from './guia-despacho-routing.module';
import { ComponentsModule } from '../../components.module';

import { GuiaDespachoPage } from './guia-despacho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuiaDespachoPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [GuiaDespachoPage],
})
export class GuiaDespachoPageModule {}
