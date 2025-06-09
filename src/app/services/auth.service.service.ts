import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { firebaseApp } from '../firebase-init';
import { BehaviorSubject } from 'rxjs';

export interface NativeFirebaseUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoUrl: string | null;
  providerId: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = getAuth(firebaseApp);
  private currentUser: User | NativeFirebaseUser | null = null;
  private token: string | null = null;

  private authStateSubject = new BehaviorSubject<User | NativeFirebaseUser | null>(null);
  authState$ = this.authStateSubject.asObservable();

  constructor() {
    this.initAuthListener();
  }

  private initAuthListener() {
    if (Capacitor.getPlatform() === 'web') {
      // Firebase Web restaura automaticamente
      this.auth.onAuthStateChanged(async user => {
        this.currentUser = user;
        this.token = user ? await user.getIdToken() : null;
        this.authStateSubject.next(user);
        if (user) console.log('[WEB] Sessão restaurada:', user.email);
      });
    } else {
      // Mobile precisa escutar evento manualmente
      FirebaseAuthentication.addListener('authStateChange', async ({ user }) => {
        this.currentUser = user ?? null;
        this.token = user ? (await FirebaseAuthentication.getIdToken()).token : null;
        this.authStateSubject.next(user);
        if (user) console.log('[MOBILE] Login detectado:', user.email);
      });
    }
  }

  async signInWithGoogle(): Promise<void> {
    if (Capacitor.getPlatform() === 'web') {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      this.currentUser = result.user;
      this.token = await result.user.getIdToken();
      this.authStateSubject.next(result.user);
    } else {
      const result = await FirebaseAuthentication.signInWithGoogle();
      this.currentUser = result.user ?? null;
      this.token = result.user ? (await FirebaseAuthentication.getIdToken()).token : null;
      this.authStateSubject.next(result.user);
    }
  }

  async signOut(): Promise<void> {
    if (Capacitor.getPlatform() === 'web') {
      await this.auth.signOut();
    } else {
      await FirebaseAuthentication.signOut();
    }

    this.currentUser = null;
    this.token = null;
    this.authStateSubject.next(null);
  }

  async getCurrentUser(): Promise<User | NativeFirebaseUser | null> {
    if (this.currentUser) return this.currentUser;

    if (Capacitor.getPlatform() === 'web') {
      return this.auth.currentUser;
    } else {
      const result = await FirebaseAuthentication.getCurrentUser();
      return result.user ?? null;
    }
  }

  async getIdToken(): Promise<string | null> {
    if (this.token) return this.token;

    const user = await this.getCurrentUser();
    if (!user) return null;

    try {
      if ('getIdToken' in user) {
        this.token = await user.getIdToken();
      } else {
        const result = await FirebaseAuthentication.getIdToken();
        this.token = result.token;
      }
      return this.token;
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return null;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
}
