import {Component, OnDestroy} from '@angular/core';
import {NbMenuService, NbThemeService} from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import {User} from '../../models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DayOrBoarder} from '../../enums/day-or-boarding.enum';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
  dayOrBoarderValues: string[] = Object.values(DayOrBoarder);
  // dayOrBoarderKeys: string[] = Object.keys(DayOrBoarder);
  isJoiningSecondaryOrContinuing: string;
   hasBenefittedFromFund;
  // joiningSecondaryOrContinuingKeys: string[] = Object.keys(JoiningSecondaryOrContinuing);
  // joiningSecondaryOrContinuingValues:  string[] = Object.values(JoiningSecondaryOrContinuing);
  // schoolGradeKeys: string[] = Object.keys(SchoolGrade);
  // schoolGradeValues: string[] = Object.values(SchoolGrade);
  // goToHome() {
  //   this.menuService.navigateHome();
  //   const user: User = new User();
  //   user.userName = 'Admin';
  // }
  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService,
              private solarService: SolarData, private fb: FormBuilder,
              private menuService: NbMenuService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }


}
