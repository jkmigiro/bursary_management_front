import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  someSubscription: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.someSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Here is the dashing line comes in the picture.
        // You need to tell the router that, you didn't visit or
        // load the page previously, so mark the navigated flag to false as below.
        this.router.navigated = false;
      }
    });
  }

}
