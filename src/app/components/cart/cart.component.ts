import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/products/cart.service';
import { ProductsService } from '../service/products/products.service';
import { Product } from '../products/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: Product[] = [];
  public grandTotal: number = 0;
  public productSession: any;
  checkSession: boolean = false;
  constructor(private cartservice: CartService, private productService: ProductsService) {

  }

  ngOnInit(): void {
    this.cartservice.getProductData().subscribe((res) => {
      this.products = res;
    });
    this.checkSession = sessionStorage.getItem('cartData') && JSON.parse(String(sessionStorage.getItem('cartData'))).length > 0 ? true : false;
    if (this.checkSession) {
      const dataSessions = JSON.parse(String(sessionStorage.getItem('cartData')));
      // this.products.push(...dataSessions);
      this.products = dataSessions;
    }
    if (sessionStorage.getItem('users')) {
      // this.products = xoa di nhung phan tu trung nhau trong mang , cong lai so luong cua san pham
      sessionStorage.setItem('cartData', JSON.stringify(this.products));
      // this.productSession = JSON.parse(String(sessionStorage.getItem('cartData')));
    }
    this.grandTotal = this.cartservice.getTotalPrice(this.products);
  }
  removeProduct(product: Product) {
    let currentItem: any[] = [];
    this.products.forEach((res:any) => {
      if (res.id !== product.id) {
        currentItem.push(res);
      }
    })
    this.products = currentItem;
    this.grandTotal = this.cartservice.getTotalPrice(currentItem);
    // this.cartservice.productData.next(this.cartservice.cartData);
    sessionStorage.setItem('cartData', JSON.stringify(this.products));
  }

  emptyCart() {
    this.cartservice.removeAll();
    sessionStorage.removeItem('cartData');
  }

}