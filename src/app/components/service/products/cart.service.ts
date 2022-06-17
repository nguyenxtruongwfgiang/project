import { Injectable } from '@angular/core';
import { BehaviorSubject, concat } from 'rxjs';
import { Product } from '../../products/products';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartData: any = [];
  productData = new BehaviorSubject<any>([]);

  public search = new BehaviorSubject<string>("");
  constructor(productservice: ProductsService) { }
  
  getProductData(){
    return this.productData.asObservable();
  }

  setProductData(product: any){
    this.cartData.push(concat(product));
    this.productData.next(product);
  }

  //thêm sản phẩm vô giỏ hàng
  addToCart(product: any){
    // this.cartData.push(product);
    let valid = false;
      this.cartData.forEach((a: any) => {
        if(product.id === a.id) {
          valid = true;
        }
      })
    if(!valid) {
      this.cartData.push(product);
    }
    this.productData.next(this.cartData);
    this.getTotalPrice(this.cartData);
  }
  
  //xoá duy nhất 1 sản phâm theo vị trí index
  removeCartData(product: any){
    this.cartData.map((a: any, index: any) => {
      if(product.id == a.id){
        this.cartData.splice(index, 1);
        
      }
    })
    this.productData.next(this.cartData);
  }

  // xoá tất cả sản phẩm
  removeAll(){
    this.cartData = [];
    this.productData.next(this.cartData);
  }

  // 
  getTotalPrice(products: any) {
    let grandTotal = 0;
    products.map((value: any) => {
      grandTotal += value.total;
    });
    return grandTotal;
  }

}
