import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private storageKey = 'isDarkThemeActive';
  isDarkThemeActive = true;

  constructor() {}

  ngOnInit(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.isDarkThemeActive)
    );
  }
}
