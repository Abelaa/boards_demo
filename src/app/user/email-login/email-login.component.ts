import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {

  form: FormGroup = this.fb.group({});
  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;
  serverMessage = '';

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []]
    })
  }

  changeFormType(type: any) {
    this.type = type;
  }

  get isLogin() { return this.type == 'login'; }
  get isSignup() { return this.type == 'signup'; }
  get isReset() { return this.type == 'reset'; }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get passwordConfirm() { return this.form.get('passwordConfirm'); }

  get passwordDoesMatch() {
    return this.password?.value == this.passwordConfirm?.value;
  }

  async onSubmit() {
    
  }

}
