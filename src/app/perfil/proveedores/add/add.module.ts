import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPageRoutingModule } from './add-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPage } from './add.page';
import { ComponentsModule } from '../../../components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [AddPage]
})
export class AddPageModule {}
