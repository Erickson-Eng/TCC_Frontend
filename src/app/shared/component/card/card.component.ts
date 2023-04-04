import { Component, Input, OnInit } from '@angular/core';
import { CardItem } from '../../model/CardItem';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() card:CardItem;

  constructor() {
    this.card = {
      photoUrl: '../../../../assets/images/raul_cordula.jpeg',
      name: 'Escola Raul Cordula',
      description: ' Descrição do esporte com mais espaço para ser exibida no card, permitindo que o usuário tenha uma visão melhor do que se trata o esporte e assim      possa decidir se quer alugá-lo ou não',
      availableSports: ['Basquete', 'Futebol', 'Futebol-Americano', 'Volei', 'Outros'],
      address: 'Rua Antonio Cirilo Gomes, 254. Campina Grande - PB'
    }
  }

}
