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
      id: 0,
      photoUrl: '../../../../assets/images/raul_cordula.jpeg',
      subtitleBotton: 'Rua Antonio Cirilo Gomes, 254. Campina Grande - PB',
      subtitleTop: 'Publico',
      title: 'Escola Raul Cordula',
      contentBody: 'Descrição do esporte com mais espaço para ser exibida no card, permitindo que o usuário tenha uma visão melhor do que se trata o esporte e assim possa decidir se quer alugá-lo ou não',
      itemList: ['Basquete', 'Futebol', 'Futebol-Americano', 'Volei']

    }
  }

}
