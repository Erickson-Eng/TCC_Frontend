import { Component, OnInit } from '@angular/core';
import { CardItem } from 'src/app/shared/model/CardItem';
import { Community } from 'src/app/shared/model/Community';
import { CommunityService } from '../community.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-list-community',
  templateUrl: './list-community.component.html',
  styleUrls: ['./list-community.component.scss'],
})
export class ListCommunityComponent implements OnInit {
  cardItemList: CardItem[] | undefined;
  gridCols: number = 3;
  communityList: Community[] = [];

  ngOnInit(): void {
    this.getGridCols();
    this.service
      .getAllCommunities()
      .pipe(
        tap((response: any) => {
          if (Array.isArray(response.communityList)) {
            const communities = response.communityList;
            this.cardItemList =
              this.transformCommunityListInCardItemList(communities);
          }
        })
      )
      .subscribe();
  }

  constructor(
    private service: CommunityService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  transformCommunityListInCardItemList(communityList: Community[]): CardItem[] {
    return communityList.map((community) => {
      const cardItem: CardItem = {
        id: community.id,
        photoUrl: '../../../../assets/images/default-image.png',
        title: community.name,
        contentBody: community.description,
      };

      if (community.id) {
        cardItem.subtitleTop = `ID: ${community.id}`;
      }

      if (community.imageId) {
        this.service
          .getImageForCommunity(community.imageId)
          .subscribe((imageSrc: string) => {
            cardItem.photoUrl = imageSrc;
          });
      }

      return cardItem;
    });
  }

  redirectToCardDetails(id: number | undefined): void {
    this.router.navigate(['/community/profile/', id]);
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
