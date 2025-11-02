import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { authClient } from '../../lib/auth-client';

interface User {
  name?: string;
  email: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSignal = signal<User | null>(null);
  private router = inject(Router);

  user = this.userSignal.asReadonly();
  isLoggedIn = computed(() => this.userSignal !== null);

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    try {
      const session = await authClient.getSession();
      console.log(session);
      if (session?.data?.user) {
        this.userSignal.set(session.data.user);
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    }
  }

  async login(email: string, password: string) {
    const { data, error } = await authClient.signIn.email({ email, password });
    if (error) {
      throw new Error(error.message);
    }
    this.userSignal.set(data.user);
  }
}
