import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RregionPageRoutingModule } from './rregion-routing.module';

import { RregionPage } from './rregion.page';
import { ComponentsModule } from '../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RregionPageRoutingModule,ComponentsModule
  ],
  declarations: [RregionPage]
})
export class RregionPageModule {}
