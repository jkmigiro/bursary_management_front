import { Component, OnInit } from '@angular/core';
import {$} from 'protractor';

@Component({
  selector: 'ngx-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const d = new Date(new Date().getTime() + 1000 * 120 * 120 * 2000);

    function simplyCountdown(s: string, param2: { month: number; year: number; day: number }) {

    }

    // // default example
    // simplyCountdown('.simply-countdown-one', {
    //   year: d.getFullYear(),
    //   month: d.getMonth() + 1,
    //   day: d.getDate()
    // });
    //
    // //jQuery example
    // $('#simply-countdown-losange').simplyCountdown({
    //   year: d.getFullYear(),
    //   month: d.getMonth() + 1,
    //   day: d.getDate(),
    //   enableUtc: false
    // });
  }

}
