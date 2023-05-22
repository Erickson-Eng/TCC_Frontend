import { Component} from '@angular/core';
import { ThemeSwitcherService } from './theme-switcher.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent {

  isDarkThemeActive =  true;

  constructor(public themeService:ThemeSwitcherService) {}

  onChange(isDark: boolean): void {
    this.themeService.toggleTheme(isDark);
  }

  ngOnInit(){
    this.isDarkThemeActive = this.themeService.isDarkThemeActive;
    this.themeService.toggleTheme(this.isDarkThemeActive);
  }
}
