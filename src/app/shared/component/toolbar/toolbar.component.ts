import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

interface Linha {
  texto: string;
  routerLink?: string;
  disabled?: boolean;
  role: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  userRoles: string[] = [];


  constructor(private authService: AuthService){}

  isMenuOpen = false;

  linhas: Linha[] = [
    { texto: 'Home', routerLink: '/home', role: "default-roles-quattys" },
    { texto: 'Criar ginásio', routerLink: '/gym/create', role: 'MANAGER' },
    { texto: 'Listar ginásios', routerLink: '/gym/list', role: "default-roles-quattys"  },
    { texto: 'Criar comunidade', routerLink: '/community/create', role: 'ATHLETE' },
    { texto: 'Procurar comunidade', routerLink: '/community/list', role: "ATHLETE"  }
  ];

  hasAccess(role: string): boolean {
    this.userRoles = this.authService.getRoles();
    return this.userRoles.includes(role);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
