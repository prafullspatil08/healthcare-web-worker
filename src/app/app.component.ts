import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'healthcare-web-worker';
  constructor(public themeService: ThemeService) {}

}
