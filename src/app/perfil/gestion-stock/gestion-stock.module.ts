import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionStockPageRoutingModule } from './gestion-stock-routing.module';

import { GestionStockPage } from './gestion-stock.page';
import { ComponentsModule } from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionStockPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [GestionStockPage],
})
export class GestionStockPageModule {}
