import { Component, OnInit } from '@angular/core';
import { CardItem } from 'src/app/shared/model/CardItem';
import { Gym } from 'src/app/shared/model/Gym';
import { GymService } from '../gym.service';
import { GymTableResponse } from 'src/app/shared/model/GymTableResponse';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-list-gym',
  templateUrl: './list-gym.component.html',
  styleUrls: ['./list-gym.component.scss'],
})
export class ListGymComponent implements OnInit {
  gridCols: number = 3;
  cardList: CardItem[] = [];
  gymList: Gym[] = [];

  ngOnInit(): void {
    this.getGridCols();
    this.service.getAllGym()
    .subscribe((data: GymTableResponse) => {
      this.gymList = data.gymList;
      this.cardList = this.mapGymToCardItemList(this.gymList);
    });
  }

  constructor(
    private service: GymService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  mapGymToCardItemList(gymList: Gym[]): CardItem[] {
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
        this.service.getGymImage(gym.imageId).subscribe(
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
          this.gridCols = 2; // 2 colunas em telas pequenas (ex.: tablets)
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.gridCols = 3; // 3 colunas em telas médias
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.gridCols = 3; // 4 colunas em telas grandes
        } else if (result.breakpoints[Breakpoints.XLarge]) {
          this.gridCols = 3; // 5 colunas em telas extra grandes
        }
      });
  }
}
