import { inject, Injectable } from '@angular/core';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut, User, onAuthStateChanged, signInWithPopup, signInAnonymously, SignInMethod } from 'firebase/auth';
import { firebaseApp } from '../firebase-init';
//import {  GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged, User, getAuth, Auth } from '@angular/fire/auth';
//import { firebaseApp } from '../firebase-init';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth(firebaseApp);
  private provider = new GoogleAuthProvider();

  constructor() {
    
   }

  loginWithGoogle() {
    
    console.log('entrou no serviço de login');
    console.log('config: ', this.auth.config.apiKey)
    console.log(this.auth);
    console.log('firebaseApp', firebaseApp);
    try {

    } catch { }

    return signInWithPopup(this.auth, this.provider);
  }

  loginWithRedirect() {
    return signInWithRedirect(this.auth, this.provider);
  }


  logout() {
    return signOut(this.auth);
  }

  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(user);
      });
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.getCurrentUser().then(user => !!user);
  }
}
