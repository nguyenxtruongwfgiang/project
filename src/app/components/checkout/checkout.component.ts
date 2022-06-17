import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/products/cart.service';
import { UserService } from '../service/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  public productCart: any = [];
  public totalPrice = 0;
  public cityData: any = [];
  public checkoutForm!: FormGroup;
  public errorFormNull: string = '';

  constructor(private cartService: CartService, private http: HttpClient,
    private userService: UserService, private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: [this.cityData.name, Validators.required],
      cart: [JSON.parse(String(sessionStorage.getItem('cartData')))],
      username: [JSON.parse(String(sessionStorage.getItem('users')))]
    })


    this.productCart = JSON.parse(String(sessionStorage.getItem('cartData')));
    console.log(this.productCart);
    this.totalPrice = this.cartService.getTotalPrice(this.productCart);

    this.userService.getCityData().subscribe((value: any[]) => {
      this.cityData = value;
      // console.log(this.cityData);
    })

  }

  completePurchase() {
    if (sessionStorage.getItem('users')) {
        this.http.post<any>('https://6289b1e75da6ddfd5d5ad2aa.mockapi.io/api/myproject/paymet', this.checkoutForm.value)
          .subscribe((res: any) => {
            window.alert('Completed Purchse !');
            setTimeout(function () {
              sessionStorage.removeItem('cartData');
              console.log(sessionStorage.removeItem('cartData'));
              window.location.reload();
            }, 0);
            this.router.navigate(['../cart']);
          })
      }
    }
}
