import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JwtService } from '../services/jwt.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { configs } from '../../environment/environment'
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastModule,FloatLabelModule, CardModule,InputTextModule, PasswordModule, ButtonModule, RippleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private jwtService:JwtService, private messageService:MessageService) {

  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      if (this.loginForm.valid) {
        const { userName, password } = this.loginForm.value;
        this.jwtService.login(userName, password).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary:'login successfull', detail:'logged in successfully'})
            window.location.href = configs.applicationURL;
          },
          error: err => {
            this.showError();
          }
        });
      }
    }
  }
  showError(){
    this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid username or password' });
  }
}
