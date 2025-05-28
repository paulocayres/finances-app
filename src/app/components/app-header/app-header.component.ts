import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: false
})
export class AppHeaderComponent {
  @Input() title = '';

  constructor(private router: Router) {}

  logout() {
    // Limpeza de dados, tokens, etc.
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

