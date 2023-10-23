import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtributoPageRoutingModule } from './atributo-routing.module';

import { AtributoPage } from './atributo.page';
import { ComponentsModule } from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtributoPageRoutingModule,ComponentsModule
  ],
  declarations: [AtributoPage]
})
export class AtributoPageModule {}
