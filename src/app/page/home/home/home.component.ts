import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  items = [
    { title: 'Item 1' },
    { title: 'Item 2' },
    { title: 'Item 3' },
    { title: 'Item 4' },
    { title: 'Item 5' },
    { title: 'Item 6' },
    { title: 'Item 7' },
    { title: 'Item 8' },
    { title: 'Item 9' },
    { title: 'Item 10' }
  ];

  scrollRight() {
    const row = document.querySelector('.row') as HTMLDivElement;
    row.scrollLeft += row.offsetWidth;
  }

}
