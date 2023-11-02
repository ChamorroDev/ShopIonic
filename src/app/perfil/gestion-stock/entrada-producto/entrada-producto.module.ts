import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntradaProductoPageRoutingModule } from './entrada-producto-routing.module';

import { EntradaProductoPage } from './entrada-producto.page';
import { ComponentsModule } from '../../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntradaProductoPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [EntradaProductoPage],
})
export class EntradaProductoPageModule {}
