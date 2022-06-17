import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../service/products/cart.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private userService: UserService,
    private cartService: CartService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router) { }

  public errorFormNull?: string;
  public users: any = [];
  public loginForm!: FormGroup;


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signIn() {
    this.userService.getUser().subscribe((res: any) => {
      this.users = res.find((a: any) => {
        return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password;
      })
      console.log(this.users);
      if (this.users) {
        // if (this.users.username) {
        window.sessionStorage.setItem('users', JSON.stringify(this.users));
        // }
        // console.log(sessionStorage.getItem('users'));
        // console.log(userSession.username, 'users')
        window.alert('Login successful');
        this.loginForm.reset();
        this.router.navigate(['../products']);
        setTimeout(() => {
          window.location.reload();
        }, 0)
      }

    });

    this.userService.getUser().subscribe((res: any) => {
      this.users = res.find((a: any) => {
        return a.username !== this.loginForm.value.username;
      })
      if (this.users) {
        this.errorFormNull = '* username did not exist';
      }
    });

    this.userService.getUser().subscribe((res: any) => {
      this.users = res.find((a: any) => {
        return a.username === this.loginForm.value.username && a.password !== this.loginForm.value.password;
      })
      if (this.users) {
        this.errorFormNull = '* password is incorrect';
      }
    });
  }
  
}
