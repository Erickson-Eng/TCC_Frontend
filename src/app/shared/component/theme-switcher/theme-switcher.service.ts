import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  private storageKey = 'isDarkThemeActive';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  get isDarkThemeActive(): boolean {
    const myValue: string = localStorage.getItem(this.storageKey) ?? '';
    if (myValue === null) {
      return false;
    }
    return JSON.parse(myValue);
  }

  set isDarkThemeActive(value: boolean) {
    localStorage.setItem(this.storageKey, JSON.stringify(value));
  }

  toggleTheme(isDark: boolean): void {
    this.isDarkThemeActive = isDark;
    if (this.isDarkThemeActive) {
      this.document.body.classList.add('dark-mode');
    } else {
      this.document.body.classList.remove('dark-mode');
    }
  }
}
