import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarcaPageRoutingModule } from './marca-routing.module';

import { MarcaPage } from './marca.page';
import { ComponentsModule } from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarcaPageRoutingModule,ComponentsModule
  ],
  declarations: [MarcaPage]
})
export class MarcaPageModule {}
