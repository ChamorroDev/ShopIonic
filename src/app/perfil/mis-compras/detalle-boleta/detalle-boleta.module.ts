import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleBoletaPageRoutingModule } from './detalle-boleta-routing.module';

import { DetalleBoletaPage } from './detalle-boleta.page';
import { ComponentsModule } from '../../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleBoletaPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [DetalleBoletaPage],
})
export class DetalleBoletaPageModule {}
