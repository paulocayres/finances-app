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
  statusChecked = false;
  constructor(private auth: AuthService, private router: Router) { }

async ionViewWillEnter() {
  this.statusChecked = false;
  this.logged = await this.auth.isLoggedIn();
  this.statusChecked = true;
}

  /*async ngOnInit() {
    this.logged = await this.auth.isLoggedIn();  // ou 'user', ou qualquer flag que você salve
  }*/

  async login() {
    this.loading = true;

    try {
      const result = await this.auth.loginWithGoogle();
      //console.log('Usuário logado:', result.user);

      // Pega o token JWT do Firebase para enviar na API
      //const token = await result.user.getIdToken();
      //console.log('Token:', token);

      this.router.navigateByUrl('/');


    } catch (error) {
      this.showError('Erro ao fazer login. Tente novamente.');
      console.error(error);
    } finally {
      this.loading = false;
      this.logged = true;
    }
  }

  showError(message: string) {
    alert(message);  // ou um toast mais elegante
  }


  async logout() {
    this.loading=true;
    try {
      console.log('entro no logout');
      await this.auth.logout();
      // O redirecionamento será automático após login com redirect.
    } catch (err) {
      console.error('Erro no login:', err);
    } finally {
      this.loading = false;
      this.logged = false;
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


