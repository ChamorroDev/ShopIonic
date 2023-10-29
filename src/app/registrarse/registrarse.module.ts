import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistrarsePageRoutingModule } from './registrarse-routing.module';
import { RegistrarsePage } from './registrarse.page';
import { ComponentsModule } from '../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrarsePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [RegistrarsePage],
})
export class RegistrarsePageModule {}
