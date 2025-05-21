import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service.service';
AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    try {
      await this.auth.loginWithGoogle();
      this.router.navigateByUrl('/agenda-mensal', { replaceUrl: true });
    } catch (err) {
      console.error('Erro no login:', err);
    }
  }
}
