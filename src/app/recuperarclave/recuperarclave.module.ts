import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { RecuperarclavePageRoutingModule } from './recuperarclave-routing.module';

import { ComponentsModule } from '../components.module';
import { RecuperarclavePage } from './recuperarclave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarclavePageRoutingModule,ReactiveFormsModule,ComponentsModule
  ],
  declarations: [RecuperarclavePage]
})
export class RecuperarclavePageModule {}
