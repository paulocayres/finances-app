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
  loading = false;
  logged = false;

  constructor(private auth: AuthService, private router: Router) {}

  async ionViewWillEnter() {
    this.logged = await this.auth.isLoggedIn();
  }

  async login() {
    this.loading = true;

    try {
      await this.auth.signInWithGoogle();

      const token = await this.auth.getIdToken();
      if (token) {
        console.log('Login concluído, token obtido.');
        this.router.navigateByUrl('/');
      } else {
        throw new Error('Token não disponível após login.');
      }

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Tente novamente.');
    } finally {
      this.loading = false;
    }
  }

  async logout() {
    this.loading = true;
    try {
      await this.auth.signOut();
      this.router.navigateByUrl('/login');
    } finally {
      this.loading = false;
    }
  }

  async getUser() {
    const user = await this.auth.getCurrentUser();
    console.log('Usuário atual:', user);
  }
}
