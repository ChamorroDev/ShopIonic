import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddBodegaPageRoutingModule } from './add-bodega-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBodegaPage } from './add-bodega.page';
import { ComponentsModule } from 'src/app/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBodegaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [AddBodegaPage],
})
export class AddBodegaPageModule {}
