import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarjetasPageRoutingModule } from './tarjetas-routing.module';

import { TarjetasPage } from './tarjetas.page';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarjetasPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [TarjetasPage]
})
export class TarjetasPageModule {}
