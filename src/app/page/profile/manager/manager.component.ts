import { Component, OnInit } from '@angular/core';
import { Manager } from 'src/app/shared/model/Manager';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/auth.service';
import { CardItem } from 'src/app/shared/model/CardItem';
import { Gym } from 'src/app/shared/model/Gym';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GymService } from '../../gym/gym.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  manager: Manager = {
    id: 0,
    firstName: '',
    lastName: '',
    locale: {
      street: '',
      number: '',
      city: '',
      state: '',
      zipCode: '',
    },
  };
  cardList: CardItem[] = [];

  manager_email = '';
  manager_username = '';
  gridCols: number = 3;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private gymService: GymService
  ) {}

  ngOnInit(): void {
    this.getGridCols();
    this.manager_email = this.authService.getEmail();
    this.manager_username = this.authService.getUsername();
    this.profileService
      .getManagerProfile(this.manager_email)
      .subscribe((data) => {
        this.manager = data;
        this.cardList = this.mapGymToCardItemList(data.gyms);
      });
  }


  mapGymToCardItemList(gymList: Gym[] | undefined): CardItem[] {
    if (gymList === undefined) {
      return [];
    }

    return gymList.map((gym) => {
      const item: CardItem = {
        id: gym.id,
        photoUrl: '../../../../assets/images/default-image.png',
        title: gym.name,
        contentBody: gym.shortDescription,
      };

      if (gym.locale) {
        item.subtitleBotton = `${gym.locale.street}, ${gym.locale.number} - ${gym.locale.city} - ${gym.locale.zipCode}`;
      }
      if (gym.sports) {
        item.itemList = gym.sports.map((sport) => {
          return sport.name;
        });
      }
      if(gym.imageId){
        this.gymService.getGymImage(gym.imageId).subscribe(
          (imageSrc: string) => {
            item.photoUrl = imageSrc;
          }
        )
      }

      return item;
    });
  }



  redirectToCardDetails(id: number | undefined): void {
    this.router.navigate(['/gym/profile/', id]);
  }

  getGridCols() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.gridCols = 1; // 1 coluna em telas extra pequenas (ex.: celulares)
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.gridCols = 1; // 2 colunas em telas pequenas (ex.: tablets)
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.gridCols = 2; // 3 colunas em telas médias
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.gridCols = 3; // 4 colunas em telas grandes
        } else if (result.breakpoints[Breakpoints.XLarge]) {
          this.gridCols = 3; // 5 colunas em telas extra grandes
        }
      });
  }
}
