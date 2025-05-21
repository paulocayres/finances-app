import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAK1jVnCE6c2-l1WIsZTvVWN3xeruN0a5o",
  authDomain: "cayresfinances-app.firebaseapp.com",
  projectId: "cayresfinances-app",
  storageBucket: "cayresfinances-app.firebasestorage.app",
  messagingSenderId: "332663746330",
  appId: "1:332663746330:web:a6759fcf314ed4122d86a3",
  measurementId: "G-PE1ZH43L5N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: User | null = null;

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  logout() {
    return signOut(auth);
  }

  getCurrentUser() {
    return auth.currentUser;
  }
}
