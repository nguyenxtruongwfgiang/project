import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymetComponent } from './components/paymet/paymet.component';

const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: 'full', },
  {
    path: "home", component: HomeComponent
    // , children: [{ path: "products", component: ProductsComponent }] 
  },
  {path: "products/:id", component: ProductsComponent},
  { path: "products", component: ProductsComponent}, 
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent},
  { path: "paymet", component: PaymetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
