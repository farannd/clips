import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Template Forms

  credentials = {
    email: '',
    password: '',
  };

  allertShow = false;
  allertColor = '';
  allertMessage = '';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async login() {
    this.allertShow = true;
    this.allertColor = 'blue';
    this.allertMessage = 'Please wait a moment';
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (e: any) {
      this.allertColor = 'red';
      this.allertMessage = e.message;
      this.inSubmission = false;
      return;
    }

    this.allertColor = 'green';
    this.allertMessage = 'Welcome back.';
  }
}
