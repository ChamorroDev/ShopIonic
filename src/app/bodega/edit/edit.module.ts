import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPageRoutingModule,
    ReactiveFormsModule,ComponentsModule
  ],
  declarations: [EditPage]
})
export class EditPageModule {}
