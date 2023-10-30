import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductoPageRoutingModule } from './add-producto-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AddProductoPage } from './add-producto.page';
import { ComponentsModule } from 'src/app/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProductoPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [AddProductoPage],
})
export class AddProductoPageModule {}
