import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  showSignup = signal(false);
  signUpPassword = signal('');

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl(''),
  });

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(8)]),
    confirmPassword: new FormControl('', [
      Validators.minLength(8),
      Validators.pattern(this.signUpPassword()),
    ]),
  });

  onSubmit() {
    console.log(this.loginForm);
  }

  onSignup() {
    console.log(this.signupForm.value);
  }

  toggleSignup() {
    this.showSignup.update((value) => !value);
  }

  updateSignUpPassword(event: Event) {
    this.signUpPassword.set((event.target as HTMLInputElement).value);
  }
}
