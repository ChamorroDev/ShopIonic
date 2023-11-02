import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbastecerPageRoutingModule } from './abastecer-routing.module';

import { AbastecerPage } from './abastecer.page';
import { ComponentsModule } from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbastecerPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [AbastecerPage],
})
export class AbastecerPageModule {}
