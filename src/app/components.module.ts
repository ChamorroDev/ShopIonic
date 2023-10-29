import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarFooterMenuComponent } from './components/bar-footer-menu/bar-footer-menu.component';
import { BarHeaderMenuComponent } from './components/bar-header-menu/bar-header-menu.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PersonaFacturaComponent } from './components/persona-factura/persona-factura.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    BarFooterMenuComponent,
    BarHeaderMenuComponent,
    LoadingComponent,
    PersonaFacturaComponent,
  ],
  exports: [
    BarFooterMenuComponent,
    BarHeaderMenuComponent,
    LoadingComponent,
    PersonaFacturaComponent,
  ],
  imports: [CommonModule, IonicModule, RouterModule, FontAwesomeModule],
})
export class ComponentsModule {}
