import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosProveedorPageRoutingModule } from './pedidos-proveedor-routing.module';

import { PedidosProveedorPage } from './pedidos-proveedor.page';
import { ComponentsModule } from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosProveedorPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [PedidosProveedorPage],
})
export class PedidosProveedorPageModule {}
