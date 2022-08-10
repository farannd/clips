import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RegisterValidator } from '../validators/register-validator';
import { EmailTaken } from '../validators/email-taken';
import IUser from 'src/app/models/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private auth: AuthService, private emailTaken: EmailTaken) {}

  // Reactive Forms

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTaken.validate]
  );
  age = new FormControl(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidator.match('password', 'confirmPassword')]
  );

  allertColor = '';
  allertShow = false;
  allertMessage = '';
  inSubmission = false;

  async register() {
    this.allertColor = 'blue';
    this.allertShow = true;
    this.allertMessage = 'Please wait. Your account is being created.';
    this.inSubmission = true;

    try {
      await this.auth.createUser(this.registerForm.value as IUser);
    } catch (e: any) {
      this.allertMessage = e.message;
      this.allertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.allertMessage = 'Success! Your account has been created';
    this.allertColor = 'green';
  }
}
