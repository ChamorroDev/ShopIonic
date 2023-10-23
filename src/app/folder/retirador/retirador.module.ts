import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { RetiradorPageRoutingModule } from './retirador-routing.module';

import { RetiradorPage } from './retirador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetiradorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RetiradorPage]
})
export class RetiradorPageModule {}
