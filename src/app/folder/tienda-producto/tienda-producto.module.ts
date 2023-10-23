import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaProductoPageRoutingModule } from './tienda-producto-routing.module';

import { TiendaProductoPage } from './tienda-producto.page';
import { ComponentsModule } from '../../components.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendaProductoPageRoutingModule,ComponentsModule
  ],
  declarations: [TiendaProductoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TiendaProductoPageModule {}
