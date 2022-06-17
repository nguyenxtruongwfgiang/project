import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators, Form, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user/user.service';
import { User } from './user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  configUrl: string = 'https://6289b1e75da6ddfd5d5ad2aa.mockapi.io/api/myproject/users';
  validateUser: string[] = [];
  public signupForm !: FormGroup;
  errorFormNull?: string;


  constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })
  }


  signUp() {
    // this.userService.getUser().subscribe((users) => {
    //   users.forEach((user: any) => {
    //     if (user.username) {
    //       this.errorFormNull = '* username already exists';
    //       return;
    //     }
    //   })
    // })
    if (this.signupForm.invalid) {
      this.errorFormNull = '* Please enter valid form';
      return;
    }

    if (this.signupForm.valid) {
      this.userService.getUser().subscribe((users) => {
        users.forEach((user: any) => {
          if (user.username === this.signupForm.value.username) {
            this.errorFormNull = '* username already exists';
            return;
          }
          if(user.username !== this.signupForm.value.username) {
            this.errorFormNull = '';
            this.http.post<any>(this.configUrl, this.signupForm.value).subscribe((res: any) => {
              alert("Sign Up Successfully !");
              this.signupForm.reset();
              this.router.navigate(['../signin']);
            });
          }
        })
      })
      // else {
      //   this.errorFormNull = '';
      //   this.http.post<any>(this.configUrl, this.signupForm.value).subscribe((res: any) => {
      //     alert("Sign Up Successfully !");
      //     this.signupForm.reset();
      //     this.router.navigate(['../signin']);
      //   });
      // }
    }
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get phoneNumber() {
    return this.signupForm.get('phoneNumber');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
}