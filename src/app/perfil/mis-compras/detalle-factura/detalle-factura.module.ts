import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleFacturaPageRoutingModule } from './detalle-factura-routing.module';

import { DetalleFacturaPage } from './detalle-factura.page';
import { ComponentsModule } from '../../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleFacturaPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [DetalleFacturaPage],
})
export class DetalleFacturaPageModule {}
