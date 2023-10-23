import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvertarioPageRoutingModule } from './invertario-routing.module';

import { InvertarioPage } from './invertario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvertarioPageRoutingModule
  ],
  declarations: [InvertarioPage]
})
export class InvertarioPageModule {}
