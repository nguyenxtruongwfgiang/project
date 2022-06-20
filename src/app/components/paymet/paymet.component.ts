import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-paymet',
  templateUrl: './paymet.component.html',
  styleUrls: ['./paymet.component.css']
})
export class PaymetComponent implements OnInit {

  public checkoutDetails: any = [];
  public checkoutDetail: any = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getDataDetails();
    this.checkoutDetails.forEach((value: any) => {
      console.log(value);
      this.checkoutDetail.push(value.cart);
    });
    console.log(this.checkoutDetails)
  }

  
  getDataDetails() {
    this.userService.getCheckoutDetails().subscribe((res: any) => {
      this.checkoutDetails = res;
      console.log(this.checkoutDetails);
    })
  }


}
