import { Component, Input,OnInit,NgModule } from '@angular/core';
import { ModalController,IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
})



export class ProductDetailModalComponent {
  @Input() product: any; 
  @Input() marcaNombre: any;
  @Input() listaCats: any;
  @Input() listaAtris: any;

  constructor(private modalController: ModalController) {}
  ngOnInit() {
  }
  quantity: number = 1;
  closeModal() {
    this.modalController.dismiss();
  }
  decrementValue() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  incrementValue() {
    this.quantity++;
  }
  addcart(){}
}
