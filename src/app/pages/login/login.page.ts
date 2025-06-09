import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  loading = false;
  logged = false;

  constructor(private auth: AuthService, private router: Router, private alertCtrl: AlertController) {}

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
      this.logged = false;
    }
  }

  async confirmLogout() {
  const alert = await this.alertCtrl.create({
    header: 'Sair do app?',
    message: 'Deseja realmente sair?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Sair',
        handler: () => {
          this.logout();
        }
      }
    ]
  });

  await alert.present();
}

  async getUser() {
    const user = await this.auth.getCurrentUser();
    console.log('Usuário atual:', user);
  }
}
