import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormaPagarPageRoutingModule } from './forma-pagar-routing.module';

import { FormaPagarPage } from './forma-pagar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormaPagarPageRoutingModule
  ],
  declarations: [FormaPagarPage]
})
export class FormaPagarPageModule {}
