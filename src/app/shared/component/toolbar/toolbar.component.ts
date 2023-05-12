import { Component, Input } from '@angular/core';
import { Link } from '../../model/Link';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() links: Link[] = [
    {name: 'Home', route:'/home'},
    {name: 'Criar ginásio', route:'/'},
    {name: 'Criar Comunidade', route:'/'},
    {name: 'Listar Comunidades', route:'/community/list'}
  ];

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
