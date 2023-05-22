import { Component, Input } from '@angular/core';
import { CardItem } from '../../model/CardItem';

@Component({
  selector: 'app-card-v2',
  templateUrl: './card-v2.component.html',
  styleUrls: ['./card-v2.component.scss'],
})
export class CardV2Component {

  @Input() card: CardItem;

  constructor(){
    this.card = {
      id: 0,
      photoUrl: '../../../../assets/images/default-image.png',
      subtitleBotton: 'Subtitle Botton',
      subtitleTop: 'Subtile top',
      title: 'Title',
      contentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel luctus dui, eu semper metus. Donec tempor consequat erat sed auctor. Proin odio neque, viverra ac porttitor vitae, varius nec arcu. Fusce non vehicula nunc, quis sagittis eros. Proin ante enim, dictum eu dignissim lobortis, iaculis non sem. Aliquam vestibulum est id ante efficitur feugiat. Fusce ultrices faucibus ipsum sit amet semper. Praesent dui neque, fermentum iaculis tortor ac, dictum sollicitudin magna. Etiam in ante bibendum, consectetur urna a, laoreet libero. Nunc vestibulum blandit pretium.',
      itemList: []
    }
  }

}
