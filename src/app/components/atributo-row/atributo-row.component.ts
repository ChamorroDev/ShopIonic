import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-atributo-row',
  templateUrl: './atributo-row.component.html',
})
export class AtributoRowComponent {
  @Input() atributo: string| undefined;
  @Input() valorAtributo: string | undefined;
}

