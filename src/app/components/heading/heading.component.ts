import { Component, OnInit } from '@angular/core';
import { HeadingService } from '../service/products/heading.service';
import { ProductsService } from '../service/products/products.service';
import { Product } from '../products/products';
import { BehaviorSubject } from 'rxjs';
import { Categories } from './categories';
import { CartService } from '../service/products/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {
  public categoryList: any;
  public searchTerm: string = '';
  public users: any = [];
  public totalItemInCart!: number;

  constructor(private headingService: HeadingService, private productService: ProductsService,
    private cartService: CartService, private router: Router
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('cartData')) {
      this.totalItemInCart = JSON.parse(String(sessionStorage.getItem('cartData'))).length;
      this.cartService.productData.next(this.cartService.cartData);
      this.totalItemInCart;
    }
    // this.cartService.getProductData().forEach((res: any) => {
    //   this.totalItemInCart;
    // })

    this.headingService.getCategories().subscribe(resp => {
      this.categoryList = resp;
    })

    this.users = window.sessionStorage.getItem('users') ? JSON.parse(String(window.sessionStorage.getItem('users'))) : '';

  }


  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  logOutUser() {
    sessionStorage.removeItem('users');
    this.router.navigate(['../home']);
    setTimeout(() => {
      window.location.reload();
    }, 0);
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  checkLogin() {
    if (!sessionStorage.getItem('users')) {
      this.router.navigate(['../signin']);
    }
  }

}
