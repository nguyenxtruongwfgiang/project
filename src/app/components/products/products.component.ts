import { Component, OnInit, AfterViewInit, ViewChild, SimpleChanges } from '@angular/core';
import { ProductsService } from '../service/products/products.service';
import { Product } from './products';
import { HeadingService } from '../service/products/heading.service';
import { CartService } from '../service/products/cart.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  p: number = 1;
  products: Product[] = [];
  productsData: Product[] = [];
  public newArr = <any>[]
  searchString: string = '';
  categoryList: any = [];
  selectedCategory: any;


  constructor(private productiService: ProductsService, private headingsService: HeadingService
    , private cartService: CartService, private router: Router, private activatedRoute: ActivatedRoute
  ) {
    this.getData();
  }

  ngOnInit(): void {
    // const newArr = <any>[];
    this.productiService.getCategories().subscribe(resp => {
      this.categoryList = resp;
      console.log(resp);
    })

    this.productiService.getProducts().subscribe((res) => {
      this.products = res;
      this.products.forEach((a: any) => {
        Object.assign(a, { quantity: 0, total: a.price });
      });

      // console.log(this.newArr, 'newArray');
    });

    this.cartService.search.subscribe((value: any) => {
      this.searchString = value;
    });


    // console.log(this.newArr, 'newArray');
  }

  getData() {
    this.productiService.getProducts().subscribe((value: Product[]) => {
      this.products = value;
      this.productsData = value;
      console.log(value);
    });
  }

  addToCart(product: any) {
    if (!sessionStorage.getItem('users')) {
      this.router.navigate(['../signin']);
    }
    else {
      this.cartService.addToCart(product);
      this.products.forEach((a: any) => {
        if (product.id === a.id) {
          product.quantity++;
          product.total = product.price * product.quantity;
        }
      })
      console.log(product);
    }
  }

  onCategoryChange(id: any) {
    this.products = this.productsData;
    if (id !== -1) {
      this.newArr = [];
      this.products.forEach((a: any) => {
        if(id === a.categoryId){
          this.newArr.push(a);
          this.products = this.newArr;
          console.log(this.newArr);
        }
      })
    }
  }

}
