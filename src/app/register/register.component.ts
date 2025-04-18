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
import { Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastModule, FloatLabelModule, CardModule, InputTextModule, PasswordModule, ButtonModule, RippleModule,TooltipModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private jwtService: JwtService, private messageService: MessageService, private router:Router) {

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/)]],
      repeatPassword:['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  onSubmit() {
    const {username, password, repeatPassword, email, firstName, lastName} = this.registerForm.value;
    if(repeatPassword!=password)
    {
      this.messageService.add({ severity: 'warn', summary: "password doesn't match", detail: "password doesn't match with repeated password"});
      return;
    }
    const fullName = firstName + " " + lastName
    this.jwtService.Register(username, password, email, fullName)
      .subscribe({
        next: (respone:string) => {
          this.messageService.add({ severity: 'success', summary: 'Signup Successful', detail: 'Redirecting to login...' });
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Signup Failed', detail: 'Something went wrong!' });
        }
      });
  }
}
