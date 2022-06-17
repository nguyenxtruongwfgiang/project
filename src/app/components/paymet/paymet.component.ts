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

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getDataDetails();
  }

  
  getDataDetails() {
    this.userService.getCheckoutDetails().subscribe((res: any) => {
      this.checkoutDetails = res;
      console.log(this.checkoutDetails);
    })
  }


}
