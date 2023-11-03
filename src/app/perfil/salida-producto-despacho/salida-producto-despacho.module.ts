import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalidaProductoDespachoPageRoutingModule } from './salida-producto-despacho-routing.module';

import { SalidaProductoDespachoPage } from './salida-producto-despacho.page';
import { ComponentsModule } from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalidaProductoDespachoPageRoutingModule,ComponentsModule
  ],
  declarations: [SalidaProductoDespachoPage]
})
export class SalidaProductoDespachoPageModule {}
