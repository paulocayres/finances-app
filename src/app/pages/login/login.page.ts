import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  constructor(private auth: AuthService, private router: Router) { }

  async login() {
    try {
      await this.auth.loginWithGoogle();
      console.log('Login bem-sucedido!');
      this.router.navigate(['/agenda-mensal']);  // ✅ redireciona aqui
    } catch (error) {
      console.error('Erro no login:', error);
    }
  }

  async logout() {
    try {
      console.log('entro no logout');
      await this.auth.logout();
      // O redirecionamento será automático após login com redirect.
    } catch (err) {
      console.error('Erro no login:', err);
    }
  }

  async getUser() {
    try {
      console.log('entro no user');
      const user = await this.auth.isLoggedIn();
      console.log(user);
      // O redirecionamento será automático após login com redirect.
    } catch (err) {
      console.error('Erro no login:', err);
    }
  }

}
